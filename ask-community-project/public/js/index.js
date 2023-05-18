fetch("http://localhost:3000/api/v1/questions")
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Có lỗi xảy ra");
    }
  })
  .then((data) => {
    if (Array.isArray(data) && data.length > 0) {
      const randomObject = data[Math.floor(Math.random() * data.length)];
      const divContent = document.querySelector(".question-content");
      divContent.innerHTML = randomObject.content;

      const likeButton = document.getElementById("like");
      const dislikeButton = document.getElementById("dislike");

      likeButton.onclick = function () {
        let questionId = randomObject.id;
        console.log(questionId);
        let likeCount = randomObject.like + 1;
        console.log(likeCount);

        fetch(`http://localhost:3000/api/v1/questions/${questionId}`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json; charset=UTF-8", // Indicates the content
          },
          body: JSON.stringify({
            like: likeCount,
            content: randomObject.content,
            dislike: randomObject.dislike,
          }),
        })
          .then((response) => {
            console.log("response", response);
            if (response.ok) {
              randomObject.like = likeCount;
              window.location.href = `http://localhost:3000/question-detail/${questionId}`;
              console.log("Cập nhật thành công");
            } else {
              throw new Error("Có lỗi xảy ra");
            }
          })
          .catch((error) => {
            console.error("Lỗi khi cập nhật:", error);
          });
      };

      dislikeButton.onclick = function () {
        let questionId = randomObject.id;
        console.log(questionId);
        let dislikeCount = randomObject.dislike + 1;
        console.log(dislikeCount);

        fetch(`http://localhost:3000/api/v1/questions/${questionId}`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json; charset=UTF-8", // Indicates the content
          },
          body: JSON.stringify({
            like: randomObject.like,
            content: randomObject.content,
            dislike: dislikeCount,
          }),
        })
          .then((response) => {
            console.log("response", response);
            if (response.ok) {
              randomObject.dislike = dislikeCount;
              window.location.href = `http://localhost:3000/question-detail/${questionId}`;
              console.log("Cập nhật thành công");
            } else {
              throw new Error("Có lỗi xảy ra");
            }
          })
          .catch((error) => {
            console.error("Lỗi khi cập nhật:", error);
          });
      };
    } else {
      console.log("Không có đối tượng nào trong dữ liệu");
    }
  })
  .catch((error) => {
    console.error(error);
  });
