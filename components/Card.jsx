import React from "react";

function Card({ name, content, date }) {
  return (
    <div className="card">
      <div className="message">{content}</div>
      <div  className="user">{name}</div>
      <div  className="date">{date}</div>
    </div>
  );
}

export default Card;
