import * as React from "react";
import { useReducer, Reducer, useState, useRef, useEffect, createContext, useMemo } from "react";
import { useParams } from "react-router";
import EasyMode from "./Sections/EasyMode";
import MediumMode from "./Sections/MediumMode";
import HardMode from "./Sections/HardMode";
import { ReducerState, SET_STATUS, SET_TABLE, ReducerActions, Context } from "./types";
import Board from "./Sections/Board";

export const GameContext = createContext<Context>({
  status: "ready",
  target: -1,
  tryCnt: 6,
  fake: -1,
  color: "",
  text: "",
  dispatch: () => {},
});

const initialState: ReducerState = {
  status: "ready",
  target: -1,
  tryCnt: 6,
  fake: -1,
  color: "",
  text: "",
};

const reducer = (state: ReducerState, action: ReducerActions): ReducerState => {
  switch (action.type) {
    case SET_STATUS:
      return { ...state, status: action.status };
    case SET_TABLE:
      return {
        ...state,
        target: action.target,
        fake: action.fake,
        text: action.text,
        color: action.color,
        tryCnt: action.tryCnt,
      };
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

  // 난이도 별 게임 컴포넌트 리턴
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
                <HardMode
                  status={status}
                  target={target}
                  fake={fake}
                  color={color}
                  text={text}
                  tryCnt={tryCnt}
                  dispatch={dispatch}
                />
              </div>
            ),
          }[level!]
        }
      </div>
    );
  };

  const value = useMemo(
    () => ({ status, target, tryCnt, result, fake, color, text, dispatch }),
    [status, target, tryCnt, result, fake, color, text]
  );

  return (
    <div>
      <h2 className="text-gray-700 text-xl mb-2 leading-tight font-semibold">{level?.toUpperCase()} MODE</h2>

      <div className="grid grid-cols-2 gap-x-1 sm:grid-cols-1 md:grid-cols-2 max-w-3xl">
        {/* 게임판 */}
        <Game />
        {/* 게임 정보 출력 보드 */}
        <GameContext.Provider value={value}>
          <Board result={result} level={level!} />
        </GameContext.Provider>
      </div>
    </div>
  );
};

export default GamePage;
