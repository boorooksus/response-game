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

module.exports = router;
