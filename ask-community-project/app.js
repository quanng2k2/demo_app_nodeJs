const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");
var bodyParser = require("body-parser");
const questionsRouter = require("./routes/question.routes");

app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); // khi để true thì mình sử dụng đc những phươ
// parse application/json
app.use(bodyParser.json());

// api get question theo id
app.use("/api/v1/questions", questionsRouter);

// // middleware
// function checkExist(req, res, next) {
//   const { id, content } = req.body;
//   const checkexist = JSON.parse(fs.readFileSync("./questions.json"));
//   // tìm kiếm questions với id và content
//   let find = checkexist.find((e, i) => e.content === content);
//   if (find) {
//     res.status(400).send({
//       message: "Content đã tồn tại !!!",
//     });
//   } else {
//     next();
//   }
// }

// Bài 05
// Trả về file index.html khi truy cập vào '/'
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/html/index.html");
});

// Trả về file ask.html khi truy cập vào "/ask"
app.get("/ask", (req, res) => {
  res.sendFile(__dirname + "/public/html/ask.html");
});

// Trả về file question-detail.html khi truy cập vào "/question-detail/:id "
app.get("/question-detail/:id", (req, res) => {
  res.sendFile(__dirname + "/public/html/question-detail.html");
});

// trả về lỗi nếu sai url
app.get("*", (req, res) => {
  res.send("<h1>NOT FOUND.....</h1>");
});

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
