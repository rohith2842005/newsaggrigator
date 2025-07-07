import React, { useEffect, useState } from "react";
import "./blog.css";
import {
  AiOutlineTags,
  AiOutlineClockCircle,
  AiOutlineComment,
  AiOutlineShareAlt,
  AiFillDelete,
  AiFillEdit,
} from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";

export const Card = () => {
  const [posts, setPosts] = useState([]);
  const history = useHistory();

  const fetchArticles = async () => {
    try {
      const res = await Axios.get("http://localhost:4000/news");
      setPosts(res.data);
    } catch (err) {
      console.error("Error fetching articles:", err);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleDelete = async (id) => {
    try {
      await Axios.delete(`http://localhost:4000/news/${id}`);
      alert("Article deleted");
      fetchArticles(); // refresh list after deletion
    } catch (err) {
      console.error("Error deleting article:", err);
      alert("Failed to delete article");
    }
  };

  return (
    <section className='blog'>
      <div className='container grid3'>
        {posts.map((item) => (
          <div className='box boxItems' key={item._id}>
            <div className='img'>
              <img
                src={
                  item.image
                    ? `http://localhost:4000/uploads/${item.image}`
                    : "https://via.placeholder.com/400x200?text=No+Image"
                }
                alt={item.title}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
            </div>
            <div className='details'>
              <div className='tag'>
                <AiOutlineTags className='icon' />
                <a href='/'>#category</a>
              </div>
              <Link to={`/details/${item._id}`} className='link'>
                <h3>{item.title}</h3>
              </Link>
              <p>{item.description?.slice(0, 180)}...</p>
              <div className='date'>
                <AiOutlineClockCircle className='icon' /> <label>Just now</label>
                <AiOutlineComment className='icon' /> <label>27</label>
                <AiOutlineShareAlt className='icon' /> <label>SHARE</label>
              </div>

              {/* ✅ Edit and Delete Buttons */}
              <div className="actions">
                <button onClick={() => history.push(`/edit/${item._id}`)}>
                  <AiFillEdit /> Edit
                </button>
                <button onClick={() => handleDelete(item._id)}>
                  <AiFillDelete /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
