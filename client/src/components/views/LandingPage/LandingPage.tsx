import React from "react";
import { useEffect } from "react";
import axios from "axios";
import Ranking from "./Sections/Ranking";
import LevelCards from "./Sections/LevelCards";

const LandingPage = () => {
  useEffect(() => {
    axios.get("/api/hello").then((response) => {
      console.log(response);
    });
  }, []);

  return (
    <>
      <Ranking />
      <br></br>
      <LevelCards />
    </>
  );
};

export default LandingPage;
