import React from "react";
import Ranking from "./Sections/Ranking";
import LevelCards from "./Sections/LevelCards";

const LandingPage = () => {
  return (
    <>
      {/* 명예의 전당 */}
      <Ranking />
      {/* 게임 난이도 선택 */}
      <LevelCards />
    </>
  );
};

export default LandingPage;
