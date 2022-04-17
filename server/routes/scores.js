const express = require("express");
const router = express.Router();
const { Score } = require("../models/Score");

//=================================
//             Scores
//=================================

// 이름과 점수 등록
router.post("/registerScore", (req, res) => {
  // bodyParser 덕분에 req.body 안에 json형식으로 데이터가 저장됨
  const score = new Score(req.body);

  console.log("saving score...");

  // mongoDB method - 정보들이 Score 모델에 저장됨
  score.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

// Hall of Fame 데이터 가져오기
router.get("/rankers", (req, res) => {
  rankers = [];
  Score.find({ level: "easy" })
    .populate("writer")
    .sort({ score: 1 })
    .limit(1)
    .exec((err, rankerInfo) => {
      if (err) return res.status(400).json({ success: false, err });
      rankers.push(rankerInfo);

      Score.find({ level: "medium" })
        .populate("writer")
        .sort({ score: 1 })
        .limit(1)
        .exec((err, rankerInfo) => {
          if (err) return res.status(400).json({ success: false, err });
          rankers.push(rankerInfo);

          Score.find({ level: "hard" })
            .populate("writer")
            .sort({ score: 1 })
            .limit(1)
            .exec((err, rankerInfo) => {
              if (err) return res.status(400).json({ success: false, err });
              rankers.push(rankerInfo);

              return res.status(200).json({
                success: true,
                rankers,
              });
            });
        });
    });
});

module.exports = router;
