import React from "react";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../components/AuthProvider";
import axios from "axios";
import Card from "./Card";
import { Link } from "react-router-dom";

function Home() {
  const [wholeData, setWholeData] = useState([]);
  const { isAuth } = useContext(AuthContext);

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
      {!isAuth && (
        <p className="goLogin">
          <Link to="/register">Register</Link>&nbsp; &nbsp;to add a message
        </p>
      )}
      {wholeData.map((item) => {
        return (
          <Card name={item.name} content={item.content} date={item.date} />
        );
      })}
    </div>
  );
}

export default Home;
