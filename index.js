let gameSeq = [];
let userSeq = [];

let btns = ["red", "yellow", "green", "blue"];

let started = false;
let level = 0;

let h1 = document.querySelector("#level-title");

// START GAME
document.addEventListener("keypress", function () {
  if (!started) {
    started = true;
    levelUp();
  }
});

// BUTTON CLICK
document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("click", function () {
    let userColor = this.id;
    userSeq.push(userColor);

    playSound(userColor);
    btnFlash(this);

    checkAnswer(userSeq.length - 1);
  });
});

// LEVEL UP
function levelUp() {
  userSeq = [];
  level++;
  h1.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * btns.length);
  let randColor = btns[randIdx];
  gameSeq.push(randColor);

  let randBtn = document.querySelector(`#${randColor}`);

  setTimeout(() => {
    btnFlash(randBtn);
    playSound(randColor);
  }, 500);
}

// CHECK ANSWER
function checkAnswer(currentIdx) {
  if (userSeq[currentIdx] === gameSeq[currentIdx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    playSound("wrong");
    document.body.classList.add("game-over");
    h1.innerText = "Game Over, Press Any Key to Restart";

    setTimeout(() => {
      document.body.classList.remove("game-over");
    }, 200);

    resetGame();
  }
}

// FLASH EFFECT
function btnFlash(btn) {
  btn.classList.add("pressed");
  setTimeout(() => {
    btn.classList.remove("pressed");
  }, 200);
}

// SOUND
function playSound(name) {
  let audio = new Audio(`sounds/${name}.mp3`);
  audio.currentTime = 0;
  audio.play();
}

// RESET
function resetGame() {
  level = 0;
  gameSeq = [];
  started = false;
}
