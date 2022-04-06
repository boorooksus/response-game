import * as React from "react";
import { useState, useRef, useEffect } from "react";
import Button from "./Sections/Button";
import { useParams } from "react-router";
import EasyMode from "./Sections/EasyMode";
import MediumMode from "./Sections/MediumMode";
import HardMode from "./Sections/HardMode";

const GamePage = () => {
  const [Status, setStatus] = useState("ready");
  const [Target, setTarget] = useState(-1);
  const [Color, setColor] = useState(-1);
  const [Text, setText] = useState(-1);
  const [Fake, setFake] = useState(-1);
  const [TryCnt, setTryCnt] = useState(4);
  const [Result, setResult] = useState<number[]>([]);
  const timeout = useRef<number | null>(null);
  const startTime = useRef(0);
  const endTime = useRef(0);
  const { level } = useParams();

  useEffect(() => {
    setTryCnt(
      {
        Easy: 4,
        Medium: 6,
        Hard: 9,
      }[level!]!
    );
  }, []);

  const Game = () => {
    return (
      <div>
        {
          {
            Easy: (
              <EasyMode
                status={Status}
                target={Target}
                setTarget={setTarget}
                setTryCnt={setTryCnt}
                tryCnt={TryCnt}
                endTime={endTime}
                startTime={startTime}
                setResult={setResult}
                setStatus={setStatus}
                result={Result}
                timeout={timeout}
              />
            ),
            Medium: (
              <MediumMode
                status={Status}
                target={Target}
                setTarget={setTarget}
                setTryCnt={setTryCnt}
                tryCnt={TryCnt}
                endTime={endTime}
                startTime={startTime}
                setResult={setResult}
                setStatus={setStatus}
                result={Result}
                timeout={timeout}
              />
            ),
            Hard: (
              <HardMode
                status={Status}
                target={Target}
                setTarget={setTarget}
                setTryCnt={setTryCnt}
                tryCnt={TryCnt}
                endTime={endTime}
                startTime={startTime}
                setResult={setResult}
                setStatus={setStatus}
                result={Result}
                timeout={timeout}
                Color={Color}
                setColor={setColor}
                Text={Text}
                setText={setText}
                Fake={Fake}
                setFake={setFake}
              />
            ),
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
          <h5 className="text-gray-700 text-xl mb-2">
            {
              {
                Easy: "색깔이 있는 타일을 클릭하세요",
                Medium: "색깔이 있는 타일을 클릭하세요",
                Hard: "제시된 색상의 타일을 클릭하세요",
              }[level!]
            }
          </h5>
          <br></br>
          <Button
            status={Status}
            setStatus={setStatus}
            setTarget={setTarget}
            setTryCnt={setTryCnt}
            timeout={timeout}
            startTime={startTime}
            setResult={setResult}
            level={level!}
            Color={Color}
            setColor={setColor}
            Text={Text}
            setText={setText}
            Fake={Fake}
            setFake={setFake}
          />
          <br></br>
          {
            {
              ready: <div></div>,
              playing: (
                <div>
                  <h5 className="text-gray-500 text-2xl mb-2">count: {TryCnt + 1}</h5>
                  <br></br>
                </div>
              ),
              success: (
                <div>
                  <h5 className="text-green-500 text-3xl mb-2">SUCCESS!</h5>
                  <br></br>
                  <h5 className="text-gray-700 text-2xl mb-2">평균 클릭 시간: </h5>
                  <h5 className="text-gray-700 text-3xl mb-2">{Result.length > 0 && Result.reduce((a, c) => a + c) / Result.length} ms</h5>
                </div>
              ),
              fail: (
                <div>
                  <h5 className="text-red-500 text-3xl mb-2">FAIL</h5>
                  <h5 className="text-gray-500 text-2xl mb-2">Wrong click</h5>
                  <br></br>
                </div>
              ),
            }[Status]
          }
        </div>
      </div>
    </div>
  );
};

export default GamePage;
