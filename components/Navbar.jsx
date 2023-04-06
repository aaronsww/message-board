import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider";

function Navbar() {
  const { isAuth } = useContext(AuthContext);
  return (
    <div className="nav">
      <p className="title">Mini Message Board</p>
      <div className="navElements">
        <p className="navButton">
          <Link to="/">Messages</Link>
        </p>
        {isAuth && (
          <p className="navButton">
            <Link to="/add">Add Message</Link>
          </p>
        )}
        {!isAuth && (
          <p className="navButton">
            <Link to="/login">Login</Link>
          </p>
        )}
      </div>
    </div>
  );
}

export default Navbar;
