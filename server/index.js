const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const config = require("./config/key");

const mongoose = require("mongoose");
// 보안을 위해 mongoDB URI를 config 폴더의 key파일에서 가져옴
const connect = mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.use(cors());

// application/x-www-form-urlencoded 데이터를 분석해서 가져올 수 있게함
//to not get any deprecation warning or error
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
// application/jason 을 분석해서 가져올 수 있게함
//to get json data
// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(cookieParser());

// 라우팅
app.use("/api/users", require("./routes/users"));
app.use("/api/scores", require("./routes/scores"));

// static 이미지 파일을 위한 코드.
// 이미지 기능 추가가 필요한 경우 수정
// //use this to show the image you have in node js server to client (react js)
// //https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
// app.use("/uploads", express.static("uploads"));

// // Serve static assets if in production
// if (process.env.NODE_ENV === "production") {
//   // Set static folder
//   // All the javascript and css files will be read and served from this folder
//   app.use(express.static("client/build"));

//   // index.html for all page routes    html or routing and naviagtion
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
//   });
// }

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Listening on Port ${port}`);
});
