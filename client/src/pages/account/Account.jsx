import React, { useEffect, useState } from "react";
import image from "../../assets/images/input.jpeg";
import axios from "axios";
import "./account.css";

export const Account = () => {
  const [userInfo, setUserInfo] = useState({
    fname: "",
    email: "",
    password: "",
  });

  // Fetch current user data on mount
  useEffect(() => {
    axios
      .get("http://localhost:4000/current-user")
      .then((res) => {
        const { fname, email, password } = res.data;
        setUserInfo({ fname, email, password });
      })
      .catch((err) => {
        console.error("Failed to fetch user info", err);
      });
  }, []);

  // Handle changes to fname or password
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    axios
      .post("http://localhost:4000/update-user", userInfo)
      .then(() => {
        alert("User info updated successfully!");
      })
      .catch((err) => {
        console.error("Update failed", err);
        alert("Failed to update user info");
      });
  };

  return (
    <>
      <section className='accountInfo'>
        <div className='container boxItems'>
          <h1>Account Information</h1>
          <div className='content'>
            <div className='left'>
              <div className='img flexCenter'>
                <input type='file' accept='image/*' />
                <img src={image} alt='preview' className='image-preview' />
              </div>
            </div>
            <div className='right'>
              <label>Username</label>
              <input
                type='text'
                name='fname'
                value={userInfo.fname}
                onChange={handleChange}
              />

              <label>Email</label>
              <input
                type='email'
                name='email'
                value={userInfo.email}
                readOnly
                style={{  cursor: "not-allowed" }}
              />

              <label>Password</label>
              <input
                type='password'
                name='password'
                value={userInfo.password}
                onChange={handleChange}
              />

              <button className='button' onClick={handleUpdate}>
                Update
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};