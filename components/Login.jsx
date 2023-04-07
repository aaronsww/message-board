import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../components/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setIsAuth, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        {
          email,
          password,
        },
        //send res with cookie
        { withCredentials: true }
      );
      console.log(response.headers);
      if (response.status === 200) {
        setIsAuth(true);
        setUser(response.data);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      alert("Access denied. Invalid credentials.");
    }
  };

  return (
    <div className="add">
      <div className="new">Login</div>
      <form className="compose" onSubmit={handleSubmit}>
        <input
          className="name"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="name"
          placeholder="Pasword"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="prompt"><Link to="/register">Don't have an account ?</Link></p>
        <button className="send" type="submit">
          Add
        </button>
      </form>
    </div>
  );
}

export default Login;
