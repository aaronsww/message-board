import { useState } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return <BrowserRouter>
  <Navbar />
  <Routes>
    <Route path="/" element={<Home  />} />
    <Route path="/add" element={<Add />} />
  </Routes>
</BrowserRouter>;
}

export default App;
