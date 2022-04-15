import * as React from "react";
import { Dispatch, FunctionComponent } from "react";
import { SET_STATUS, SET_TABLE } from "../GamePage";

interface Props {
  status: string;
  target: number;
  tryCnt: number;
  fake: number;
  color: string;
  text: string;
  dispatch: Dispatch<any>;
}

const HardMode: FunctionComponent<Props> = ({ status, target, tryCnt, fake, color, text, dispatch }) => {
  const tiles = Array.from({ length: 9 }, (v, i) => i);
  const colors = ["red", "green", "blue", "yellow", "purple", "pink"];

  function onClickTile(idx: number) {
    if (status === "playing") {
      if (target === idx) {
        let nextTarget = -1,
          nextFake = -1,
          nextColor = "",
          nextText = "";
        while (nextTarget === -1 || nextTarget === target) {
          nextTarget = Math.floor(Math.random() * 9);
        }

        while (nextFake === -1 || nextFake === nextTarget) {
          nextFake = Math.floor(Math.random() * 9);
        }

        nextColor = colors[Math.floor(Math.random() * colors.length)];

        while (true) {
          nextText = colors[Math.floor(Math.random() * colors.length)];
          if (nextText !== nextColor) {
            break;
          }
        }

        dispatch({ type: SET_TABLE, target: nextTarget, fake: nextFake, text: nextText, color: nextColor, tryCnt: tryCnt - 1 });

        if (tryCnt === 0) {
          dispatch({ type: SET_STATUS, status: "success" });
          dispatch({ type: SET_TABLE, target: -1, fake: -1, text: "", color: "", tryCnt: 0 });
        }
      } else {
        dispatch({ type: SET_STATUS, status: "fail" });
      }
    }
  }

  return (
    <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm text-center">
      {text && color ? (
        <h3 className="text-5xl m-2" style={{ color }}>
          {text.toUpperCase()}
        </h3>
      ) : (
        <h3 className="text-5xl m-2 text-white">-</h3>
      )}
      <div className="grid grid-cols-3 gap-x-0 max-w-md">
        {tiles.map((tile) => {
          return (
            <div key={tile}>
              {
                {
                  ready: <div className="aspect-square flex justify-center max-w-md bg-gray-200 border-solid border-2"></div>,
                  playing:
                    target === tile ? (
                      <div
                        className="aspect-square flex justify-center max-w-md  border-solid border-2 border-white"
                        style={{ background: text }}
                        id={String(tile)}
                        onClick={(e) => {
                          onClickTile(parseInt(e.currentTarget.id));
                        }}
                      ></div>
                    ) : fake === tile ? (
                      <div
                        className="aspect-square flex justify-center max-w-md border-solid border-2 border-white"
                        id={String(tile)}
                        onClick={(e) => {
                          onClickTile(parseInt(e.currentTarget.id));
                        }}
                        style={{ background: color }}
                      ></div>
                    ) : (
                      <div
                        className="aspect-square flex justify-center max-w-md bg-gray-300 border-solid border-2 border-white"
                        id={String(tile)}
                        onClick={(e) => {
                          onClickTile(parseInt(e.currentTarget.id));
                        }}
                      ></div>
                    ),
                  success: <div className="aspect-square flex justify-center max-w-md bg-gray-200 border-solid border-2 "></div>,
                  fail: <div className="aspect-square flex justify-center max-w-md bg-gray-200 border-solid border-2"></div>,
                }[status]
              }
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HardMode;
