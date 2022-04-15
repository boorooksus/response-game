import * as React from "react";
import { useReducer, Reducer, useCallback, useState, useRef, useEffect } from "react";
import Button from "./Sections/Button";
import { useParams } from "react-router";
import EasyMode from "./Sections/EasyMode";
import MediumMode from "./Sections/MediumMode";
import HardMode from "./Sections/HardMode";
import { Action } from "redux";

interface ReducerState {
  // status: "ready" | "playing" | "success" | "fail";
  status: string;
  target: number;
  tryCnt: number;
  result: number[];
  fake: number;
  color: string;
  text: string;
}

const initialState: ReducerState = {
  status: "ready",
  target: -1,
  tryCnt: 6,
  result: [],
  fake: -1,
  color: "",
  text: "",
};

export const SET_STATUS = "SET_STATUS";
export const SET_TABLE = "SET_TABLE";
export const SET_RESULT = "SET_RESULT";

interface SetStateAction {
  type: typeof SET_STATUS;
  // status: "ready" | "playing" | "success" | "fail";
  status: string;
}

const setStatus = (status: string): SetStateAction => {
  return { type: SET_STATUS, status };
};

interface SetTableAction {
  type: typeof SET_TABLE;
  target: number;
  fake: number;
  color: string;
  text: string;
  tryCnt: number;
}

const setTable = (target: number, fake: number, text: string, color: string, tryCnt: number): SetTableAction => {
  return { type: SET_TABLE, target, fake, text, color, tryCnt };
};

interface SetResultAction {
  type: typeof SET_RESULT;
}

type ReducerActions = SetStateAction | SetTableAction | SetResultAction;
const reducer = (state: ReducerState, action: ReducerActions): ReducerState => {
  switch (action.type) {
    case SET_STATUS:
      return { ...state, status: action.status };
    case SET_TABLE:
      return { ...state, target: action.target, fake: action.fake, text: action.text, color: action.color, tryCnt: action.tryCnt };
    default:
      return state;
  }
};

const GamePage = () => {
  const [state, dispatch] = useReducer<Reducer<ReducerState, ReducerActions>>(reducer, initialState);
  const { status, target, tryCnt, fake, color, text } = state;

  // const [status, setStatus] = useState("ready");
  // const [target, setTarget] = useState(-1);
  // const [color, setColor] = useState(-1);
  // const [text, setText] = useState(-1);
  // const [fake, setFake] = useState(-1);
  // const [tryCnt, setTryCnt] = useState(4);
  // const [result, setResult] = useState<number[]>([]);
  const startTime = useRef(0);
  const endTime = useRef(0);
  const { level } = useParams();
  const [result, setResult] = useState(0);

  useEffect(() => {
    if (status === "playing") {
      startTime.current = new Date().getMilliseconds();
    } else if (status === "success") {
      endTime.current = new Date().getMilliseconds();
      setResult(endTime.current - startTime.current);
    }
  }, [status]);

  const Game = () => {
    return (
      <div>
        {
          {
            // easy: <EasyMode status={status} target={target} tryCnt={tryCnt} dispatch={dispatch} />,
            medium: <MediumMode status={status} target={target} tryCnt={tryCnt} dispatch={dispatch} />,
            // hard: <HardMode status={status} target={target} fake={fake} color={color} text={text} tryCnt={tryCnt} dispatch={dispatch} />,
          }[level!]
        }
      </div>
    );
  };

  return (
    <div>
      <h5 className="text-gray-700 text-xl mb-2 leading-tight font-medium ">{level?.toUpperCase()} MODE</h5>
      <br></br>

      <div className="grid grid-cols-2 gap-x-1 sm:grid-cols-1 md:grid-cols-2 max-w-3xl">
        <Game />
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
      </div>
    </div>
  );
};

export default GamePage;
