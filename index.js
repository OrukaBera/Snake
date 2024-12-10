const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");
const startBtn = document.querySelector("#startBtn");
const retroBtn = document.getElementById("skin1");
const sunsetBtn = document.getElementById("skin2");
const monoBtn = document.getElementById("skin3");
const easyBtn = document.getElementById("diff1");
const intermediateBtn = document.getElementById("diff2");
const hardBtn = document.getElementById("diff3");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
var boardBackground = "white";
var snakeColor = "lightgreen";
var snakeBorder = "black";
var foodColor = "red";
const unitSize = 20;
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let difficultyTick = 105;
let score = 0;
let snake = [
    {x:unitSize * 4, y:0},
    {x:unitSize * 3, y:0},
    {x:unitSize * 2, y:0},
    {x:unitSize, y:0},
    {x:0, y:0}
];

window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);
startBtn.addEventListener("click", startPressed);
retroBtn.addEventListener("click", retro);
sunsetBtn.addEventListener("click", sunset); 
monoBtn.addEventListener("click", monochrome);
easyBtn.addEventListener("click", easy);
intermediateBtn.addEventListener("click", intermediate);
hardBtn.addEventListener("click", hard);



mainMenu();

function mainMenu(){
    clearBoard();
    ctx.font = "50px MV Boli";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("PRESS START!", gameWidth / 2, gameHeight / 2);
    
    document.getElementById("startBtn").style.visibility="visible";
    document.getElementById("resetBtn").style.visibility="hidden";
}

function startPressed(){
    gameStart();
    document.getElementById("startBtn").style.visibility="hidden";
}

function gameStart(){
    running = true;
    scoreText.textContent = score;
    createFood();
    drawFood();
    nextTick();
}
function nextTick(){
    if(running){
        setTimeout(()=>{
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, difficultyTick);
    }
    else{
        displayGameOver();
    }
}
function clearBoard(){
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
}
function createFood(){
    function randomFood(min, max){
        const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
        return randNum;
    }
    foodX = randomFood(0, gameWidth - unitSize);
    foodY = randomFood(0, gameWidth - unitSize);
}
function drawFood(){
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, unitSize, unitSize);
}
function moveSnake(){
    const head = {x: snake[0].x + xVelocity,
                  y: snake[0].y + yVelocity};
    
    snake.unshift(head);
    //if food is eaten
    if(snake[0].x == foodX && snake[0].y == foodY){
        score+=1;
        scoreText.textContent = score;
        createFood();
    }
    else{
        snake.pop();
    }     
}
function drawSnake(){
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    }
    );
}
function changeDirection(event){
    const keyPressed = event.keyCode;
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;

    const goingUp = (yVelocity == -unitSize);
    const goingDown = (yVelocity == unitSize);
    const goingRight = (xVelocity == unitSize);
    const goingLeft = (xVelocity == -unitSize);

    switch(true){
        case(keyPressed == LEFT && !goingRight):
            xVelocity = -unitSize;
            yVelocity = 0;
            break;
        case(keyPressed == UP && !goingDown):
            xVelocity = 0;
            yVelocity = -unitSize;
            break;
        case(keyPressed == RIGHT && !goingLeft):
            xVelocity = unitSize;
            yVelocity = 0;
            break;
        case(keyPressed == DOWN && !goingUp):
            xVelocity = 0;
            yVelocity = unitSize;
            break;
    }
}
function checkGameOver(){
    switch(true){
        case (snake[0].x < 0):
            running = false;
            break;
        case (snake[0].x >= gameWidth):
            running = false;
            break;
        case (snake[0].y < 0):
            running = false;
            break;
        case (snake[0].y >= gameHeight):
                running = false;
                break;
    }
    for(let i = 1; i < snake.length; i+=1){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            running = false;
        }
    }
}
function displayGameOver(){
    ctx.font = "50px MV Boli";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER!", gameWidth / 2, gameHeight / 2);
    running = false;
    document.getElementById("resetBtn").style.visibility="visible";
}
function resetGame(){
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;
    snake = [
        {x:unitSize * 4, y:0},
        {x:unitSize * 3, y:0},
        {x:unitSize * 2, y:0},
        {x:unitSize, y:0},
        {x:0, y:0}
    ];
    mainMenu();
}

function skinListDropdown() {
  document.getElementById("skinDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
};

function retro(){
    snakeColor = "lightgreen";
    snakeBorder = "black";
    boardBackground = "white";
    foodColor = "red";
    resetGame();
    mainMenu();
}

function sunset(){
    snakeColor = "orange";
    snakeBorder = "yellow";
    boardBackground = "#f51eff";
    foodColor = "yellow";
    resetGame();
    mainMenu();
    
}

function monochrome(){
    snakeColor = "black";
    snakeBorder = "white";
    boardBackground = "white";
    foodColor = "grey";
    resetGame();
    mainMenu();
}

function diffListDropdown() {
  document.getElementById("diffDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
};

function easy(){
    difficultyTick = 105;
    resetGame();
    mainMenu();
}

function intermediate(){
    difficultyTick = 80;
    resetGame();
    mainMenu();
    
}

function hard(){
    difficultyTick = 55;
    resetGame();
    mainMenu();
    
}

