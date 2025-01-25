// ข้อมูลการ์ด
const cards = [
    [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31],
    [2, 3, 6, 7, 10, 11, 14, 15, 18, 19, 22, 23, 26, 27, 30, 31],
    [4, 5, 6, 7, 12, 13, 14, 15, 20, 21, 22, 23, 28, 29, 30, 31],
    [8, 9, 10, 11, 12, 13, 14, 15, 24, 25, 26, 27, 28, 29, 30, 31],
    [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
  ];

  // ฟังก์ชัน Fisher-Yates Shuffle
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]; // สลับตำแหน่ง
  }
  return arr;
}

// สลับเลขในแต่ละการ์ด
const shuffledCards = cards.map(card => shuffleArray([...card]));

console.log(shuffledCards);
  
  // สร้างการ์ดใน HTML
  const cardsContainer = document.getElementById("cards");
  cards.forEach((card, index) => {
    const cardDiv = document.createElement("div");
    cardDiv.className =
      "bg-white shadow-md rounded-lg p-4 border border-gray-300 hover:shadow-lg hover:scale-105 transform transition-all duration-300";
  
    // ส่วนหัวการ์ด
    cardDiv.innerHTML = `
      <h3 class="text-xl font-semibold text-green-600 mb-4 text-center">การ์ด ${index + 1}</h3>
      <div class="grid grid-cols-4 gap-2 text-center text-lg font-bold text-gray-800 mb-4">
        ${card.map((num) => `<span>${num}</span>`).join("")}
      </div>
      <label class="flex justify-center items-center">
        <input type="checkbox" id="card${index}" class="mr-2 w-5 h-5 accent-green-500">
        <span class="text-md text-gray-700">เลือกการ์ดนี้</span>
      </label>`;
    cardsContainer.appendChild(cardDiv);
  });
  
  // ฟังก์ชันทายวันเกิด
  function guessBirthday() {
    let birthday = 0;
    for (let i = 0; i < cards.length; i++) {
      const checkbox = document.getElementById(`card${i}`);
      if (checkbox.checked) {
        birthday += cards[i][0]; // เลขแรกของการ์ดเป็นค่าสำหรับบวก
      }
    }
  
    if (birthday > 0) {
      Swal.fire({
        title: ` พ่อหมอสมคิด \n ทายว่าคุณเกิดวันที่
        <span style="color: red; font-size: 2em;">${birthday}</span>`,
        text: "ทายถูกไหม? ลองเล่นอีกครั้งได้เลย!",
        icon: "success",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#38A169",
      }).then(() => {
        resetGame(); // รีเซ็ตการเลือกการ์ดหลังแสดงผล
      });
    } else {
      Swal.fire({
        title: "กรุณาเลือกการ์ด!",
        text: "คุณต้องเลือกอย่างน้อย 1 ใบก่อนที่จะทายวันเกิด!",
        icon: "warning",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#F6AD55",
      });
    }
  }
  
  // ฟังก์ชันรีเซ็ตเกม
  function resetGame() {
    const checkboxes = document.querySelectorAll("input[type='checkbox']");
    checkboxes.forEach((checkbox) => (checkbox.checked = false));
  }
  