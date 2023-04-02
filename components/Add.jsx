import React from "react";
import { useState } from "react";
import "../src/App.css";

function Add() {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  return (
    <div className="compose"> 
      <input
        className=""
        placeholder="Enter Name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        className=""
        placeholder="Enter Message"
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button className="" type="submit">
        Send
      </button>
    </div>
  );
}

export default Add;
