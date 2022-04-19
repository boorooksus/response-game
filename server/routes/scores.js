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
      rankers.push(rankerInfo[0]);

      Score.find({ level: "medium" })
        .populate("writer")
        .sort({ score: 1 })
        .limit(1)
        .exec((err, rankerInfo) => {
          if (err) return res.status(400).json({ success: false, err });
          rankers.push(rankerInfo[0]);

          Score.find({ level: "hard" })
            .populate("writer")
            .sort({ score: 1 })
            .limit(1)
            .exec((err, rankerInfo) => {
              if (err) return res.status(400).json({ success: false, err });
              rankers.push(rankerInfo[0]);

              return res.status(200).json({
                success: true,
                rankers,
              });
            });
        });
    });
});

router.post("/ranking", (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 20;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;
  let postSize = 0;

  ranking = {};
  Score.find({ level: "easy" })
    .populate("writer")
    .sort({ score: 1 })
    .skip(skip)
    .limit(limit)
    .exec((err, rankerInfo1) => {
      if (err) return res.status(400).json({ success: false, err });
      // else ranking.push(rankerInfo1);
      ranking.easy = rankerInfo1;
      postSize = Math.max(rankerInfo1.length, postSize);

      Score.find({ level: "medium" })
        .populate("writer")
        .sort({ score: 1 })
        .skip(skip)
        .limit(limit)
        .exec((err, rankerInfo2) => {
          if (err) return res.status(400).json({ success: false, err });
          // else ranking.push(rankerInfo2);
          ranking.medium = rankerInfo2;
          postSize = Math.max(rankerInfo2.length, postSize);

          Score.find({ level: "hard" })
            .populate("writer")
            .sort({ score: 1 })
            .skip(skip)
            .limit(limit)
            .exec((err, rankerInfo3) => {
              if (err) return res.status(400).json({ success: false, err });
              // else ranking.push(rankerInfo3);
              ranking.hard = rankerInfo3;
              postSize = Math.max(rankerInfo3.length, postSize);

              return res.status(200).json({
                success: true,
                ranking: ranking,
                postSize: postSize,
              });
            });
        });
    });
});

module.exports = router;
