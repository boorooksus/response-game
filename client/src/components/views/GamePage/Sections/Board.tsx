import * as React from "react";
import { useState, useEffect, useContext, FC, PropsWithChildren } from "react";
import Button from "./Button";
import axios from "axios";
import { GameContext } from "../GamePage";

interface Props {
  level: string;
  result: number;
}

const Board: FC<PropsWithChildren<Props>> = ({ level, result }) => {
  const { status, tryCnt } = useContext(GameContext);
  const [name, setName] = useState("");
  const [isRegisterd, setIsRegistered] = useState(false);

  useEffect(() => {
    if (status === "playing") {
      setIsRegistered(false);
    }
  }, [status]);

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let dataToSubmit = {
      level: level,
      name: name,
      score: result,
    };

    const request = axios.post("/api/scores/registerScore", dataToSubmit).then((response) => {
      if (response.data.success) {
        setIsRegistered(true);
      }
      return response.data;
    });
  };

  const onNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setName(event.currentTarget.value);
  };

  return (
    <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm ">
      {/* 게임 설명 */}
      <p className="text-gray-700 text-xl mb-5">
        {
          {
            easy: "색깔이 있는 타일을 클릭하세요",
            medium: "색깔이 있는 타일을 클릭하세요",
            hard: "제시된 색상의 타일을 클릭하세요",
          }[level!]
        }
      </p>
      {/* Start/Stop/Reset Button */}
      <Button level={level!} />
      {/* Show Game Information */}
      {
        {
          ready: <div></div>,
          playing: (
            <div>
              <h5 className="text-gray-500 text-2xl mb-2">count: {tryCnt + 1}</h5>
            </div>
          ),
          success: (
            <div>
              <h5 className="text-green-500 text-3xl mb-2">SUCCESS!</h5>
              <h5 className="text-gray-700 text-2xl mb-2">Time: </h5>
              <h5 className="text-gray-700 text-3xl mb-2">{result} ms</h5>
              <div>
                {isRegisterd ? (
                  <div>
                    <h5 className="text-gray-700 text-xl mb-2 ">기록이 등록되었습니다.</h5>
                  </div>
                ) : (
                  <div>
                    <h5 className="text-gray-700 text-xl mb-2 ">기록 남기기</h5>
                    <form onSubmit={onSubmitHandler}>
                      <div className="md:flex md:items-center mb-6">
                        <label className=" text-gray-500 md:text-left mb-1 md:mb-0 pr-4" htmlFor="name">
                          Name
                        </label>

                        <input
                          className="bg-gray-200  border-2 border-gray-200 rounded w-full py-2 mr-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                          id="name"
                          type="text"
                          value={name}
                          onChange={onNameHandler}
                        />
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                          type="submit"
                        >
                          Register
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          ),
          fail: (
            <div>
              <h5 className="text-red-500 text-3xl mb-2">FAIL</h5>
              <h5 className="text-gray-500 text-2xl mb-2">Wrong click</h5>
              <br></br>
            </div>
          ),
        }[status]
      }
    </div>
  );
};

export default Board;
