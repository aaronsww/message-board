import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  // const [name, setName] = useState("");
  // const [content, setContent] = useState("");
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

  return <div>{wholeData.map((item) => <p>{item.name}</p>)}</div>;
}

export default Home;
