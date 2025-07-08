const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake, direction, nextDirection, apple, score, lastTime, speed;
let animationId = null;

function startGame() {
  snake = [{ x: 10, y: 10 }];
  direction = { x: 0, y: 0 };
  nextDirection = { x: 0, y: 0 };
  apple = spawnApple();
  score = 0;
  speed = 150;
  lastTime = 0;
  document.getElementById("score").textContent = "Score: 0";
  document.getElementById("gameOverPopup").classList.add("hidden");

  if (animationId) cancelAnimationFrame(animationId);
  animationId = requestAnimationFrame(gameLoop);
}

function spawnApple() {
  let x, y;
  do {
    x = Math.floor(Math.random() * tileCount);
    y = Math.floor(Math.random() * tileCount);
  } while (snake.some(segment => segment.x === x && segment.y === y));
  return { x, y };
}

function gameLoop(timestamp) {
  if (!lastTime) lastTime = timestamp;
  const delta = timestamp - lastTime;

  if (delta > speed) {
    update();
    draw();
    lastTime = timestamp;
  }

  animationId = requestAnimationFrame(gameLoop);
}

function update() {
  direction = nextDirection;
  if (direction.x === 0 && direction.y === 0) return;

  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
  snake.unshift(head);

  if (head.x === apple.x && head.y === apple.y) {
    apple = spawnApple();
    score++;
    document.getElementById("score").textContent = "Score: " + score;
  } else {
    snake.pop();
  }

  checkCollision(head);
}

function checkCollision(head) {
  if (
    head.x < 0 || head.y < 0 ||
    head.x >= tileCount || head.y >= tileCount ||
    snake.slice(1).some(seg => seg.x === head.x && seg.y === head.y)
  ) {
    endGame();
  }
}

function drawGrid() {
  ctx.strokeStyle = "#1a1a3d";
  for (let x = 0; x < canvas.width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  for (let y = 0; y < canvas.height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
}

function draw() {
  ctx.fillStyle = "#0a0a23";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawGrid();

  ctx.fillStyle = "red";
  ctx.fillRect(apple.x * gridSize, apple.y * gridSize, gridSize, gridSize);

  ctx.fillStyle = "lime";
  for (const s of snake) {
    ctx.fillRect(s.x * gridSize, s.y * gridSize, gridSize, gridSize);
  }
}

function endGame() {
  cancelAnimationFrame(animationId);
  document.getElementById("gameOverPopup").classList.remove("hidden");
}

document.addEventListener("keydown", e => {
  switch (e.key) {
    case "ArrowUp": if (direction.y !== 1) nextDirection = { x: 0, y: -1 }; break;
    case "ArrowDown": if (direction.y !== -1) nextDirection = { x: 0, y: 1 }; break;
    case "ArrowLeft": if (direction.x !== 1) nextDirection = { x: -1, y: 0 }; break;
    case "ArrowRight": if (direction.x !== -1) nextDirection = { x: 1, y: 0 }; break;
  }
});

startGame();
