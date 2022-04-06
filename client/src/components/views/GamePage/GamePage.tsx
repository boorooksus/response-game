import * as React from "react";
import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import Button from "./Sections/Button";

const GamePage = () => {
  const [status, setStatus] = useState("ready");
  const [target, setTarget] = useState(-1);
  const [tryCnt, setTryCnt] = useState(4);
  const [result, setResult] = useState<number[]>([]);
  const timeout = useRef<number | null>(null);
  const startTime = useRef(0);
  const endTime = useRef(0);

  const tiles = [0, 1, 2, 3];

  // useEffect(() => {
  //   console.log("hi");
  // }, [status]);

  function onClickTile(idx: number) {
    if (status === "playing") {
      if (target === idx) {
        let nextTarget = -1;
        while (nextTarget === -1 || nextTarget === target) {
          nextTarget = Math.floor(Math.random() * 4);
        }
        setTarget(nextTarget);
        setTryCnt(tryCnt - 1);

        endTime.current = new Date().getTime();
        setResult((prevResult) => {
          return [...prevResult, endTime.current - startTime.current];
        });

        if (tryCnt === 0) {
          setStatus("success");
          console.log(`avg result: ${result.reduce((a, c) => a + c) / result.length}ms`);
        }
      } else {
        console.log("fail");
        clearTimeout(timeout.current!);

        setStatus("fail");
      }
    }
  }

  const Tiles = () => {
    return (
      <div className="grid grid-cols-2 gap-x-0 max-w-md">
        {tiles.map((tile) => {
          return (
            <div key={tile}>
              {
                {
                  ready: (
                    <div
                      className="aspect-square flex justify-center max-w-md bg-gray-200 border-solid border-2"
                      id={String(tile)}
                      onClick={(e) => {
                        onClickTile(parseInt(e.currentTarget.id));
                      }}
                    ></div>
                  ),
                  playing:
                    target === tile ? (
                      <div
                        className="aspect-square flex justify-center max-w-md bg-red-300 border-solid border-2 border-white"
                        id={String(tile)}
                        onClick={(e) => {
                          onClickTile(parseInt(e.currentTarget.id));
                        }}
                      ></div>
                    ) : (
                      <div
                        className="aspect-square flex justify-center max-w-md bg-gray-300 border-solid border-2 border-white"
                        id={String(tile)}
                        onClick={(e) => {
                          onClickTile(parseInt(e.currentTarget.id));
                        }}
                      ></div>
                    ),
                  success: (
                    <div
                      className="aspect-square flex justify-center max-w-md bg-gray-300 border-solid border-2 border-white"
                      id={String(tile)}
                      onClick={(e) => {
                        onClickTile(parseInt(e.currentTarget.id));
                      }}
                    ></div>
                  ),
                }[status]
              }
            </div>
          );
        })}
      </div>
    );
  };

  const Game = () => {
    return (
      <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
        <Tiles />
      </div>
    );
  };

  return (
    <div>
      <h5 className="text-gray-700 text-xl mb-2 leading-tight font-medium ">Easy mode</h5>
      <br></br>

      <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2">
        <Game />
        <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
          <h5 className="text-gray-700 text-xl mb-2">Click color tile as soon as possible!</h5>
          <br></br>
          <Button status={status} setStatus={setStatus} setTarget={setTarget} setTryCnt={setTryCnt} timeout={timeout} startTime={startTime} setResult={setResult} />
          <br></br>
          {status === "success" && result.length > 0 && (
            <div>
              <h5 className="text-green-500 text-3xl mb-2">SUCCESS!</h5>
              <br></br>
              <h5 className="text-gray-700 text-2xl mb-2">Average Click Time: </h5>
              <h5 className="text-gray-700 text-3xl mb-2">{result.reduce((a, c) => a + c) / result.length} ms</h5>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GamePage;
