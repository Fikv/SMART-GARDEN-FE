import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import MainContent from "./MainContent";
import AdminSettings from "./AdminSettings";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [showRegister, setShowRegister] = useState(false);
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
const handleLogin = async (username, password) => {
  try {
    const response = await fetch("http://localhost:3000/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.status === 200) {
     
      localStorage.setItem("isLoggedIn", "true");
  
      setIsLoggedIn(true);
      navigate("/");
    } else if (response.status === 401) {
      throw new Error("Invalid username or password");
    } else {
      throw new Error("An error occurred during login");
    }
  } catch (error) {
    console.log("Error:", error);
    setLoginError(error.message);
 
  }
};

  const handleRegisterClick = () => {
    setShowRegister(true);
  };

  const handleRegister = () => {
    setShowRegister(false);
  };

  return (
    <div>
      <Routes>
        <Route
          path="/login"
          element={
            !isLoggedIn && !showRegister && (
              <Login
                handleLogin={handleLogin}
                handleRegister={handleRegisterClick} // Update prop name
                loginError={loginError}
              />
            )
          }
        />
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <MainContent />
            ) : (
              <Login
                handleLogin={handleLogin}
                handleRegisterClick={handleRegisterClick}
                loginError={loginError}
              />
            )
          }
        />
        <Route path="/admin" element={<AdminSettings />} />
      </Routes>

      {!isLoggedIn && showRegister && <Register handleRegister={handleRegister} />}
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
