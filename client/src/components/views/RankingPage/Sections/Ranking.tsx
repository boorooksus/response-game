import React from "react";

interface rankInfo {
  [key: string]: string;
}

interface Props {
  ranking: rankInfo[];
  Skip: number;
}

const Ranking = (props: Props) => {
  const tableHeaders = ["Ranking", "Name", "Speed(ms/round)", "date"];

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            {/* 랭킹 테이블 */}
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
                {props.ranking &&
                  props.ranking.map((data, i) => {
                    return (
                      <tr className="bg-white border-b" key={i}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm  text-gray-900">{props.Skip + i + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm  text-gray-900">{data.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm  text-gray-900">{data.score}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm  text-gray-900">
                          {new Date(data.createdAt).toISOString().split("T")[0]}
                        </td>
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

export default Ranking;
