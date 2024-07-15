import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Signup = ({ setUser }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }
    try {
      const response = await fetch(" http://localhost:8000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, confirmPassword }),
      });
      const data = await response.json();
      if (response.ok) {
        data.user.token = data.token;
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
      } else {
        setError(data.error);
      }
    } catch (err) {
      console.error("Signup failed:", err);
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div>
      <header>
        <div className="header-title">
          <h1>Swift Note</h1>
          <span>Keep Your Notes Here!</span>
        </div>
      </header>
      <div className="error-container">
        {error && <p className="error">{error}</p>}
      </div>
      <main>
        <div className="form-container">
          <p className="title">Create an account!</p>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength="6"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              minLength="6"
              required
            />
            <button className="login" type="submit">
              Sign Up
            </button>
          </form>
          <span>Already have an account? </span>
          <a href="/login">Log In</a>
        </div>
      </main>
    </div>
  );
};

export default Signup;
