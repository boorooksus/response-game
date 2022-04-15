const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema(
  {
    // score 등록한 사람
    writer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    level: {
      type: String,
    },
    score: {
      type: Number,
    },
    // timestamps: true면 자동으로 등록시간 업데이트
  },
  { timestamps: true }
);

// 검색어가 위 옵션 중 어디에 중점적으로 검색할지 설정. 몽고db 공홈 참조
// productSchema.index(
//   {
//     title: "text",
//     description: "text",
//   },
//   {
//     weights: {
//       // title의 중요도 5, desc 중요도 1
//       title: 5,
//       description: 1,
//     },
//   }
// );

const Score = mongoose.model("Score", productSchema);

module.exports = { Score };
