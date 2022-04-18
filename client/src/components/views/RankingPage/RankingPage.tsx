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
  const [Limit, setLimit] = useState(5);

  useEffect(() => {
    getScores();
  }, [Skip]);

  const getScores = () => {
    let body = {
      skip: Skip,
      limit: Limit,
    };

    axios.post("/api/scores/ranking", body).then((response) => {
      if (response.data.success) {
        setEasyRanking([...response.data.ranking.easy]);
        setMediumRanking([...response.data.ranking.medium]);
        setHardRanking([...response.data.ranking.hard]);

        // console.log(response.data.ranking.medium);

        // let temp = new Date(response.data.rankers[0].createdAt);
        // console.log(temp.toISOString().split("T")[0] + " " + temp.toTimeString().split(" ")[0]);
      }
    });
  };

  return (
    <>
      <div className="text-center text-gray-700 rounded-xl shadow-lg bg-white mb-4">
        <h2 className=" text-2xl mb-4 pt-4">Easy Mode Ranking</h2>
        <div>{easyRanking && <Ranking ranking={easyRanking} Skip={Skip} />}</div>
      </div>

      <div className="text-center text-gray-700 rounded-xl shadow-lg bg-white mb-4">
        <h2 className=" text-2xl mb-4 pt-4">Medium Mode Ranking</h2>
        <div>{mediumRanking && <Ranking ranking={mediumRanking} Skip={Skip} />}</div>
      </div>

      <div className="text-center text-gray-700 rounded-xl shadow-lg bg-white mb-4">
        <h2 className=" text-2xl mb-4 pt-4">Hard Mode Ranking</h2>
        <Ranking ranking={hardRanking} Skip={Skip} />
      </div>

      <div className="flex items-center justify-center">
        <div className="inline-flex shadow-md hover:shadow-lg focus:shadow-lg" role="group">
          <button
            onClick={() => {
              Skip - Limit >= 0 && setSkip(Skip - Limit);
            }}
            type="button"
            className="rounded-l inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"
          >
            ◁
          </button>
          <button
            type="button"
            onClick={() => {
              (easyRanking.length == Limit || mediumRanking.length == Limit || hardRanking.length == Limit) && setSkip(Skip + Limit);
            }}
            className=" rounded-r inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"
          >
            ▷
          </button>
        </div>
      </div>
    </>
  );
};

export default RankingPage;
