import * as React from "react";
import { useState } from "react";

type HardModeProps = {
  status: string;
  target: number;
  setTarget: React.Dispatch<React.SetStateAction<number>>;
  setTryCnt: React.Dispatch<React.SetStateAction<number>>;
  tryCnt: number;
  endTime: React.MutableRefObject<number>;
  startTime: React.MutableRefObject<number>;
  setResult: React.Dispatch<React.SetStateAction<number[]>>;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  result: number[];
  timeout: React.MutableRefObject<number | null>;
  Color: number;
  setColor: React.Dispatch<React.SetStateAction<number>>;
  Text: number;
  setText: React.Dispatch<React.SetStateAction<number>>;
  Fake: number;
  setFake: React.Dispatch<React.SetStateAction<number>>;
};

const HardMode = (props: HardModeProps) => {
  const tiles = Array.from({ length: 9 }, (v, i) => i);
  const colors = ["red", "green", "blue", "yellow", "purple", "pink"];

  function onClickTile(idx: number) {
    if (props.status === "playing") {
      if (props.target === idx) {
        let nextTarget = -1;
        let nextFake = -1;
        let nextColor = Math.floor(Math.random() * colors.length);
        let nextText = -1;
        while (nextTarget === -1 || nextTarget === props.target) {
          nextTarget = Math.floor(Math.random() * 9);
        }

        while (nextFake === -1 || nextFake === nextTarget) {
          nextFake = Math.floor(Math.random() * 9);
        }

        while (true) {
          nextText = Math.floor(Math.random() * colors.length);
          if (nextText !== nextColor) {
            break;
          }
        }

        props.setTarget(nextTarget);
        props.setFake(nextFake);
        props.setColor(nextColor);
        props.setText(nextText);
        props.setTryCnt(props.tryCnt - 1);

        props.endTime.current = new Date().getTime();
        props.setResult((prevResult) => {
          return [...prevResult, props.endTime.current - props.startTime.current];
        });

        if (props.tryCnt === 0) {
          props.setStatus("success");
          props.setText(-1);
          props.setColor(-1);
        }
      } else {
        clearTimeout(props.timeout.current!);
        props.setStatus("fail");
        props.setText(-1);
        props.setColor(-1);
        props.setTryCnt(9);
      }
    }
  }

  return (
    <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm text-center">
      {props.Text > -1 && props.Color > -1 ? (
        <h3 className="text-5xl m-2" style={{ color: colors[props.Color] }}>
          {colors[props.Text].toUpperCase()}
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
                    props.target === tile ? (
                      <div
                        className="aspect-square flex justify-center max-w-md  border-solid border-2 border-white"
                        style={{ background: colors[props.Text] }}
                        id={String(tile)}
                        onClick={(e) => {
                          onClickTile(parseInt(e.currentTarget.id));
                        }}
                      ></div>
                    ) : props.Fake === tile ? (
                      <div
                        className="aspect-square flex justify-center max-w-md border-solid border-2 border-white"
                        id={String(tile)}
                        onClick={(e) => {
                          onClickTile(parseInt(e.currentTarget.id));
                        }}
                        style={{ background: colors[props.Color] }}
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
                }[props.status]
              }
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HardMode;
