// src/context/AuthContext.js
import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [myCourses, setMyCourses] = useState([]);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const addCourse = (course) => {
    setMyCourses([...myCourses, course]);
  };

  return (
    <AuthContext.Provider value={{ user, myCourses, login, logout, addCourse }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
