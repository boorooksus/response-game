const express = require("express");
const router = express.Router();
const { Score } = require("../models/Score");

//=================================
//             Ranking
//=================================

// scores collection에 들어 있는 모든 상품 정보를 가져오기
router.post("/", (req, res) => {
  // limit 존재한다면 req.body.limit으로, 없다면 20으로
  let limit = req.body.limit ? parseInt(req.body.limit) : 20;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;
  let level = req.body.level;

  Product.find({ level: level })
    .populate("writer")
    .sort({ score: 1 })
    .skip(skip)
    .limit(limit)
    .exec((err, scoreInfo) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({
        success: true,
        scoreInfo,
        postSize: scoreInfo.length,
      });
    });
});

module.exports = router;
