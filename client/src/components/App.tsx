import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./views/NavBar/NavBar";
import LandingPage from "./views/LandingPage/LandingPage";
import GamePage from "./views/GamePage/GamePage";
import RegisterPage from "./views/RegisterPage/RegisterPage";
import RankingPage from "./views/RankingPage/RankingPage";

export default function App() {
  return (
    <div>
      <NavBar />
      <div style={{ width: "80%", margin: "3rem auto" }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/game/:level" element={<GamePage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="ranking" element={<RankingPage />} />
        </Routes>
      </div>
    </div>
  );
}
