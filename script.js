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
let food_1 = { x: 3, y: 5 };
let food_2 = { x: 7, y: 10 };
let food_3 = { x: 1, y: 14 };

let lastPaintTime = 0;

//Snake moving speed
let speed = 4;
//Game Functions
function main(cTime) {
  window.requestAnimationFrame(main);
  if ((cTime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = cTime;

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

function gameEngine() {
  //Part 1: Update the snake array and food
  if (snakeCollide(snakeArr)) {
    gameOverSound.play();
    showScore.innerText = `You score: ${score}`;
    gameOver.style.display = "flex";
    collided = true;
    inputDirection = { x: 0, y: 0 };
    snakeArr = [{ x: 9, y: 9 }];
    food_1 = { x: 3, y: 5 };
    food_2 = { x: 7, y: 10 };
    food_3 = { x: 1, y: 14 };
    score = 0;
    speed = 4;
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
  // If snake has eaten the food grow the snakebody ,update the score and food co-ordinates
  //If snake eat's food_1
  if (snakeArr[0].x === food_1.x && snakeArr[0].y === food_1.y) {
    snakeArr.unshift({
      x: snakeArr[0].x + inputDirection.x,
      y: snakeArr[0].y + inputDirection.y,
    });
    //Generating random food particles in the board
    food_1 = {
      x: Math.floor(Math.random() * 17) + 2,
      y: Math.floor(Math.random() * 17) + 2,
    };

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
    if (speed < 9) {
      speed += 1;
    }
    //Play the cheer sound when score becomes equal to highscore but not first game
    foodSound.play();
  }//If snake eat's food_2 
  else if (snakeArr[0].x === food_2.x && snakeArr[0].y === food_2.y) {
    snakeArr.unshift({
      x: snakeArr[0].x + inputDirection.x,
      y: snakeArr[0].y + inputDirection.y,
    });
    //Generating random food particles in the board
    food_2 = {
      x: Math.floor(Math.random() * 17) + 2,
      y: Math.floor(Math.random() * 17) + 2,
    };

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
    if (speed < 9) {
      speed += 1;
    }
    //Play the cheer sound when score becomes equal to highscore but not first game
    foodSound.play();
  }//If snake eat's food_3 
  else if (snakeArr[0].x === food_3.x && snakeArr[0].y === food_3.y) {
    snakeArr.unshift({
      x: snakeArr[0].x + inputDirection.x,
      y: snakeArr[0].y + inputDirection.y,
    });
    //Generating random food particles in the board
    food_3 = {
      x: Math.floor(Math.random() * 17) + 2,
      y: Math.floor(Math.random() * 17) + 2,
    };

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
    if (speed < 9) {
      speed += 1;
    }
    //Play the cheer sound when score becomes equal to highscore but not first game
    foodSound.play();
  }
  //Move the snake
  for (let i = snakeArr.length-2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }

  //Add the new head of the current direction
  snakeArr[0].x += inputDirection.x;
  snakeArr[0].y += inputDirection.y;

  //Part 2: Render the snake
  snakeBoard.innerHTML = "";
  snakeArr.forEach((val, index) => {
    let snakeBody = document.createElement("div");
    snakeBody.style.gridColumnStart = val.x;
    snakeBody.style.gridRowStart = val.y;
    if (index === 0) {
      snakeBody.className = "snake-head";
    } else {
      snakeBody.className = "snake-body";
    }
    snakeBoard.appendChild(snakeBody);
  });

  //Part 3: Render the Food1
  let snakeFood_1 = document.createElement("div");
  snakeFood_1.className = `snake-food-1`;
  snakeFood_1.style.gridColumnStart = food_1.x;
  snakeFood_1.style.gridRowStart = food_1.y;
  snakeBoard.appendChild(snakeFood_1);
  //Render the Food2
  let snakeFood_2 = document.createElement("div");
  snakeFood_2.className = `snake-food-2`;
  snakeFood_2.style.gridColumnStart = food_2.x;
  snakeFood_2.style.gridRowStart = food_2.y;
  snakeBoard.appendChild(snakeFood_2);
  //Render the Food3
  let snakeFood_3 = document.createElement("div");
  snakeFood_3.className = `snake-food-3`;
  snakeFood_3.style.gridColumnStart = food_3.x;
  snakeFood_3.style.gridRowStart = food_3.y;
  snakeBoard.appendChild(snakeFood_3);
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
      inputDirection.x = 0;
      inputDirection.y = -1;
      break;
    case "s":
      if (currDirectionWASD === "w" || collided === true) {
        return;
      }
      currDirectionWASD = "s";
      inputDirection.x = 0;
      inputDirection.y = 1;
      break;
    case "a":
      if (currDirectionWASD === "d" || collided === true) {
        return;
      }
      currDirectionWASD = "a";
      inputDirection.x = -1;
      inputDirection.y = 0;
      break;
    case "d":
      if (currDirectionWASD === "a" || collided === true) {
        return;
      }
      currDirectionWASD = "d";
      inputDirection.x = 1;
      inputDirection.y = 0;
      break;
    case "ArrowUp":
      if (currDirection === "ArrowDown" || collided === true) {
        return;
      }
      currDirection = "ArrowUp";
      inputDirection.x = 0;
      inputDirection.y = -1;
      break;

    case "ArrowDown":
      if (currDirection === "ArrowUp" || collided === true) {
        return;
      }
      currDirection = "ArrowDown";
      inputDirection.x = 0;
      inputDirection.y = 1;
      break;
    case "ArrowLeft":
      if (currDirection === "ArrowRight" || collided === true) {
        return;
      }
      currDirection = "ArrowLeft";
      inputDirection.x = -1;
      inputDirection.y = 0;
      break;
    case "ArrowRight":
      if (currDirection === "ArrowLeft" || collided === true) {
        return;
      }
      currDirection = "ArrowRight";
      inputDirection.x = 1;
      inputDirection.y = 0;
      break;
    default:
      break;
  }
});
