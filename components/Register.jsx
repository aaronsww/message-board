import React from "react";
import { useState, useContext } from "react";
import "../src/App.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // process.env = {...process.env, ...loadEnv(mode, process.cwd())}

  const { setIsAuth, setUser } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/register`,
        {
          name,
          email,
          password,
        }
      );
      console.log(response.data);
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  return (
    <div className="add">
      <div className="new">Register</div>
      <form className="compose" onSubmit={handleSubmit}>
        <input
          className="name"
          placeholder="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="name"
          placeholder="Email address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="name"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="prompt">
          <Link to="/login">Already have an account ?</Link>
        </p>
        <button className="send" type="submit">
          Sign up
        </button>
      </form>
    </div>
  );
}

export default Register;
