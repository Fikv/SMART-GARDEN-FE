import React, { useState } from "react";
import "./Register.css";
import Login from "./Login"; // Assuming you have a Login component

const Register = ({ handleGoBack }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [email, setEmail] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      console.log("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          email,
        }),
      });

      if (response.ok) {
        console.log("Registration successful");
        setRegistrationSuccess(true);
      } else {
        console.log("Registration failed");
        // Handle the registration failure case
      }
    } catch (error) {
      console.log("Error:", error);
      // Handle the error case
    }
  };

  if (registrationSuccess) {
    return <Login />;
  }

  return (
    <div className="register-container">
      <div className="background-image"></div>
      <div className="register-form-container">
        <h2>Register</h2>
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
          <input
            type="password"
            placeholder="Repeat Password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="button-container">
            <button type="submit">Register</button>
            <button type="button" onClick={handleGoBack}>
              Go Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
