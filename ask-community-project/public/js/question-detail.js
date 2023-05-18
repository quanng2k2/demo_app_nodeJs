// Lấy id từ window.location.href dùng split để tách chuỗi dựa trên gạch chéo
// pop để lấy phần tử cuối mảng
const id = window.location.href
  .split("http://localhost:3000/question-detail/")
  .pop();
console.log(id);
// Lấy phần tử div.question-content từ DOM
const questionContentDiv = document.querySelector(".question-content");
// Lấy giá trị số vote
const voteNumber = document.getElementById("vote-number");
// lấy giá trị like
const likePercentage = document.querySelector(".like");
// lấy giá trị dislike
const dislikePercentage = document.querySelector(".dislike");
// Gửi yêu cầu GET đến endpoint "/api/v1/questions/:id"
fetch(`/api/v1/questions/${id}`)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Có lỗi xảy ra");
    }
  })
  .then((data) => {
    // Xử lý dữ liệu trả về
    console.log(data);
    const question = data; // Lưu ý: data là đối tượng câu hỏi

    const likeValue = data.like;
    const dislikeValue = data.dislike;
    const totalLikeValue = likeValue + dislikeValue;
    ``;
    // Tính phần trăm like và dislike
    const likePercentageValue = ((likeValue / totalLikeValue) * 100).toFixed(2);
    console.log(likePercentageValue);

    const dislikePercentageValue = (
      (dislikeValue / totalLikeValue) *
      100
    ).toFixed(2);
    console.log(dislikePercentageValue);

    // Gán nội dung câu hỏi vào phần tử div

    voteNumber.innerHTML = totalLikeValue;

    questionContentDiv.innerHTML = question.content;

    likePercentage.innerHTML = `${likePercentageValue}%`;
    likePercentage.style.width = `${likePercentageValue}%`;

    dislikePercentage.innerHTML = `${dislikePercentageValue}%`;
    dislikePercentage.style.width = `${dislikePercentageValue}%`;

    // Gọi ra button theo id
    const btn = document.getElementById("btn");

    // Gắn sự kiện onclick cho button
    btn.onclick = function () {
      // Điều hướng người dùng về trang chủ
      window.location.href = "/";
    };
  })
  .catch((error) => {
    // Xử lý lỗi
    (error) => {
      console.error("Lỗi khi lấy về:", error);
    };
  });
