import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    alert(`Logging in with\nUsername: ${userName}`);
    // Add backend login logic here
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="userName">User Name</label>
        <input
          id="userName"
          type="text"
          value={userName}
          placeholder="Enter your username"
          onChange={(e) => setUserName(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>

      <div className="signup-redirect">
        <p>Don't have an account?</p>
        <button onClick={() => navigate("/register")}>Sign Up</button>
      </div>
    </div>
  );
};

export default Login;
