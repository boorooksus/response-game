import * as React from "react";
import { Dispatch, FunctionComponent } from "react";
import { SET_STATUS, SET_TABLE } from "../GamePage";

interface Props {
  status: string;
  target: number;
  tryCnt: number;
  dispatch: Dispatch<any>;
}

const MediumMode: FunctionComponent<Props> = ({ status, target, tryCnt, dispatch }) => {
  const tiles = Array.from({ length: 9 }, (v, i) => i);

  function onClickTile(idx: number) {
    console.log("tryCnt: ", tryCnt);

    if (status === "playing") {
      if (target === idx) {
        let nextTarget = -1;
        while (nextTarget === -1 || nextTarget === target) {
          nextTarget = Math.floor(Math.random() * 9);
        }

        dispatch({ type: SET_TABLE, target: nextTarget, tryCnt: tryCnt - 1 });

        if (tryCnt === 0) {
          dispatch({ type: SET_STATUS, status: "success" });
        }
      } else {
        dispatch({ type: SET_STATUS, status: "fail" });
      }
    }
  }

  return (
    <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
      <div className="grid grid-cols-3 gap-x-0 max-w-md">
        {tiles.map((tile) => {
          return (
            <div key={tile}>
              {
                {
                  ready: (
                    <div
                      className="aspect-square flex justify-center max-w-md bg-gray-200 border-solid border-2"
                      id={String(tile)}
                      onClick={(e) => {
                        onClickTile(parseInt(e.currentTarget.id));
                      }}
                    ></div>
                  ),
                  playing:
                    target === tile ? (
                      <div
                        className="aspect-square flex justify-center max-w-md bg-red-300 border-solid border-2 border-white"
                        id={String(tile)}
                        onClick={(e) => {
                          onClickTile(parseInt(e.currentTarget.id));
                        }}
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
                  success: (
                    <div
                      className="aspect-square flex justify-center max-w-md bg-gray-200 border-solid border-2 "
                      id={String(tile)}
                      onClick={(e) => {
                        onClickTile(parseInt(e.currentTarget.id));
                      }}
                    ></div>
                  ),
                  fail: (
                    <div
                      className="aspect-square flex justify-center max-w-md bg-gray-200 border-solid border-2"
                      id={String(tile)}
                      onClick={(e) => {
                        onClickTile(parseInt(e.currentTarget.id));
                      }}
                    ></div>
                  ),
                }[status]
              }
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MediumMode;
