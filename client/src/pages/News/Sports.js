import React, { useEffect, useState } from "react";
import "./News.css";

const Sports = () => {
  const [mynews, setMyNews] = useState([]);

  const fetchData = async () => {
    let resonse = await fetch(
      "https://newsapi.org/v2/everything?q=cricket&apiKey=a8b30640f0af4237b5cd77cc233aa4f2"
    );
    let data = await resonse.json();
    setMyNews(data.articles);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="mainDiv">
        {mynews.map((ele) => {
          console.log(ele);
          return (
            <>
              <div
                class="card"
                style={{
                  width: "350px",
                  height: "450px",
                  marginLeft: "4rem",
                  marginTop: "2rem",
                }}
              >
                <img
                  src={
                    ele.urlToImage == null
                      ? "https://i.insider.com/6492daec65b9ce0018a443c8?width=1200&format=jpeg"
                      : ele.urlToImage
                  }
                  class="card-img-top"
                  alt="..."
                />
                <div class="card-body">
                  <h5 class="card-title">{ele.title}</h5>
                  <p class="card-time">
  {new Date(ele.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })}
</p>

                  <p class="card-text">{ele.author}</p>
                  <a href={ele.url} target="_blank" rel="noreferrer" class="btn btn-primary">
                    Read More
                  </a>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Sports;
