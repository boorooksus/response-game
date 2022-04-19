import * as React from "react";
import { useState, useRef, useEffect, Dispatch, FunctionComponent, useContext } from "react";
import { GameContext } from "../GamePage";
import { SET_STATUS, SET_TABLE } from "../types";
import { colors } from "./colors";

const buttonInfos = [
  { color: "blue", text: " start game" },
  { color: "gray", text: "restart" },
];

interface Props {
  level: string;
}

const Button: FunctionComponent<Props> = ({ level }) => {
  const { status, target, fake, color, text, tryCnt, dispatch } = useContext(GameContext);

  const timeout = useRef<number | null>(null);

  return (
    <div>
      {
        {
          ready: (
            <button
              onClick={() => {
                dispatch({ type: SET_STATUS, status: "playing" });

                dispatch({ type: SET_TABLE, target: -1, fake: -1, text: "", color: "", tryCnt: { easy: 4, medium: 6, hard: 9 }[level!]! });

                timeout.current = window.setTimeout(() => {
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
                    }

                    const color_keys = Object.keys(colors);
                    const color_values = Object.values(colors);

                    text = color_keys[Math.floor(Math.random() * color_keys.length)];
                    while (color === "" || color === colors[text]) {
                      color = color_values[Math.floor(Math.random() * color_values.length)];
                    }
                  }
                  dispatch({ type: SET_TABLE, target: target, fake: fake, text: text, color: color, tryCnt: { easy: 4, medium: 6, hard: 9 }[level!]! });
                }, 2000);
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
