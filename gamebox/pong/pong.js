const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");

const paddleWidth = 10;
const paddleHeight = 100;
const ballSize = 12;

let player = { x: 10, y: canvas.height / 2 - paddleHeight / 2 };
let computer = { x: canvas.width - 20, y: canvas.height / 2 - paddleHeight / 2 };
let ball = { x: canvas.width / 2, y: canvas.height / 2, vx: 4, vy: 4 };

let playerScore = 0;
let computerScore = 0;
let game = setInterval(update, 1000 / 60);

function drawRect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

function drawBall(x, y, size, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, size, size);
}

function drawNet() {
  for (let i = 0; i < canvas.height; i += 20) {
    drawRect(canvas.width / 2 - 1, i, 2, 10, "white");
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawNet();
  drawRect(player.x, player.y, paddleWidth, paddleHeight, "lime");
  drawRect(computer.x, computer.y, paddleWidth, paddleHeight, "red");
  drawBall(ball.x, ball.y, ballSize, "white");
}

function moveBall() {
  ball.x += ball.vx;
  ball.y += ball.vy;

  // Wall bounce
  if (ball.y < 0 || ball.y > canvas.height - ballSize) {
    ball.vy *= -1;
  }

  // Player paddle collision
  if (
    ball.x < player.x + paddleWidth &&
    ball.y > player.y &&
    ball.y < player.y + paddleHeight
  ) {
    ball.vx *= -1;
    ball.x = player.x + paddleWidth;
  }

  // Computer paddle collision
  if (
    ball.x + ballSize > computer.x &&
    ball.y > computer.y &&
    ball.y < computer.y + paddleHeight
  ) {
    ball.vx *= -1;
    ball.x = computer.x - ballSize;
  }

  // Scoring
  if (ball.x < 0) {
    computerScore++;
    updateScore();
    resetBall();
  }
  if (ball.x > canvas.width) {
    playerScore++;
    updateScore();
    resetBall();
  }
}

function updateScore() {
  document.getElementById("scoreDisplay").textContent =
    `Player: ${playerScore} | Computer: ${computerScore}`;

  if (playerScore >= 5 || computerScore >= 5) {
    endGame();
  }
}

function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.vx = -ball.vx;
  ball.vy = 4 * (Math.random() > 0.5 ? 1 : -1);
}

function endGame() {
  clearInterval(game);
  const popup = document.getElementById("popup");
  popup.style.display = "block";
  popup.querySelector("div").textContent = playerScore >= 5 ? "🏆 You Win!" : "💀 Game Over!";
}

function restartGame() {
  playerScore = 0;
  computerScore = 0;
  updateScore();
  player.y = canvas.height / 2 - paddleHeight / 2;
  computer.y = canvas.height / 2 - paddleHeight / 2;
  resetBall();
  document.getElementById("popup").style.display = "none";
  game = setInterval(update, 1000 / 60);
}

function update() {
  moveBall();
  draw();

  // Computer AI
  const target = ball.y - paddleHeight / 2;
  computer.y += (target - computer.y) * 0.05;
}

// Keyboard control with boundary check
document.addEventListener("keydown", (e) => {
  const step = 20;
  if (e.key === "ArrowUp" && player.y > 0) {
    player.y -= step;
  }
  if (e.key === "ArrowDown" && player.y + paddleHeight < canvas.height) {
    player.y += step;
  }
});