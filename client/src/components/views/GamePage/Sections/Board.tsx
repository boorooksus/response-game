import * as React from "react";
import { Dispatch, FunctionComponent } from "react";
import Button from "./Button";

interface Props {
  status: string;
  tryCnt: number;
  level: string;
  result: number;
  target: number;
  fake: number;
  color: string;
  text: string;
  dispatch: Dispatch<any>;
}

const Board: FunctionComponent<Props> = ({ status, tryCnt, level, result, target, fake, color, text, dispatch }) => {
  return (
    <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
      <h5 className="text-gray-700 text-xl mb-2">
        {
          {
            easy: "색깔이 있는 타일을 클릭하세요",
            medium: "색깔이 있는 타일을 클릭하세요",
            hard: "제시된 색상의 타일을 클릭하세요",
          }[level!]
        }
      </h5>
      <br></br>
      <Button status={status} target={target} fake={fake} color={color} text={text} tryCnt={tryCnt} dispatch={dispatch} level={level!} />
      <br></br>
      {
        {
          ready: <div></div>,
          playing: (
            <div>
              <h5 className="text-gray-500 text-2xl mb-2">count: {tryCnt + 1}</h5>
              <br></br>
            </div>
          ),
          success: (
            <div>
              <h5 className="text-green-500 text-3xl mb-2">SUCCESS!</h5>
              <br></br>
              <h5 className="text-gray-700 text-2xl mb-2">Time: </h5>
              <h5 className="text-gray-700 text-3xl mb-2">{result} ms</h5>
            </div>
          ),
          fail: (
            <div>
              <h5 className="text-red-500 text-3xl mb-2">FAIL</h5>
              <h5 className="text-gray-500 text-2xl mb-2">Wrong click</h5>
              <br></br>
            </div>
          ),
        }[status]
      }
    </div>
  );
};

export default Board;
