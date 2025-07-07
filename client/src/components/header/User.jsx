import React, { useState, useEffect } from "react"
import { IoSettingsOutline } from "react-icons/io5"
import { AiOutlineHeart } from "react-icons/ai"
import { GrHelp } from "react-icons/gr"
import { BiLogOut } from "react-icons/bi"
import { RiImageAddLine } from "react-icons/ri"
import { Link } from "react-router-dom"
import axios from "axios"

export const User = () => {
  const [profileOpen, setProfileOpen] = useState(false)
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    axios
      .get("http://localhost:4000/current-user")
      .then((res) => setUserData(res.data))
      .catch((err) => console.error("Error fetching user data", err))
  }, [])

  const close = () => {
    setProfileOpen(false)
  }
  const handleLogout = () => {
    axios
      .post("http://localhost:4000/set-current-user", { email: null })
      .then(() => {
        setUserData(null); // Clear local state
        alert("Logged out");
        window.location.href = "/login"; // Navigate to login
      })
      .catch((err) => console.error("Logout failed", err));
  };


  return (
    <>
      <div className='profile'>
        {userData ? (
          <>
            <button className='img' onClick={() => setProfileOpen(!profileOpen)}>
              <img src='https://images.pexels.com/photos/1097456/pexels-photo-1097456.jpeg?auto=compress&cs=tinysrgb&w=600' alt='' />
            </button>
            {profileOpen && (
              <div className='openProfile boxItems' onClick={close}>

                <div className='image'>
                  <div className='img'>
                    <img src='https://images.pexels.com/photos/1097456/pexels-photo-1097456.jpeg?auto=compress&cs=tinysrgb&w=600' alt='' />
                  </div>
                  <div className='text'>
                    <h4>{userData.fname}</h4>
                    <label>Welcome, {userData.fname}</label>
                  </div>
                </div>

                <Link to='/create'>
                  <button className='box'>
                    <RiImageAddLine className='icon' />
                    <h4>Publish information</h4>
                  </button>
                </Link>
                <Link to='/account'>
                  <button className='box'>
                    <IoSettingsOutline className='icon' />
                    <h4>My Account</h4>
                  </button>
                </Link>
                {/* <button className='box'>
                  <AiOutlineHeart className='icon' />
                  <h4>Wishlist</h4>
                </button> */}
                <button className='box'>
                  <GrHelp className='icon' />
                  <h4>Help</h4>
                </button>
                <button className='box' onClick={handleLogout}>
                  <BiLogOut className='icon' />
                  <h4>Log Out</h4>
                </button>

              </div>
            )}
          </>
        ) : (
          <Link to="/login">
            <button>My Account</button>
          </Link>
        )}
      </div>
    </>
  )
}