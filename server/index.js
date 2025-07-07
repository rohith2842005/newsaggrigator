import express from 'express';
import mongoose from 'mongoose';
import { User } from './models/User.js';
import { Article } from './models/Article.js';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// ES Module dirname workaround
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Ensure 'uploads' folder exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // ✅ Serve images

mongoose.set("strictQuery", true);
mongoose.connect("mongodb+srv://harshithpaturi:Harsh%4013@cluster0.qfftbc9.mongodb.net/news");
const db = mongoose.connection;
db.on("open", () => console.log("connected to DB"));
db.on("error", () => console.log("Error occurred"));

// ✅ Multer config for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Must match static folder path
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, uniqueSuffix);
  },
});
const upload = multer({ storage });

// ===== User Routes =====

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    res.status(200).json([user]);  // ✅ Make sure it's an array only if frontend expects it
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/register", async (req, res) => {
  try {
    const { fname, lname, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    const newUser = await User.create({ fname, lname, email, password });
    return res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

let currentUserEmail = null;

app.post("/set-current-user", (req, res) => {
  currentUserEmail = req.body.email;
  return res.json({ message: "Current user set" });
});

app.get("/current-user", async (req, res) => {
  if (!currentUserEmail) return res.status(404).json({ error: "No user logged in" });
  const user = await User.findOne({ email: currentUserEmail });
  if (!user) return res.status(404).json({ error: "User not found" });
  return res.json(user);
});

app.post("/update-user", async (req, res) => {
  const { email, fname, password } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { email },
      { fname, password },
      { new: true }
    );
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User updated", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===== News Post Routes =====

app.post("/news", upload.single("image"), async (req, res) => {
  console.log("✅ POST /news endpoint hit");

  if (req.file) {
    console.log("🖼️ Image received:", req.file.filename);
  } else {
    console.log("⚠️ No image received");
  }

  console.log("📝 Post content:", req.body);

  try {
    const { title, description } = req.body;
    const image = req.file?.filename || null;

    const article = await Article.create({ title, description, image });
    return res.status(201).json(article);
  } catch (err) {
    console.error("❌ Error creating article:", err);
    return res.status(500).json({ error: err.message });
  }
});

app.get("/news", async (req, res) => {
  try {
    const articles = await Article.find().exec();
    return res.json(articles);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.listen(4000, () => {
  console.log("Server started on http://localhost:4000");
});

// DELETE a post
app.delete("/news/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Article.findByIdAndDelete(id);
    return res.status(200).json({ message: "Article deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// PUT (Edit/Update) a post
app.put("/news/:id", upload.single("image"), async (req, res) => {
  try {
    const { title, description } = req.body;
    const { id } = req.params;

    const updateData = {
      title,
      description,
    };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updatedArticle = await Article.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    return res.status(200).json(updatedArticle);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});