import * as React from "react";
import { useState } from "react";

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
};

const Button = (props: ButtonProps) => {
  return (
    <div>
      {props.status === "ready" ? (
        <button
          onClick={() => {
            props.setStatus("playing");
            props.timeout.current = window.setTimeout(() => {
              props.startTime.current = new Date().getTime();
              props.setTarget(Math.floor(Math.random() * 4));
            }, Math.floor(Math.random() * 1000) + 1000);
          }}
          type="button"
          className={`block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out`}
        >
          start game
        </button>
      ) : (
        <button
          onClick={() => {
            props.setStatus("ready");
            props.setTryCnt(4);
            props.setResult([]);
            props.setTarget(-1);
          }}
          type="button"
          className={`block px-6 py-2.5 bg-orange-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-orange-700 hover:shadow-lg focus:bg-orange-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-orange-800 active:shadow-lg transition duration-150 ease-in-out`}
        >
          try again
        </button>
      )}
    </div>
  );
};

export default Button;
