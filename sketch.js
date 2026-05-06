let snake = [];
let food;
let direction;
let gridSize = 20;
let gameOver = false;

function setup() {
  createCanvas(400, 400);
  frameRate(10);

  snake.push(createVector(200, 200));
  direction = createVector(1, 0);

  placeFood(); 
}

function draw() {
  background(30);

  if (gameOver) {
    fill(255);
    textAlign(CENTER);
    textSize(32);
    text("Game Over", width / 2, height / 2);
    textSize(16);
    text("Press R to restart", width / 2, height / 2 + 35);
    return;
  }

  moveSnake();
  checkCollision();
  drawFood();
  drawSnake();

  fill(255);
  textSize(16);
  text("Score: " + (snake.length - 1), 10, 20);
}

function moveSnake() {
  let head = snake[snake.length - 1].copy();
  head.x += direction.x * gridSize;
  head.y += direction.y * gridSize;

  snake.push(head);

  if (head.x === food.x && head.y === food.y) {
    placeFood();
  } else {
    snake.shift();
  }
}

function drawSnake() {
  fill(0, 255, 100);
  for (let part of snake) {
    rect(part.x, part.y, gridSize, gridSize);
  }
}

function drawFood() {
  fill(255, 50, 50);
  rect(food.x, food.y, gridSize, gridSize);
}

function placeFood() {
  let cols = width / gridSize;
  let rows = height / gridSize;

  food = createVector(
    floor(random(cols)) * gridSize,
    floor(random(rows)) * gridSize
  );
}

function checkCollision() {
  let head = snake[snake.length - 1];

  // when hit wall 
  if (head.x < 0 || head.x >= width || head.y < 0 || head.y >= height) {
    gameOver = true;
  }

  // hit myself 
  for (let i = 0; i < snake.length - 1; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      gameOver = true;
    }
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW && direction.y !== 1) {
    direction = createVector(0, -1);
  } else if (keyCode === DOWN_ARROW && direction.y !== -1) {
    direction = createVector(0, 1);
  } else if (keyCode === LEFT_ARROW && direction.x !== 1) {
    direction = createVector(-1, 0);
  } else if (keyCode === RIGHT_ARROW && direction.x !== -1) {
    direction = createVector(1, 0);
  }

  if (key === "r" || key === "R") {
    restartGame();
  }
}

function restartGame() {
  snake = [];
  snake.push(createVector(200, 200));
  direction = createVector(1, 0);
  gameOver = false;
  placeFood();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
