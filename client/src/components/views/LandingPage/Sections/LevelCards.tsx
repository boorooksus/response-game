import * as React from "react";

type LevelInfoType = {
  level: string;
  url: string;
  color: string;
};

const levelInfos: LevelInfoType[] = [
  { level: "Easy", url: "/game/easy", color: "bg-sky-100" },
  { level: "Medium", url: "/game/medium", color: "bg-green-100" },
  { level: "Hard", url: "/game/hard", color: "bg-red-100" },
];

type CardProps = {
  levelInfo: LevelInfoType;
};

const Card = (props: CardProps): JSX.Element => {
  return (
    <>
      <a href={`/game/${props.levelInfo.level}`} className="m-5" data-mdb-ripple="true" data-mdb-ripple-color="light">
        <div className={"aspect-square flex justify-center rounded-xl shadow-lg " + props.levelInfo.color + "  max-w-md"}>
          <h3 className="text-gray-600 text-5xl text-center mb-2 justify-center mt-10">{props.levelInfo.level}</h3>
        </div>
      </a>
    </>
  );
};

const LevelCards = () => {
  return (
    <div className="p-3 bg-gray-100 text-gray-700">
      <h2 className=" text-center text-3xl ">Start Game</h2>
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
