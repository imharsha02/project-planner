// server.js
import express from "express";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 3001;

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(express.json());

// Example route to fetch data from Supabase
app.get("/api/data", async (req, res) => {
  const { data, error } = await supabase.from("your_table_name").select("*");

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
});

// Example route to insert data into Supabase
app.post("/api/data", async (req, res) => {
  const { item } = req.body;
  const { data, error } = await supabase
    .from("your_table_name")
    .insert([item])
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.status(201).json(data);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
