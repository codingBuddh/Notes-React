import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log("db");
    try {
      const response = await fetch(" http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      // console.log(response);
      const data = await response.json();
      // console.log(data);
      if (response.ok) {
        data.user.token = data.token;
        // console.log(data);
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
      } else {
        setError(data.error);
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div>
      <header>
        <div className="header-title">
          <span>Keep Your Notes Here!</span>
        </div>
      </header>
      <div className="error-container">
        {error && <p className="error">{error}</p>}
      </div>
      <main>
        <div className="form-container">
          <p className="title">Login to continue</p>
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
            <button className="login" type="submit">
              Login
            </button>
          </form>
          <span>Don't have an account? </span>
          <a href="/signup">Sign Up</a>
        </div>
      </main>
    </div>
  );
};

export default Login;
