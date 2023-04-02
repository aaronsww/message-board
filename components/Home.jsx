import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";

function Home() {
  const [wholeData, setWholeData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/messages")
      .then((res) => {
        console.log(res);
        setWholeData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {wholeData.map((item) => {
        return (
          <Card name={item.name} content={item.content} date={item.date} />
        );
      })}
    </div>
  );
}

export default Home;
