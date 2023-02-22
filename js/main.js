// 패널 돌리기
const frame = document.querySelector("section");
const articleArr = frame.querySelectorAll("article");
const len = articleArr.length;
const deg = 360 / len;

for (let i = 0; i < len; i++) {
  // 돌린 후 기준점 내려야!
  articleArr[i].style.transform = `rotate(${deg * i}deg) translateY(-100vh)`;
}
