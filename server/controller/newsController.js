const News = require("../models/News");

exports.createNews = async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file?.filename;

    const newPost = new News({ title, description, image });
    await newPost.save();

    res.status(200).json({ message: "News created", news: newPost });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create news" });
  }
};

exports.getAllNews = async (req, res) => {
  try {
    const news = await News.find().sort({ _id: -1 });
    res.status(200).json(news);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch news" });
  }
};
