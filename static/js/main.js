
const player = {
  x: 100,
  y: 450,
  width: 50,
  height: 50,
  color: "red",
  isAttacking: false,
  attackFrame: 0
};

const enemy = {
  x: 600,
  y: 450,
  width: 50,
  height: 50,
  color: "gray"
};

let keysPressed = {};
let currentScreen = "battle";

window.onload = function () {
  const canvas = document.getElementById("fightCanvas");
  const ctx = canvas.getContext("2d");

  setInterval(() => {
    update();
    render(ctx);
  }, 1000 / 60);

  document.addEventListener("keydown", e => {
    keysPressed[e.key] = true;

    if (e.key === "j" || e.key === "J") {
      if (!player.isAttacking) {
        player.isAttacking = true;
        player.attackFrame = 10;
      }
    }
  });

  document.addEventListener("keyup", e => {
    keysPressed[e.key] = false;
  });
};

function update() {
  if (keysPressed["a"] || keysPressed["A"]) {
    player.x -= 5;
  }
  if (keysPressed["d"] || keysPressed["D"]) {
    player.x += 5;
  }

  // 攻擊動畫 frame 計算
  if (player.isAttacking) {
    player.attackFrame--;
    if (player.attackFrame <= 0) {
      player.isAttacking = false;
    }
  }
}

function render(ctx) {
  ctx.fillStyle = "#1e1230";
  ctx.fillRect(0, 0, 800, 600);

  // 地板線
  ctx.strokeStyle = "#fff";
  ctx.beginPath();
  ctx.moveTo(0, 500);
  ctx.lineTo(800, 500);
  ctx.stroke();

  // 玩家
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);

  // 攻擊揮拳
  if (player.isAttacking) {
    ctx.fillStyle = "orange";
    ctx.fillRect(player.x + player.width, player.y + 15, 20, 20);
  }

  // 假敵人
  ctx.fillStyle = enemy.color;
  ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
}
