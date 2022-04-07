const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const { auth } = require("../middleware/auth");

//=================================
//             User
//=================================

// 미들웨어 - 콜백 함수 실행 전에 auth 실행
router.get("/auth", auth, (req, res) => {
  // authentication이 true면 여기 내용 실행
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,
    image: req.user.image,
  });
});

router.post("/register", (req, res) => {
  // 회원 가입 할 때 필요한 정보를 client에서 가져오면 db에 넣음

  // bodyParser 덕분에 req.body 안에 json형식으로 데이터가 저장됨
  const user = new User(req.body);

  // mongoDB method - 정보들이 user 모델에 저장됨
  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

router.post("/login", (req, res) => {
  // 요청된 이메일을 데이터베이스에 있는지 찾는다.
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: "입력한 이메일을 가진 유저가 없습니다.",
      });

    // 요청된 이메일이 db에 있다면 비밀번호가 맞는지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) return res.json({ loginSuccess: false, message: "Wrong password!" });

      // 비밀번호가 맞다면 토큰 생성
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        // 토큰을 쿠키에 저장.
        // 토큰은 쿠키, local storage, session 등에 저장해서 사용 가능
        res.cookie("w_authExp", user.tokenExp);
        res.cookie("w_auth", user.token).status(200).json({
          loginSuccess: true,
          userId: user._id,
        });
      });
    });
  });
});

// 로그아웃 - 데이터베이스의 token을 지워서 인증이 안되게 만든다.
router.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true,
    });
  });
});

// 유저 점수 추가
router.post("/addScore", auth, (req, res) => {
  // 먼저  User Collection에 해당 유저의 정보를 가져오기
  // auth 미들웨어 통해서 req.user에 유저 정보가 들어있음
  User.findOne({ _id: req.user._id }, (err, userInfo) => {
    // 점수 추가
    User.findOneAndUpdate(
      { _id: req.user._id },
      {
        $push: {
          cart: {
            level: req.body.level,
            score: req.body.score,
            date: Date.now(),
          },
        },
      },
      { new: true },
      (err, userInfo) => {
        if (err) return res.status(400).json({ success: false, err });
        res.status(200).send(userInfo.scores);
      }
    );
  });
});

module.exports = router;
