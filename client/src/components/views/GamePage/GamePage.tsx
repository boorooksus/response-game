import * as React from "react";
import { useReducer, Reducer, useCallback, useState, useRef, useEffect } from "react";
import Button from "./Sections/Button";
import { useParams } from "react-router";
import EasyMode from "./Sections/EasyMode";
import MediumMode from "./Sections/MediumMode";
import HardMode from "./Sections/HardMode";
import { Action } from "redux";
import { ReducerState, SET_STATUS, SET_TABLE, SET_RESULT, SetStateAction, SetTableAction, SetResultAction, ReducerActions } from "./types";
import Board from "./Sections/Board";

const initialState: ReducerState = {
  status: "ready",
  target: -1,
  tryCnt: 6,
  result: [],
  fake: -1,
  color: "",
  text: "",
};

const setStatus = (status: string): SetStateAction => {
  return { type: SET_STATUS, status };
};

const setTable = (target: number, fake: number, text: string, color: string, tryCnt: number): SetTableAction => {
  return { type: SET_TABLE, target, fake, text, color, tryCnt };
};

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

  const startTime = useRef(0);
  const endTime = useRef(0);
  const { level } = useParams();
  const [result, setResult] = useState(0);

  useEffect(() => {
    if (status === "playing") {
      startTime.current = new Date().getTime();
    } else if (status === "success") {
      endTime.current = new Date().getTime();
      setResult(endTime.current - startTime.current);
    }
  }, [status]);

  const Game = () => {
    return (
      <div>
        {
          {
            easy: (
              <div>
                <EasyMode status={status} target={target} tryCnt={tryCnt} dispatch={dispatch} />
              </div>
            ),
            medium: <MediumMode status={status} target={target} tryCnt={tryCnt} dispatch={dispatch} />,
            hard: (
              <div>
                <HardMode status={status} target={target} fake={fake} color={color} text={text} tryCnt={tryCnt} dispatch={dispatch} />
              </div>
            ),
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
        <Board status={status} tryCnt={tryCnt} result={result} level={level!} target={target} fake={fake} color={color} text={text} dispatch={dispatch} />
      </div>
    </div>
  );
};

export default GamePage;
