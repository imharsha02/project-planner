import express from "express";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Configure multer for file uploads
const upload = multer({ storage: multer.memoryStorage() });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error(
    "Error: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables are not set."
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

app.use(express.json());

// GET endpoint to fetch all users
app.get("/api/data", async (_, res) => {
  try {
    const { data, error } = await supabase.from("users").select("*");

    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
    res.json(data || []);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST endpoint to create a new user
app.post("/api/data", upload.single("profilePic"), async (req, res) => {
  const { username, email, password } = req.body;
  const profilePicFile = req.file;

  if (!username || !email || !password || !profilePicFile) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Check for existing username
    const { data: existingUsername } = await supabase
      .from("users")
      .select("username")
      .eq("username", username)
      .single();

    if (existingUsername) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Check for existing email
    const { data: existingEmail } = await supabase
      .from("users")
      .select("email")
      .eq("email", email)
      .single();

    if (existingEmail) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const bucketName = "profile-pic";
    const fileExtension = profilePicFile.originalname.split(".").pop();
    const filePath = `${uuidv4()}.${fileExtension}`;

    // Upload the profile picture to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(filePath, profilePicFile.buffer, {
        contentType: profilePicFile.mimetype,
        upsert: false,
      });

    if (uploadError) {
      console.error("Supabase Storage upload error:", uploadError);
      return res.status(500).json({
        error: `Failed to upload profile picture: ${uploadError.message}`,
      });
    }

    // Get the public URL of the uploaded image
    const { data: publicUrlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);

    if (!publicUrlData || !publicUrlData.publicUrl) {
      return res
        .status(500)
        .json({ error: "Failed to get public URL for uploaded file." });
    }

    const profilePicUrl = publicUrlData.publicUrl;
    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          username,
          email,
          password: hashedPassword,
          profilePic: profilePicUrl,
        },
      ])
      .select();

    if (error) {
      // Clean up uploaded file if user creation fails
      await supabase.storage.from(bucketName).remove([filePath]);
      return res.status(500).json({ error: error.message });
    }

    return res.status(201).json(data);
  } catch (err) {
    console.error("Error processing registration:", err);
    return res.status(500).json({ error: "Error processing registration" });
  }
});

// Root route handler
app.get("/", (_, res) => {
  res.send("API is running. Available endpoints: /api/data");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
