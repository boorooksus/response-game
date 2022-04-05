import * as React from "react";
import { useState, useRef, useEffect, useMemo, useCallback } from "react";

const tiles = [0, 1, 2, 3];

function runner(idx: number) {
  console.log(idx);
}

const Tiles = () => {
  return (
    <div className="grid grid-cols-2 gap-x-0 max-w-md">
      {tiles.map((tile) => {
        return (
          <div
            className="aspect-square flex justify-center shadow-lg max-w-md bg-gray-200 border-solid border-2 border-gray-800"
            key={tile}
            id={String(tile)}
            onClick={(e) => {
              runner(parseInt(e.currentTarget.id));
            }}
          ></div>
        );
      })}
    </div>
  );
};

const GamePage = () => {
  const [status, setStatus] = useState("ready");
  const [result, setResult] = useState<number[]>([]);
  const timeout = useRef<number | null>(null);
  const startTime = useRef(0);
  const endTime = useRef(0);

  return (
    <div className="justify-center">
      <h5 className="text-gray-700 text-xl mb-2">Click color tile as soon as possible!</h5>
      {status === "ready" && (
        <button
          type="button"
          className="block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          Game Start
        </button>
      )}
      <Tiles />
    </div>
  );
};

export default GamePage;
