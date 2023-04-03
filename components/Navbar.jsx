import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="nav">
      <p className="title">Mini Message Board</p>
      <div className="navElements">
        <p className="navButton">
          <Link to="/">Messages</Link>
        </p>
        <p className="navButton">
          <Link to="/add">Add Message</Link>
        </p>
      </div>
    </div>
  );
}

export default Navbar;
