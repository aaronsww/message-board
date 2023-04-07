import React from "react";
import { useState } from "react";
import "../src/App.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Add() {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/messages/add",
        {
          name: name,
          content: content,
        },
        //send req with cookie
        { withCredentials: true }
      );
      console.log(response.data);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="add">
      <div className="new">Add New Message:</div>
      <form className="compose" onSubmit={handleSubmit}>
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
