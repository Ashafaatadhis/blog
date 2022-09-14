import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import jwt_decode from "jwt-decode";
import "./navbar.css";

const Navbar = () => {
  const location = useLocation();
  const [decoded, setDecoded] = useState();
  const { auth } = useAuth();
  useEffect(() => {
    if (auth?.accessToken) {
      setDecoded(jwt_decode(auth?.accessToken));
    }
    console.log(decoded);
  }, []);
  document.addEventListener("scroll", (e) => {
    try {
      if (window.scrollY > 0) {
        document.getElementById("nav").style.backgroundColor = "white";
        document.getElementById("nav").style.boxShadow =
          "0 4px 2px -2px #f1f1f1";
        document.getElementById("nav-title").style.color = "black";

        document.getElementById("greeting").style.color = "black";
      } else {
        document.getElementById("nav").style.background = 0;
        document.getElementById("nav").style.boxShadow = "none";
        document.getElementById("nav").style.border = 0;
        document.getElementById("nav-title").style.color = "white";

        document.getElementById("greeting").style.color = "white";
      }
    } catch (e) {}
  });
  return (
    <nav id="nav">
      <div className="bungkus">
        <div className="nav-title" id="nav-title">
          Ad<span>his</span>
        </div>
        {location.pathname == "/admin" ? (
          <div className="nav-link">
            {/* <h1>Logout</h1> */}
            <Link to="/logout">Logout</Link>
          </div>
        ) : decoded?.username ? (
          <div className="greeting">
            <Link to="/admin" id="greeting">
              welcome, <span>{decoded.username}</span>
            </Link>
          </div>
        ) : (
          <div className="nav-link">
            <Link to="/login">Login</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
