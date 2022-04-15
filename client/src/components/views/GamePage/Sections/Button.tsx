import * as React from "react";
import { useState, useRef, useEffect, Dispatch, FunctionComponent } from "react";
import { SET_STATUS, SET_TABLE } from "../GamePage";

const buttonInfos = [
  { color: "blue", text: " start game" },
  { color: "gray", text: "restart" },
];
const colors = ["red", "green", "blue", "yellow", "purple", "pink"];

interface Props {
  status: string;
  target: number;
  fake: number;
  color: string;
  text: string;
  dispatch: Dispatch<any>;
  tryCnt: number;
  level: string;
}

const Button: FunctionComponent<Props> = ({ status, target, fake, color, text, tryCnt, dispatch, level }) => {
  const timeout = useRef<number | null>(null);

  return (
    <div>
      {
        {
          ready: (
            <button
              onClick={() => {
                dispatch({ type: SET_STATUS, status: "playing" });

                let target = -1,
                  fake = -1,
                  text = "",
                  color = "";
                if (level === "easy") {
                  target = Math.floor(Math.random() * 4);
                } else if (level === "medium") {
                  target = Math.floor(Math.random() * 9);
                } else {
                  target = Math.floor(Math.random() * 9);
                  while (fake === -1 || fake === target) {
                    fake = Math.floor(Math.random() * 9);
                    text = colors[Math.floor(Math.random() * colors.length)];
                    color = colors[Math.floor(Math.random() * colors.length)];
                  }
                }
                dispatch({ type: SET_TABLE, target: target, fake: fake, text: text, color: color, tryCnt: { easy: 4, medium: 6, hard: 9 }[level!] });

                // timeout.current = window.setTimeout(() => {

                // }, Math.floor(Math.random() * 1000) + 1000);
              }}
              type="button"
              className={`block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out`}
            >
              start game
            </button>
          ),
          playing: (
            <button
              onClick={() => {
                dispatch({ type: SET_STATUS, status: "ready" });
              }}
              type="button"
              className={`block px-6 py-2.5 bg-orange-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-orange-700 hover:shadow-lg focus:bg-orange-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-orange-800 active:shadow-lg transition duration-150 ease-in-out`}
            >
              stop
            </button>
          ),
          fail: (
            <button
              onClick={() => {
                dispatch({ type: SET_STATUS, status: "ready" });
              }}
              type="button"
              className={`block px-6 py-2.5 bg-orange-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-orange-700 hover:shadow-lg focus:bg-orange-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-orange-800 active:shadow-lg transition duration-150 ease-in-out`}
            >
              try again
            </button>
          ),
          success: (
            <button
              onClick={() => {
                dispatch({ type: SET_STATUS, status: "ready" });
              }}
              type="button"
              className={`block px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out`}
            >
              reset
            </button>
          ),
        }[status]
      }
    </div>
  );
};

export default Button;
