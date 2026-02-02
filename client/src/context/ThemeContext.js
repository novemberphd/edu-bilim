// src/context/ThemeContext.js
import React, { createContext, useState, useContext } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.style.setProperty("--bg-color", "#121212");
      document.documentElement.style.setProperty("--text-color", "#ffffff");
    } else {
      document.documentElement.style.setProperty("--bg-color", "#ffffff");
      document.documentElement.style.setProperty("--text-color", "#121212");
    }
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
