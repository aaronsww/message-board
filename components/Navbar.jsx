import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="nav">
      <p>Mini Message Board</p>
      <div>
        <p className="navButton">
          <Link to="/">Message Board</Link>
        </p>
        <p className="navButton">
          <Link to="/add">Add Message</Link>
        </p>
      </div>
    </div>
  );
}

export default Navbar;
