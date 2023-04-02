import React from "react";

function Card({ name, content }) {
  return (
    <div>
      <h3>{content}</h3>
      <h2>{name}</h2>
    </div>
  );
}

export default Card;
