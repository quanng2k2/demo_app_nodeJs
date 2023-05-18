// Lấy các phần tử DOM
const textarea = document.querySelector(".question-content");
const letterCount = document.getElementById("letter");
console.log(letterCount);
const form = document.querySelector(".main-form");

// Gắn sự kiện "on input" cho textarea
textarea.addEventListener("input", function () {
  const wordCount = textarea.value.trim().length; // Đếm số từ
  const remainingCount = 200 - wordCount; // Tính số từ còn lại
  letterCount.innerHTML = remainingCount; // Hiển thị số từ còn lại

  if (remainingCount < 0) {
    this.value = this.value.trim().split(/\s+/).slice(0, 200).join(" "); // Giới hạn số từ
    letterCount.textContent = 0; // Đặt số từ còn lại thành 0
  }
});

// Gắn sự kiện "onsubmit" cho form
form.addEventListener("submit", function (e) {
  e.preventDefault(); // Ngăn chặn hành vi gửi form mặc định

  const question = textarea.value.trim(); // Lấy nội dung trong textarea

  if (question === "") {
    alert("Textarea không được bỏ trống!"); // Hiển thị thông báo nếu textarea rỗng
  } else {
    // Thực hiện các hành động khác khi form hợp lệ
    // Gửi dữ liệu form đến endpoint "/api/v1/questions"
    form.onsubmit = (e) => {
      e.preventDefault(); // Ngăn chặn hành vi gửi form mặc đ�
      fetch("http://localhost:3000/api/v1/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: form.content.value,
        }),
      })
        .then((res) => {
          alert("Success");
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
  }
});
