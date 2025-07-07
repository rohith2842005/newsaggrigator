import React, { useState } from "react";
import "./create.css";
import Axios from "axios";

export const Create = () => {
  const [file, setFile] = useState(null);
  const [info, setInfo] = useState({ title: "", textarea: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return; // prevent double submission

    const formData = new FormData();
    formData.append("title", info.title);
    formData.append("description", info.textarea);
    if (file) formData.append("image", file);

    try {
      setIsSubmitting(true);
      const response = await Axios.post("http://localhost:4000/news", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 201) {
        alert("✅ Post created!");
        setFile(null);
        setInfo({ title: "", textarea: "" });
      } else {
        alert("❌ Failed to create post");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error uploading post");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onValueChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  return (
    <section className="newPost">
      <div className="container boxItems">
        <form onSubmit={handleSubmit}>
          <div className="img">
            {file && (
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="image-preview"
              />
            )}
          </div>
          <div className="inputfile flexCenter">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              name="file"
            />
          </div>
          <input
            type="text"
            placeholder="Title"
            onChange={onValueChange}
            name="title"
            value={info.title}
            required
          />
          <textarea
            cols="30"
            rows="10"
            onChange={onValueChange}
            name="textarea"
            value={info.textarea}
            required
          />
          <button className="button" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Posting..." : "Create Post"}
          </button>
        </form>
      </div>
    </section>
  );
};
