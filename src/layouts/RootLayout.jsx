import React, { useState, useEffect } from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import logoLight from "../assets/Marcus-Svart.png";
import logoDark from "../assets/Marcus-Lila.png";
import logoSun from "../assets/sun.png";
import logoMoon from "../assets/moon.png";

const RootLayout = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className={`Root-Layout ${theme}`}>
      <header>
        <nav className="navbar">
          <h1>The Flag App</h1>
          <img
            src={theme === "light" ? logoLight : logoDark}
            alt="logo"
            className="logo"
          />
          <button onClick={toggleTheme} className="modeButton">
            <img
              src={theme === "light" ? logoSun : logoMoon}
              alt="logo"
              className="logo__switch"
              alt=""
            />{" "}
            {theme === "light" ? "LIGHT MODE" : "DARK MODE"}
          </button>
        </nav>
      </header>
      <Outlet />
    </div>
  );
};

export default RootLayout;
