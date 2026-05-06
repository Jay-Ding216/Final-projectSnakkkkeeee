var mode = 0;

let splash;

// var for game snakes
let snake = [];
let dir;
let food;
let monsters = [];
let grid = 20;


let score = 0;
let gameOver = false;
let monsterMode = false;
let win = false;

// setup 
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(10)
  
  splash = new Splash();
  
  snake = [createVector(10,10)] 
  dir =  createVector(1,0)
  
  spawnFood();
    
  mySlider = createSlider(5, 20, 10);
  mySlider.position(20,50)// gui example. use the .position method in the draw function
}


// draw
function draw() {
  if (mouseIsPressed == true && splash.update() == true) {
    mode = 1;
  
  }
  
  if (mode == 1) {
    splash.hide();
    letGameStart();
  }
}


// 游戏进度(where all snakes move,run, eats, chase by the monsters, game ends etc...)
function letGameStart(){
  background(255)
  frameRate(mySlider.value());// control the speed of the gam e. 5 slow, 20 fast.
  
  if(win == true){
    fill(0, 255, 255)
    textAlign(CENTER)
    textSize(50)
    text('congratulation', width / 2, height / 2);
  }
  
  
  if(gameOver == true){
    fill(255, 100, 0)
    textAlign(CENTER)
    textSize(40)
    text("game Over", width / 2, height / 2)
    
    textSize(20);
    text('to restart the game, plz refresh the page', width /2, height/2 +40 )
    return;
  } 
  
  drawGrid()
  
  let head = snake[0] .copy() // get the postion of the snake head
  head.add(dir) // direction of the snake heads
  snake.unshift(head)
  
  if(head.x == food.x && head.y == food.y){// check if the snake had touch the food or not. if postion of the head == to food, get points.
    score++
    spawnFood()
    
    if(score >= 10){
      win = true
    }
  
  
  if(score>= 5 && monsterMode == false){
    monsterMode = true ;
    spawnMonsters();
    
  }
} else {
  snake.pop()
}
  // snake hit the wall or not.
  if (hitWall(head) || hitSelf(head)) {
    gameOver = true;
}
  //monster touch the snake or not 
  if(monsterMode == true){
    moveMonsters()
    checkMonsterCollision(head);
  }
  
  
  drawSnake();
    drawFood()
    
  

  drawMonsters()
  
  fill(255,0,0);
  textSize(20);
  textAlign(LEFT);
  text("score:"+ score, 20, 30 );
  text("speed", 160, 65);
  
}

// snake 
function drawSnake(){
  fill(0,255,0)
  noStroke()
  
  for (let s of snake){// (s represent the part of the snake)
    rect(s.x * grid, s.y * grid, grid, grid);//how the snake is drawn (the size of the snake is 20*20 becuase of grid * grid)
  }
}


// SpawnFood
function spawnFood(){
  food = createVector(
    floor(random(width / grid)),
    floor(random(height / grid))
    );
}
 
// food draw
function drawFood(){
  fill(255, 0, 0)
  noStroke();
  rect(food.x * grid, food.y * grid, grid, grid);
}

// monster spawn 
function spawnMonsters(){
  for (let i = 0; i < 3; i++){
    monsters.push(createVector(
      floor(random(width / grid)),
      floor(random(width / grid))
      ));  
  }
}


function drawMonsters(){
  fill(random(100,200), 0, 255)
  noStroke()
  
  for (let m of monsters){
    rect(m.x * grid, m.y * grid, grid, grid);
  }
}

// how monster moves.
function moveMonsters() {
  for (let m of monsters) {
    if (m.x < snake[0].x) {
      m.x++;
    } else if (m.x > snake[0].x) {
      m.x--;
    }

    if (m.y < snake[0].y) {
      m.y++;
    } else if (m.y > snake[0].y) {
      m.y--;
    }
  }
}

// monster hit wall
function checkMonsterCollision(head) {
  for (let m of monsters) {
    if (head.x == m.x && head.y == m.y) {
      gameOver = true;
    }
  }
}


// when hitwall
function hitWall(head) {
  return head.x < 0 || head.x >= width / grid || head.y < 0 || head.y >= height / grid;
}

function hitSelf(head) {
  for (let i = 1; i < snake.length; i++) {
    if (head.x == snake[i].x && head.y == snake[i].y) {
      return true;
    }
  }

  return false;
}
// background grid
function drawGrid() {
  stroke(50);
  strokeWeight(0.5);

  for (let x = 0; x < width; x += grid) {
    line(x, 0, x, height);
  }

  for (let y = 0; y < height; y += grid) {
    line(0, y, width, y);
  }
}


//control snakes
function keyPressed() {
  if (keyCode == UP_ARROW && dir.y != 1) { // press up arrow, snake goes up
    dir = createVector(0, -1);
  } else if (keyCode == DOWN_ARROW && dir.y != -1) { //press down, snake goes down
    dir = createVector(0, 1);
  } else if (keyCode == LEFT_ARROW && dir.x != 1) { // press left, snake goes left
    dir = createVector(-1, 0);
  } else if (keyCode == RIGHT_ARROW && dir.x != -1) { // press right, snake goes right
    dir = createVector(1, 0);
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}