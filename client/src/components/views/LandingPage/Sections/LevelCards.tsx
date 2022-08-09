import * as React from "react";
import easy_img from "./imgs/easy_img.png";
import medium_img from "./imgs/medium_img.png";
import hard_img from "./imgs/hard_img.png";

type LevelInfoType = {
  level: string;
  color: string;
  image: string;
};

const levelInfos: LevelInfoType[] = [
  { level: "easy", color: "hover:bg-sky-100", image: easy_img },
  { level: "medium", color: "hover:bg-green-100", image: medium_img },
  { level: "hard", color: "hover:bg-red-100", image: hard_img },
];

type CardProps = {
  levelInfo: LevelInfoType;
};

// 난이도 카드
const Card = (props: CardProps): JSX.Element => {
  return (
    <>
      <a href={`/game/${props.levelInfo.level}`} className="m-5">
        <div
          className={
            "aspect-square  justify-center rounded-xl shadow-lg bg-white " + props.levelInfo.color + "  max-w-md "
          }
        >
          <img className="rounded-t-lg" src={props.levelInfo.image} alt={props.levelInfo.level} />
          <div className="p-3">
            <h3 className="text-gray-600 text-5xl text-center mb-10 justify-center mt-2">{props.levelInfo.level}</h3>
          </div>
        </div>
      </a>
    </>
  );
};

const LevelCards = () => {
  return (
    <div className="p-3 bg-gray-100 text-gray-700">
      <h2 className=" text-center text-3xl ">Start Game</h2>
      {/* 난이도 선택 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {levelInfos.map((item, i) => (
          <div key={i}>
            <Card levelInfo={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LevelCards;
