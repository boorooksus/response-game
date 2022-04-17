import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const tableHeaders = ["Difficulty", "Ranking", "Name", "Time(ms)"];

// const rankers = [
//   { level: "hard", ranking: "1st", name: "user1", time: 1192.2 },
//   { level: "medium", ranking: "1st", name: "user2", time: 1215.6 },
//   { level: "easy", ranking: "1st", name: "user3", time: 2033.8 },
// ];

const Ranking = () => {
  interface Rankers {
    [key: string]: string;
  }
  interface RankerInfo {
    [key: string]: string;
  }
  const initailRankers = {
    easy: {},
  };
  const [rankers, setRankers] = useState<RankerInfo[][]>([]);
  useEffect(() => {
    getRankers();
  }, []);

  const getRankers = () => {
    axios.get("/api/scores/rankers").then((response) => {
      if (response.data.success) {
        setRankers(response.data.rankers);
      }
    });
  };

  const Table = () => {
    return (
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="border-b">
                  <tr className="bg-white">
                    {tableHeaders.map((item) => {
                      return (
                        <th key={item} scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 ">
                          {item}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {rankers.map((data, i) => {
                    return (
                      <tr className="bg-white border-b" key={i}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm  text-gray-900">{data[0].level}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm  text-gray-900">1st</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm  text-gray-900">{data[0].name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm  text-gray-900">{data[0].score}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="p-3 text-center bg-gray-100 text-gray-700">
        <h2 className=" text-3xl mb-4">Hall of Fame</h2>
        <Table />
        <button
          type="button"
          className="inline-block px-6 py-2.5  bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
        >
          <a href="/ranking">more ranking</a>
        </button>
      </div>
    </>
  );
};

export default Ranking;
