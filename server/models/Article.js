// server/models/Article.js
import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String, // make sure this is included
});

export const Article = mongoose.model("Article", articleSchema);
