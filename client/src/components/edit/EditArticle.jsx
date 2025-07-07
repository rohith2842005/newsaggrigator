import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import "./edit.css";

const EditArticle = () => {
  const { id } = useParams();
  const history = useHistory();
  const [article, setArticle] = useState({ title: "", description: "" });
  const [file, setFile] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:4000/news`)
      .then((res) => {
        const found = res.data.find((item) => item._id === id);
        if (found) setArticle(found);
      })
      .catch((err) => console.error("Error fetching article:", err));
  }, [id]);

  const handleChange = (e) => {
    setArticle({ ...article, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", article.title);
    formData.append("description", article.description);
    if (file) formData.append("image", file);

    try {
      await axios.put(`http://localhost:4000/news/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Article updated successfully");
      history.push("/");
    } catch (err) {
      console.error("Error updating article:", err);
      alert("Failed to update");
    }
  };

  return (
    <div className="edit-article">
      <h2>Edit Article</h2>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          name="title"
          value={article.title}
          onChange={handleChange}
          placeholder="Title"
        />
        <textarea
          name="description"
          value={article.description}
          onChange={handleChange}
          rows="5"
          placeholder="Description"
        ></textarea>
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit">Update Article</button>
      </form>
    </div>
  );
};

export default EditArticle;
