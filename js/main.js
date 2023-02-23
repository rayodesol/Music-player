// 패널 돌리기
const frame = document.querySelector("section");
const articleArr = frame.querySelectorAll("article");
const len = articleArr.length;
const deg = 360 / len;

const names = [
  "cardio",
  "groove",
  "happy",
  "light",
  "lily",
  "limes",
  "pop",
  "swing",
];

for (let i = 0; i < len; i++) {
  // 축을 돌린 후 section을 기준으로 퍼트리기
  articleArr[i].style.transform = `rotate(${deg * i}deg) translateY(-100vh)`;

  // 사진 부분 일괄 적용
  const pic = articleArr[i].querySelector(".pic");
  console.log(pic);
  pic.style.backgroundImage = `url("../img/${names[i]}.jpg")`;

  // 음악 제목 일괄 적용
  const title = articleArr[i].querySelector(".text>h2");
  title.innerHTML = `${names[i]}`;

  // 음악 태그 & 파일 일괄 적용
  // <audio> 만들기
  const audio = document.createElement("audio");
  audio.setAttribute("src", `../music/${names[i]}.mp3`);
  audio.setAttribute("loop", "loop");
  articleArr[i].append(audio);
}

// Prev, Next 버튼 액션 처리
// panel section (중심점) 을 돌려서 처리
const prev = document.querySelector(".btnPrev");
const next = document.querySelector(".btnNext");

let num = 0; // 회전 각도 조절용
let active = 0; // 활성화 패널 위치 기억용

prev.addEventListener("click", function () {
  // 회전
  frame.style.transform = `rotate(${deg * ++num}deg)`;

  // 가운데 패널 커지게
  if (active === 0) {
    active = len - 1; // 패널 개수 - 1
  } else {
    active--; // 확실하게 --active; 로 해도 됨
  }

  for (let el of articleArr) {
    el.classList.remove("on");
    // 노래 겹치지 않게 하는 내 코드 - 다음/이전 버튼 누르면 정지
    // el.querySelector("audio").pause(); ////////////////////////////////////////////
    // el.querySelector(".pic").classList.remove("on"); //////////////////////////////
  }

  articleArr[active].classList.add("on");
});

next.addEventListener("click", function () {
  // 회전
  frame.style.transform = `rotate(${deg * --num}deg)`;

  // 가운데 패널 커지게
  if (active === len - 1) {
    active = 0;
  } else {
    active++; // 확실하게 ++active; 로 해도 됨
  }

  for (let el of articleArr) {
    el.classList.remove("on");
    // 노래 겹치지 않게 하는 내 코드 - 다음/이전 버튼 누르면 정지
    // el.querySelector("audio").pause(); ////////////////////////////////////////////
    // el.querySelector(".pic").classList.remove("on"); //////////////////////////////
  }

  articleArr[active].classList.add("on");
});

// CD 모양 사진 회전 & 음악 파일 컨트롤
let before = 0; // 이전 패널 위치 기억용 변수

for (let el of articleArr) {
  const play = el.querySelector(".play");
  const pause = el.querySelector(".pause");
  const reload = el.querySelector(".reload");

  play.addEventListener("click", function (e) {
    if (before === 0) {
      before = e.target; // 위치 기억
    } else if (before !== e.target) {
      // 이미 재생 중인데 다른 곳 가서 재생 버튼 누를 때
      // 이전에 재생되던 것의 그림, 음악 멈춤
      before.closest("article").querySelector(".pic").classList.remove("on");
      before.closest("article").querySelector("audio").pause();
      before = e.target; // 위치 기억
    }

    // closest() ; 클릭된 곳에서 가장 가까운 태그 or 선택자 찾아주는.
    e.target.closest("article").querySelector(".pic").classList.add("on");
    // 이렇게도 가능. 이게 더 깔끔해서 좋음.
    // el.querySelector(".pic").classList.add("on");

    el.querySelector("audio").play();
  });

  pause.addEventListener("click", function (e) {
    // closest() ; 클릭된 곳에서 가장 가까운 태그 or 선택자 찾아주는.
    e.target.closest("article").querySelector(".pic").classList.remove("on");

    e.target.closest("article").querySelector("audio").pause();
  });

  reload.addEventListener("click", function (e) {
    el.querySelector(".pic").classList.add("on");
    el.querySelector("audio").load();
    el.querySelector("audio").play();

    if (before === 0) {
      before = e.target; // 위치 기억
    } else if (before !== e.target) {
      // 이미 재생 중인데 다른 곳 가서 재생 버튼 누를 때
      // 이전에 재생되던 것의 그림, 음악 멈춤
      before.closest("article").querySelector(".pic").classList.remove("on");
      before.closest("article").querySelector("audio").pause();
      before = e.target; // 위치 기억
    }
  });
}
