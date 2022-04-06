import * as React from "react";
import { useState, useRef } from "react";
import Button from "./Sections/Button";
import { useParams } from "react-router";
import EasyMode from "./Sections/EasyMode";
import MediumMode from "./Sections/MediumMode";

const GamePage = () => {
  const [status, setStatus] = useState("ready");
  const [target, setTarget] = useState(-1);
  const [tryCnt, setTryCnt] = useState(4);
  const [result, setResult] = useState<number[]>([]);
  const timeout = useRef<number | null>(null);
  const startTime = useRef(0);
  const endTime = useRef(0);
  const { level } = useParams();

  // useEffect(() => {
  //   console.log("hi");
  // }, [status]);

  const Game = () => {
    return (
      <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
        {
          {
            Easy: (
              <EasyMode
                status={status}
                target={target}
                setTarget={setTarget}
                setTryCnt={setTryCnt}
                tryCnt={tryCnt}
                endTime={endTime}
                startTime={startTime}
                setResult={setResult}
                setStatus={setStatus}
                result={result}
                timeout={timeout}
              />
            ),
            Medium: (
              <MediumMode
                status={status}
                target={target}
                setTarget={setTarget}
                setTryCnt={setTryCnt}
                tryCnt={tryCnt}
                endTime={endTime}
                startTime={startTime}
                setResult={setResult}
                setStatus={setStatus}
                result={result}
                timeout={timeout}
              />
            ),
            Hard: "HardMode",
          }[level!]
        }
      </div>
    );
  };

  return (
    <div>
      <h5 className="text-gray-700 text-xl mb-2 leading-tight font-medium ">{level} mode</h5>
      <br></br>

      <div className="grid grid-cols-2 gap-x-1 sm:grid-cols-1 md:grid-cols-2 max-w-3xl">
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
          {status === "fail" && (
            <div>
              <h5 className="text-red-500 text-3xl mb-2">FAIL</h5>
              <h5 className="text-gray-500 text-2xl mb-2">Wrong click</h5>
              <br></br>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GamePage;
