import React, { useState, useEffect } from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import logoLight from "../assets/Marcus-Svart.png";
import logoDark from "../assets/Marcus-Lila.png";
import logoSun from "../assets/sun.png";
import logoMoon from "../assets/moon.png";

const RootLayout = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.className = theme;

    // Trigger animation when theme changes
    setAnimate(true);
    const timeoutId = setTimeout(() => {
      setAnimate(false);
    }, 1000); // Reset animation state after 1 second

    return () => clearTimeout(timeoutId);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Function for ripple effect
  const handleRipple = (e) => {
    const button = e.currentTarget;

    const ripple = document.createElement("span");
    ripple.className = "ripple";

    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

    button.appendChild(ripple);
    ripple.addEventListener("animationend", () => {
      ripple.remove();
    });
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
          <button
            onClick={(e) => {
              toggleTheme();
              handleRipple(e);
            }}
            className="modeButton"
          >
            <div className="logo-container">
              <div className="logo-switch-container">
                {/* Light Mode: Sun icon slides in, Moon slides out */}
                <img
                  src={logoMoon}
                  alt="logo"
                  className={`logo__switch ${
                    animate ? "slide-out-right" : ""
                  } ${theme === "dark" ? "hidden" : "slide-in-left"}`}
                />

                <img
                  src={logoSun}
                  alt="logo"
                  className={`logo__switch ${animate ? "slide-out-left" : ""} ${
                    theme === "light" ? "hidden" : "slide-in-right"
                  }`}
                />
              </div>
            </div>
            {theme === "light" ? "LIGHT MODE" : "DARK MODE"}
          </button>
        </nav>
      </header>
      <Outlet />
    </div>
  );
};

export default RootLayout;
