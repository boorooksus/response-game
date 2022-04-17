import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Ranking from "./Sections/Ranking";

const RankingPage = () => {
  interface ScoreInfo {
    [key: string]: string;
  }
  const [easyRanking, setEasyRanking] = useState<ScoreInfo[]>([]);
  const [mediumRanking, setMediumRanking] = useState<ScoreInfo[]>([]);
  const [hardRanking, setHardRanking] = useState<ScoreInfo[]>([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(10);

  useEffect(() => {
    getScores();
  }, []);

  const getScores = () => {
    let body = {
      skip: Skip,
      limit: Limit,
    };

    axios.post("/api/scores/ranking", body).then((response) => {
      if (response.data.success) {
        setEasyRanking([...easyRanking, ...response.data.ranking.easy]);
        setMediumRanking([...mediumRanking, ...response.data.ranking.medium]);
        setHardRanking([...hardRanking, ...response.data.ranking.hard]);

        // console.log(response.data.ranking.medium);

        // let temp = new Date(response.data.rankers[0].createdAt);
        // console.log(temp.toISOString().split("T")[0] + " " + temp.toTimeString().split(" ")[0]);
      }
    });
  };

  return (
    <>
      <div className="p-3 text-center bg-gray-100 text-gray-700">
        <h2 className=" text-2xl mb-4">Easy Mode Ranking</h2>
        <div>{easyRanking && <Ranking ranking={easyRanking} />}</div>
      </div>
      <div className="p-3 text-center bg-gray-100 text-gray-700">
        <h2 className=" text-2xl mb-4">Medium Mode Ranking</h2>
        <div>{mediumRanking && <Ranking ranking={mediumRanking} />}</div>
      </div>
      <div className="p-3 text-center bg-gray-100 text-gray-700">
        <h2 className=" text-2xl mb-4">Hard Mode Ranking</h2>
        <Ranking ranking={hardRanking} />
      </div>
    </>
  );
};

export default RankingPage;
