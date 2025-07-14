import { useState } from "react";
import axios from "axios";
import "./Register.css"; // Separate CSS for Register

const Register = () => {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(event) {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/api/auth/register", {
        name,
        userName,
        password,
      });
      console.log(response.data);
      alert("Registration Successful");
    } catch (e) {
      console.error("Registration Error", e);
      alert("Registration Failed");
    }
  }

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <label htmlFor="name">Full Name</label>
        <input
          id="name"
          name="name"
          value={name}
          type="text"
          placeholder="Enter your full name"
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="userName">User Name</label>
        <input
          id="userName"
          name="userName"
          value={userName}
          type="text"
          placeholder="Choose a username"
          onChange={(e) => setUserName(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          value={password}
          type="password"
          placeholder="Create a password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
