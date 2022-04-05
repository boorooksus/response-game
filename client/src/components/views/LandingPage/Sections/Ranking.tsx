import * as React from "react";

const tableHeaders = ["Difficulty", "Ranking", "Name", "Score"];

const rankers = [
  { level: "hard", ranking: "1st", name: "user1", score: 100 },
  { level: "medium", ranking: "1st", name: "user2", score: 100 },
  { level: "easy", ranking: "1st", name: "user3", score: 100 },
];

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
                {rankers.map((item, i) => {
                  return (
                    <tr className="bg-white border-b" key={i}>
                      {Object.values(item).map((desc) => {
                        return (
                          <td className="px-6 py-4 whitespace-nowrap text-sm  text-gray-900" key={desc}>
                            {desc}
                          </td>
                        );
                      })}
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

const Ranking = () => {
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
