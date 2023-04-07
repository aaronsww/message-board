import { useContext, useState } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "../components/Navbar";
import Home from "../components/Home";
import Add from "../components/Add";
import Login from "../components/Login";
import Register from "../components/Register";
import { AuthProvider } from "../components/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<Add />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
