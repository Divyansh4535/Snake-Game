// variables & constants
let inputDir = { x: 0, y: 0 };
const audioFood = new Audio("./SnakeGame/music/food.mp3");
const audioGameOver = new Audio("./SnakeGame/music/gameover.mp3");
const audioMove = new Audio("./SnakeGame/music/move.mp3");
const audioMusic = new Audio("./SnakeGame/music/music.mp3");
let lastPaintTime = 0;
let speed = 5;
let score = 0;
let snakeArr = [{ x: 13, y: 15 }];
// snakeFoodDir = { x: 11, y: 10 };
let a = 1,
  b = 18;
snakeFoodDir = {
  x: Math.round(a + (b - a) * Math.random()),
  y: Math.round(a + (b - a) * Math.random()),
};
const board = document.querySelector("#board");
const scoreIncrement = document.querySelector(".score");
const highScore = document.querySelector(".highScore");

// Games Function
function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}

const isCollide = (snake) => {
  //? if you bump into yourself
  for (let i = 1; i < snakeArr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  //? if you bump into wall
  if (snake[0].x > 18 || snake[0].x < 0 || snake[0].y > 18 || snake[0].y < 0) {
    return true;
  }
  // return false;
};

function gameEngine() {
  //! part 1: updating the snake  array  & food
  if (isCollide(snakeArr)) {
    audioGameOver.play();
    audioMusic.pause();
    inputDir = { x: 0, y: 0 };
    alert("GAme over , press any key to play again");
    snakeArr = [{ x: 13, y: 15 }];
    snakeFoodDir = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
    score = 0;
    scoreIncrement.innerHTML = "Score :" + score;
  }
  //? if u have eaten the food ,increment the score and regenerate the food
  if (snakeArr[0].y === snakeFoodDir.y && snakeArr[0].x === snakeFoodDir.x) {
    audioFood.play();
    score += 1;
    //high score logic
    if (score > highScoreVal) {
      highScoreVal = score;
      localStorage.setItem("HiScore", JSON.stringify(highScoreVal));
      highScore.innerHTML = "High Score : " + highScoreVal;
    }
    scoreIncrement.innerHTML = "Score : " + score;
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    snakeFoodDir = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  // Moving snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }
  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  //! Part 2: Display the snake & food
  // Display the snake
  board.innerHTML = "";
  snakeArr.forEach((e, idx) => {
    snakeElem = document.createElement("div");
    snakeElem.style.gridRowStart = e.y;
    snakeElem.style.gridColumnStart = e.x;
    if (idx === 0) {
      snakeElem.classList.add("snakeHead");
    } else {
      snakeElem.classList.add("snakeBody");
    }
    board.appendChild(snakeElem);
  });

  // Display the Food
  let foodElem = document.createElement("div");
  foodElem.style.gridRowStart = snakeFoodDir.y;
  foodElem.style.gridColumnStart = snakeFoodDir.x;
  foodElem.classList.add("snakeFood");
  board.appendChild(foodElem);

  // rotate the head of snake
  let snakeHeadElem = document.querySelector(".snakeHead");
  if (inputDir.x === 1) {
    console.log("inputDir.x", inputDir.x);
    snakeHeadElem.style.transform = "rotate(270deg)";
  } else if (inputDir.x === -1) {
    console.log("inputDir.-x", inputDir.x);
    snakeHeadElem.style.transform = "rotate(90deg)";
  } else if (inputDir.y === 1) {
    console.log("inputDir.y", inputDir.y);
    snakeHeadElem.style.transform = "rotate(0deg)";
  } else if (inputDir.y === -1) {
    console.log("inputDir.-y", inputDir.y);
    snakeHeadElem.style.transform = "rotate(180deg)";
  }
}

//? Main logic Start here
audioMusic.play();
//high Score logic
let HiScore = localStorage.getItem("HiScore");
if (HiScore === null) {
  let highScoreVal = 0;
  localStorage.setItem("HiScore", JSON.stringify(highScoreVal));
} else {
  highScoreVal = JSON.parse(HiScore);
  highScore.innerHTML = "High Score :" + highScoreVal;
}
// ============================
//! part 3 Handle the keydown event to change the direction
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 };
  audioMove.play();
  switch (e.key) {
    case "ArrowUp":
      console.log("Up");
      inputDir.x = 0;
      inputDir.y = -1;
      break;
    case "ArrowDown":
      inputDir.x = 0;
      inputDir.y = 1;
      console.log("down");
      break;
    case "ArrowRight":
      console.log("right");
      inputDir.x = 1;
      inputDir.y = 0;
      break;
    case "ArrowLeft":
      console.log("Left");
      inputDir.x = -1;
      inputDir.y = 0;
      break;
  }
});
