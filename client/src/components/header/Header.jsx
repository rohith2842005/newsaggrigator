import React from "react";
import logo from "../../assets/images/logo.svg";
import "./header.css";
import { User } from "./User";
import { nav } from "../../assets/data/data";
import { Link } from "react-router-dom";
import { nav1 } from "../../assets/data/data";

export const Header = () => {
  // ✅ Check login status
  const isLoggedIn = localStorage.getItem("user");

  // ✅ Sticky header on scroll
  window.addEventListener("scroll", function () {
    const header = document.querySelector(".header");
    header.classList.toggle("active", window.scrollY > 100);
  });

  return (
    <header className='header'>
      <div className='scontainer flex'>
        <div className='logo'>
          <img src={logo} alt='logo' width='100px' />
        </div>

        {isLoggedIn && (
          <>
            <nav>
              <ul>
                {nav.map((link) => (
                  <li key={link.id}>
                    <Link to={link.url}>{link.text}</Link>
                  </li>
                ))}

                <ul className='navbar-links'>
                  {nav1.map((link1) => (
                    <li className='navbar-dropdown' key={link1.id}>
                      <Link to={link1.url}>News</Link>
                      <div className='dropdown'>
                        <Link to='/Sports'>Sports</Link>
                        <Link to='/Cyber'>Cyber Crime</Link>
                        <Link to='/Tech'>Tech</Link>
                        <Link to='/Politics'>Politics</Link>
                        <Link to='/Stock'>Stock Market</Link>
                      </div>
                    </li>
                  ))}
                </ul>
              </ul>
            </nav>

            <div className='account flexCenter'>
              <User />
            </div>
          </>
        )}
      </div>
    </header>
  );
};
