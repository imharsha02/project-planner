import express from "express";
import cors from "cors";
type RequestHandler = express.RequestHandler;
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
dotenv.config();

const app = express();
app.use(cors());

const port = process.env.PORT || 3001;

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

const getData: RequestHandler = async (_, res) => {
  const { data, error } = await supabase.from("users").select("*");

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }
  res.json(data || []);
};

const postData: RequestHandler = async (req, res) => {
  const { username, email, password } = req.body;

  // Validate required fields
  if (!username || !email || !password) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  try {
    // Check for existing username
    const { data: existingUsername } = await supabase
      .from("users")
      .select("username")
      .eq("username", username)
      .single();

    if (existingUsername) {
      res.status(400).json({ error: "Username already exists" });
      return;
    }

    // Check for existing email
    const { data: existingEmail } = await supabase
      .from("users")
      .select("email")
      .eq("email", email)
      .single();

    if (existingEmail) {
      res.status(400).json({ error: "Email already exists" });
      return;
    }

    // Hash the password with a salt round of 10
    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          username,
          email,
          password: hashedPassword,
        },
      ])
      .select();

    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
    res.status(201).json(data);
  } catch (error) {
    console.error("Error processing registration:", error);
    res.status(500).json({ error: "Error processing registration" });
  }
};

// Add a root route handler
app.get("/", (req, res) => {
  res.send("API is running. Available endpoints: /api/data");
});

app.get("/api/data", getData);
app.post("/api/data", postData);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
