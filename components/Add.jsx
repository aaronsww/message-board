import React from "react";
import { useState } from "react";
import "../src/App.css";
import axios from "axios";

function Add() {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/messages/add",
        {
          name: name,
          content: content,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="compose">
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Add;
