import * as React from "react";
import { useState, useEffect } from "react";

const buttonInfos = [
  { color: "blue", text: " start game" },
  { color: "gray", text: "restart" },
];

type ButtonProps = {
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  setTarget: React.Dispatch<React.SetStateAction<number>>;
  setTryCnt: React.Dispatch<React.SetStateAction<number>>;
  timeout: React.MutableRefObject<number | null>;
  startTime: React.MutableRefObject<number>;
  setResult: React.Dispatch<React.SetStateAction<number[]>>;
  level: string;
  Color: number;
  setColor: React.Dispatch<React.SetStateAction<number>>;
  Text: number;
  setText: React.Dispatch<React.SetStateAction<number>>;
  Fake: number;
  setFake: React.Dispatch<React.SetStateAction<number>>;
};

const Button = (props: ButtonProps) => {
  return (
    <div>
      {
        {
          ready: (
            <button
              onClick={() => {
                props.setTryCnt(
                  {
                    Easy: 4,
                    Medium: 6,
                    Hard: 9,
                  }[props.level!]!
                );
                props.setTarget(-1);
                props.setFake(-1);
                props.setColor(-1);
                props.setText(-1);
                props.setStatus("playing");
                props.timeout.current = window.setTimeout(() => {
                  props.startTime.current = new Date().getTime();
                  if (props.level === "Easy") {
                    props.setTarget(Math.floor(Math.random() * 4));
                  } else if (props.level === "Medium") {
                    props.setTarget(Math.floor(Math.random() * 9));
                  } else {
                    let nextTarget = Math.floor(Math.random() * 9);
                    props.setTarget(nextTarget);
                    let nextFake = -1;
                    let nextText = -1;
                    while (nextFake === -1 || nextFake === nextTarget) {
                      nextFake = Math.floor(Math.random() * 9);
                    }
                    props.setFake(nextFake);
                    let nextColor = Math.floor(Math.random() * 3);
                    props.setColor(nextColor);
                    props.setText(nextColor + 1);
                  }
                }, Math.floor(Math.random() * 1000) + 1000);
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
                props.setResult([]);
                props.setTarget(-1);
                props.setStatus("ready");
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
                props.setResult([]);
                props.setTarget(-1);
                props.setStatus("ready");
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
                props.setResult([]);
                props.setTarget(-1);
                props.setStatus("ready");
              }}
              type="button"
              className={`block px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out`}
            >
              reset
            </button>
          ),
        }[props.status]
      }
    </div>
  );
};

export default Button;
