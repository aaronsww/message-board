import React from "react";
import { useState } from "react";
import "../src/App.css";
import axios from "axios";
import { Link } from "react-router-dom";

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
    <div className="add">
      <div className="new">Add A New Message:</div>
      <form className="compose" onSubmit={handleSubmit}>
        <input
          className="name"
          placeholder="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          className="content"
          placeholder="Say Something..."
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button className="send" type="submit">
          Add
        </button>
      </form>
    </div>
  );
}

export default Add;
