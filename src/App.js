import React from "react";
import { BrowserRouter, Route, Routes, Link, Navigate } from "react-router-dom";
import "./App.css";
import Signin from "./sigininsignup/Signin";
import MainPage from "./components/pages/MainPage";
import Login from "./components/GovtOfficial/Login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/main/*" element={<MainPage />}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
