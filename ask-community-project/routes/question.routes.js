const express = require("express");
const router = express.Router();
const fs = require("fs");

router.get("/", (req, res) => {
  const question = JSON.parse(fs.readFileSync("./questions.json"));
  if (question) {
    res.status(200).json(question);
  } else {
    res.status(404).json({ message: "No question found" });
  }
});

// api get question theo id
router.get("/:id", function (req, res) {
  let { id } = req.params;
  const question = JSON.parse(fs.readFileSync("./questions.json"));
  const find = question.find((question) => question.id == id);
  if (find) {
    res.status(200).json(find);
  } else {
    res.status(404).json({ message: "No question found" });
  }
});

//api thêm 1 thông tin question theo id
router.post("/", function (req, res) {
  const { id } = req.params;
  const { content } = req.body;
  if (!content) {
    res.status(404).json({
      message: "Thông tin không được để trống, ko hợp lệ !",
    });
  } else {
    let newQuestion = {
      id: Math.floor(Math.random(id) * 1000000000),
      content: content,
      like: 0,
      dislike: 0,
    };
    try {
      const data = JSON.parse(fs.readFileSync("./questions.json"));
      data.push(newQuestion);
      fs.writeFileSync("./questions.json", JSON.stringify(data));
      res.status(200).json({
        message: "Thêm sản thông tin question thành công!!!",
      });
    } catch (err) {
      res.status(404).json({
        message: "Thêm sản thông tin question không thành công !!!",
      });
    }
  }
});

//api sửa 1 thông tin question theo id
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { content, like, dislike } = req.body;
  // validate
  if (!content || !like || !dislike) {
    res.status(404).json({
      message: "Thông tin không được để trống, ko hợp lệ!",
    });
  } else {
    try {
      const question = JSON.parse(fs.readFileSync("./questions.json"));
      const questionsIndex = question.findIndex(
        (question) => question.id === parseInt(id)
      );
      if (questionsIndex === -1) {
        res.json({
          message: "Không tìm thấy dữ liệu",
        });
      } else {
        let newQuestions = {
          id: +id,
          content: content,
          like: Number(like),
          dislike: Number(dislike),
        };
        const updateQuestions = [
          ...question.slice(0, questionsIndex),
          newQuestions,
          ...question.slice(questionsIndex + 1),
        ];
        fs.writeFileSync("./questions.json", JSON.stringify(updateQuestions));
        res.status(200).json({
          message: "Sửa sản thông tin question thành công!!!",
        });
      }
    } catch (error) {
      res.status(404).json({
        message: "Sửa không thành công",
        question: newQuestions,
      });
    }
  }
});

// api xóa 1 thông tin question theo id
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const questions = JSON.parse(fs.readFileSync("./questions.json"));
  const newQuestions = questions.filter((ques) => ques.id !== +id);
  try {
    fs.writeFileSync("./questions.json", JSON.stringify(newQuestions));
    res.status(200).json({
      message: "Xóa sản thông tin question thành công!!!",
    });
  } catch (error) {
    res.status(404).json({
      message: "Xóa không thành công",
    });
  }
});

module.exports = router;
