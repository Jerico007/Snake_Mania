//Constant Variables
const snakeBoard = document.getElementsByClassName("snake-board")[0];
const showScore = document.getElementsByClassName("show-score")[0];
const scoreBoard = document.getElementById("score-board");
const highScoreBoard = document.getElementById("highscore-board");
const playAgain = document.getElementById("btn");
const gameOver = document.getElementsByClassName("game-over")[0];
const foodSound = new Audio("sounds/eating-sound-effect-36186.mp3");
const gameOverSound = new Audio("sounds/videogame-death-sound-43894.mp3");
const cheerSound = new Audio("sounds/Cheers.mp3");
//Not to take any events when the game is over
let collided = false;

//Keep Track of current direction to avoid moving in opposite direction
let currDirection = "";
let currDirectionWASD = "";

//Score & Highest score track
let score = 0;
let highScore = 0;
let highScoreBeaten = false;
//To beep a sound when highscore is beaten
let FirstGame = true;
//User Input
let inputDirection = { x: 0, y: 0 };

//Indicates snake body co-ordinates
let snakeArr = [{ x: 9, y: 9 }];

//Indicates snake Food co-ordinates
let foods = [
  { x: 3, y: 5 },
  { x: 7, y: 10 },
  { x: 1, y: 14 },
];

//Snake moving speed in milliseconds
let speed = 120;
//Game Functions
function main(ctime) {
  //Set Time out will call requestAnimation after every speed ms(Milli Seconds)
  console.log(ctime);
  setTimeout(() => {
    window.requestAnimationFrame(main);
  }, speed);
  gameEngine();
}

function snakeCollide(snakeArr) {
  //If snake eat's itself
  for (let i = 1; i < snakeArr.length; i++) {
    if (snakeArr[0].x === snakeArr[i].x && snakeArr[0].y === snakeArr[i].y) {
      return true;
    }
  }
  //If snake hits the border
  if (
    snakeArr[0].x < 1 ||
    snakeArr[0].x > 18 ||
    snakeArr[0].y < 1 ||
    snakeArr[0].y > 18
  ) {
    return true;
  }
  return false;
}

//Modify the location of the food ,update the score board , and increase the size of the snake
function modifySnakeBoard(food) {
  snakeArr.unshift({
    x: snakeArr[0].x + inputDirection.x,
    y: snakeArr[0].y + inputDirection.y,
  });
  //Generating random food particles in the board
  food.x = Math.floor(Math.random() * 17) + 2;
  food.y = Math.floor(Math.random() * 17) + 2;
  //Updatting score
  score += 1;
  scoreBoard.innerText = `Score: ${score}`;
  if (score > highScore && !highScoreBeaten && !FirstGame) {
    cheerSound.play();
    highScoreBeaten = true;
  }
  //Updatting HighScore
  if (highScore < score) {
    highScore += 1;
  }
  highScoreBoard.innerText = `High Score: ${highScore}`;
  //Increasing the speed after eating the food
  if (speed > 100) {
    speed -= 1;
  }
  //Play the cheer sound when score becomes equal to highscore but not first game
  foodSound.play();
}

function gameEngine() {
  //Part 1: Check if the snake Collided to itself if yes then GAMEOVER
  if (snakeCollide(snakeArr)) {
    gameOverSound.play();
    showScore.innerText = `You score: ${score}`;
    gameOver.style.display = "flex";
    collided = true;
    inputDirection = { x: 0, y: 0 };
    snakeArr = [{ x: 9, y: 9 }];
    foods.forEach((val) => {
      val.x = Math.floor(Math.random() * 17) + 2;
      val.y = Math.floor(Math.random() * 17) + 2;
    });
    score = 0;
    speed = 120;
    FirstGame = false;
    highScoreBeaten = false;
    scoreBoard.innerText = `Score: ${score}`;
    playAgain.addEventListener("click", () => {
      gameOver.style.display = "none";
      collided = false;
    });

    window.addEventListener("keydown", (e) => {
      gameOver.style.display = "none";
      collided = false;
    });
  }

  //To check if the snake eats the food
  foods.forEach((val) => {
    if (snakeArr[0].x === val.x && snakeArr[0].y === val.y) {
      modifySnakeBoard(val);
    } else if (snakeArr[0].x === val.x && snakeArr[0].y === val.y) {
      modifySnakeBoard(val);
    } else if (snakeArr[0].x === val.x && snakeArr[0].y === val.y) {
      modifySnakeBoard(val);
    }
  });

  //Move the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }
  //Add the new head of the current direction
  snakeArr[0].x += inputDirection.x;
  snakeArr[0].y += inputDirection.y;

  //Part 2: Render the snake
  snakeBoard.innerHTML = "";
  snakeArr.forEach((val, index) => {
    let snakeBody = document.createElement("div");
    snakeBody.style.gridColumnStart = val.y;
    snakeBody.style.gridRowStart = val.x;
    if (index === 0) {
      snakeBody.className = "snake-head";
    } else {
      snakeBody.className = "snake-body";
    }
    snakeBoard.appendChild(snakeBody);
  });

  //Part 3: Render the food
  let num = 1;
  foods.forEach((val) => {
    let snakeFood_1 = document.createElement("div");
    snakeFood_1.className = `snake-food-${num}`;
    snakeFood_1.style.gridColumnStart = val.y;
    snakeFood_1.style.gridRowStart = val.x;
    snakeBoard.appendChild(snakeFood_1);
    num++;
  });
}

//The gameLoop begins
window.requestAnimationFrame(main);
// Keyboard Events for giving directions to the snake
window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "w":
      if (currDirectionWASD === "s" || collided === true) {
        return;
      }
      currDirectionWASD = "w";
      inputDirection.x = -1;
      inputDirection.y = 0;
      break;
    case "s":
      if (currDirectionWASD === "w" || collided === true) {
        return;
      }
      currDirectionWASD = "s";
      inputDirection.x = 1;
      inputDirection.y = 0;
      break;
    case "a":
      if (currDirectionWASD === "d" || collided === true) {
        return;
      }
      currDirectionWASD = "a";
      inputDirection.x = 0;
      inputDirection.y = -1;
      break;
    case "d":
      if (currDirectionWASD === "a" || collided === true) {
        return;
      }
      currDirectionWASD = "d";
      inputDirection.x = 0;
      inputDirection.y = 1;
      break;
    case "ArrowUp":
      if (currDirection === "ArrowDown" || collided === true) {
        return;
      }
      currDirection = "ArrowUp";
      inputDirection.x = -1;
      inputDirection.y = 0;
      break;

    case "ArrowDown":
      if (currDirection === "ArrowUp" || collided === true) {
        return;
      }
      currDirection = "ArrowDown";
      inputDirection.x = 1;
      inputDirection.y = 0;
      break;
    case "ArrowLeft":
      if (currDirection === "ArrowRight" || collided === true) {
        return;
      }
      currDirection = "ArrowLeft";
      inputDirection.x = 0;
      inputDirection.y = -1;
      break;
    case "ArrowRight":
      if (currDirection === "ArrowLeft" || collided === true) {
        return;
      }
      currDirection = "ArrowRight";
      inputDirection.x = 0;
      inputDirection.y = 1;
      break;
    default:
      break;
  }
});
