import React from "react";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Home from "./Components/Home";
import { Routes, Route } from "react-router-dom";

const App= ()=> {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Signup />}  />
          <Route path="/login" element={<Login />}  />
          <Route path="/home" element={<Home />}  />
        </Routes>
    </div>
  )
}

export default App;
