
// === 肉搏動物園：可玩版 main.js ===
// 含首頁 → 選角 → 進場 → 單人戰鬥（可攻擊敵人）

const characters = [
  { name: "脆脆", color: "red" },
  { name: "魚豆腐", color: "orange" },
  { name: "滴妹", color: "purple" },
  { name: "胖刺", color: "green" },
  { name: "馬先生", color: "blue" },
  { name: "deek 87", color: "cyan" }
];

let canvas, ctx;
let currentScreen = "intro";
let selectedIndex = 0;
let player, enemy;
let keys = {};

window.onload = () => {
  canvas = document.getElementById("fightCanvas");
  ctx = canvas.getContext("2d");
  renderIntro();
  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("keyup", (e) => (keys[e.key] = false));
};

function handleKeyDown(e) {
  keys[e.key] = true;
  if (currentScreen === "intro") {
    currentScreen = "select";
    renderSelect();
  } else if (currentScreen === "select") {
    if (e.key === "ArrowLeft") {
      selectedIndex = (selectedIndex - 1 + characters.length) % characters.length;
      renderSelect();
    } else if (e.key === "ArrowRight") {
      selectedIndex = (selectedIndex + 1) % characters.length;
      renderSelect();
    } else if (e.key === "Enter") {
      playEntryAnimation();
    }
  }
}

function renderIntro() {
  ctx.fillStyle = "#1e1230";
  ctx.fillRect(0, 0, 800, 600);
  ctx.fillStyle = "#fff";
  ctx.font = "32px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("肉搏動物園 測試畫面", 400, 280);
  ctx.font = "20px sans-serif";
  ctx.fillText("請按任意鍵開始互毆戰", 400, 320);
}

function renderSelect() {
  const c = characters[selectedIndex];
  ctx.fillStyle = "#1e1230";
  ctx.fillRect(0, 0, 800, 600);
  ctx.fillStyle = "#fff";
  ctx.font = "28px sans-serif";
  ctx.fillText("選擇你的角色", 400, 80);
  ctx.font = "24px sans-serif";
  ctx.fillText("名字：" + c.name, 400, 180);
  ctx.fillText("顏色：" + c.color, 400, 230);
  ctx.font = "20px sans-serif";
  ctx.fillText("← → 選擇角色，Enter 確認", 400, 400);
}

function playEntryAnimation() {
  currentScreen = "entry";
  let opacity = 0;
  const fade = setInterval(() => {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, 800, 600);
    opacity += 0.1;
    if (opacity >= 1.0) {
      clearInterval(fade);
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, 800, 600);
      ctx.fillStyle = "#fff";
      ctx.font = "30px sans-serif";
      ctx.fillText("角色「" + characters[selectedIndex].name + "」進場中...", 400, 300);
      setTimeout(startBattle, 1500);
    }
  }, 50);
}

function startBattle() {
  currentScreen = "battle";
  player = {
    x: 100, y: 450, width: 50, height: 50,
    color: characters[selectedIndex].color,
    hp: 100, cooldown: 0
  };
  enemy = {
    x: 600, y: 450, width: 50, height: 50,
    color: "gray", hp: 100
  };
  setInterval(() => {
    if (currentScreen === "battle") {
      update(); render();
    }
  }, 1000 / 60);
}

function update() {
  if (keys["a"] || keys["A"]) player.x -= 5;
  if (keys["d"] || keys["D"]) player.x += 5;
  if ((keys["j"] || keys["J"]) && player.cooldown <= 0) {
    if (player.x + player.width >= enemy.x && player.x <= enemy.x + enemy.width) {
      enemy.hp -= 10;
      player.cooldown = 30;
    }
  }
  if (player.cooldown > 0) player.cooldown--;
}

function render() {
  ctx.fillStyle = "#1e1230";
  ctx.fillRect(0, 0, 800, 600);
  ctx.strokeStyle = "#fff";
  ctx.beginPath();
  ctx.moveTo(0, 500);
  ctx.lineTo(800, 500);
  ctx.stroke();

  // HP Bar
  ctx.fillStyle = "#f00";
  ctx.fillRect(50, 30, player.hp * 2, 20);
  ctx.fillStyle = "#aaa";
  ctx.fillRect(550, 30, enemy.hp * 2, 20);

  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
  ctx.fillStyle = enemy.color;
  ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);

  if (enemy.hp <= 0) {
    ctx.fillStyle = "#fff";
    ctx.font = "40px sans-serif";
    ctx.fillText("你贏了！", 400, 300);
    currentScreen = "done";
  }
}
// Final game logic will be inserted here
