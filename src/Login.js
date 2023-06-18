import React, { useState } from "react";
import "./Login.css";
import Register from "./Register";

const Login = ({ handleLogin, loginError }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showRegister, setShowRegister] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(username, password);
  };

  const handleSwitchToRegister = () => {
    setShowRegister(true);
  };

  const handleGoBack = () => {
    setShowRegister(false);
  };

  if (showRegister) {
    return <Register handleGoBack={handleGoBack} />;
  }

  return (
    <div className="login-container">
      <div className="background-image"></div>
      <div className="login-form-container">
        <h2>Login</h2>
        {loginError && <p className="error-message">{loginError}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="button-container">
            <button type="submit">Login</button>
            <button type="button" onClick={handleSwitchToRegister}>
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
