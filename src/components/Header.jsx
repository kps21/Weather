import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import weatherIcon from "./weather.png";

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <Link className="navigation-link" to="/">
          <img
            src={weatherIcon}
            style={{ maxHeight: "5vh", paddingLeft: "0" }}
            alt="weather icon"
          />
        </Link>
      </div>
      <nav className="navigation">
        <Link className="navigation-link" to="/">
          Home
        </Link>

        <Link className="navigation-link" to="/search">
          Weather
        </Link>
      </nav>
    </header>
  );
}

export default Header;
