import * as React from "react";

type MediumModeProps = {
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
};

const MediumMode = (props: MediumModeProps) => {
  const tiles = Array.from({ length: 9 }, (v, i) => i);

  function onClickTile(idx: number) {
    if (props.status === "playing") {
      if (props.target === idx) {
        let nextTarget = -1;
        while (nextTarget === -1 || nextTarget === props.target) {
          nextTarget = Math.floor(Math.random() * 4);
        }
        props.setTarget(nextTarget);
        props.setTryCnt(props.tryCnt - 1);

        props.endTime.current = new Date().getTime();
        props.setResult((prevResult) => {
          return [...prevResult, props.endTime.current - props.startTime.current];
        });

        if (props.tryCnt === 0) {
          props.setStatus("success");
          console.log(`avg result: ${props.result.reduce((a, c) => a + c) / props.result.length}ms`);
        }
      } else {
        console.log("fail");
        clearTimeout(props.timeout.current!);

        props.setStatus("fail");
      }
    }
  }

  return (
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
                  props.target === tile ? (
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
              }[props.status]
            }
          </div>
        );
      })}
    </div>
  );
};

export default MediumMode;
