import express from "express"; // Imported express
type RequestHandler = express.RequestHandler; // used request handler from express
import { createClient } from "@supabase/supabase-js"; // import createClient from supabase
import dotenv from "dotenv"; // Imported the dotenv file
import bcrypt from "bcrypt"; // Imported bcrypt
dotenv.config(); // Configured the dotenv file

const app = express(); // Using express

const port = process.env.PORT || 3001; // Creating a constant that holds the port number

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL; // Taking the supabase url
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; // Taking the supabsae anon key
if (!supabaseUrl || !supabaseKey) {
  console.error(
    "Error: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables are not set."
  );
  process.exit(1);
} // Just tell what to do if there is no key or url
const supabase = createClient(supabaseUrl, supabaseKey); // Creating a client using the url and key

app.use(express.json()); // Converting express to json to show at the endpoint

const getData: RequestHandler = async (_, res) => {
  // Function to get data from the database via the server
  const { data, error } = await supabase.from("users").select("*"); // Extracting data and error from the DB's users table

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }
  res.json(data || []);
}; // Returning empty array if there is an error

const postData: RequestHandler = async (req, res) => {
  const { username, email, password } = req.body; // From the request body, grabbing the username, email and password

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
