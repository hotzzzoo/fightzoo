
const characters = [
  {
    name: "脆脆",
    species: "雞脖子戰神",
    weapon: "彈簧脖子"
  },
  {
    name: "魚豆腐",
    species: "火鍋料之神",
    weapon: "雙魚叉"
  },
  {
    name: "滴妹",
    species: "社畜蛞蝓",
    weapon: "報告書 & 咖啡杯"
  },
  {
    name: "胖刺",
    species: "肌肉河豚",
    weapon: "氣爆刺盾"
  },
  {
    name: "馬先生",
    species: "穿西裝的驢",
    weapon: "PPT雷射筆"
  },
  {
    name: "GPT-47",
    species: "神秘 AI",
    weapon: "錯字轟炸"
  }
];

let currentScreen = "intro"; // intro, select, entry
let selectedIndex = 0;
let canvas, ctx;

window.onload = function () {
  canvas = document.getElementById("fightCanvas");
  ctx = canvas.getContext("2d");

  renderIntro();

  document.addEventListener("keydown", function handleKey(e) {
    if (currentScreen === "intro") {
      currentScreen = "select";
      renderCharacterSelect();
    } else if (currentScreen === "select") {
      if (e.key === "ArrowLeft") {
        selectedIndex = (selectedIndex - 1 + characters.length) % characters.length;
        renderCharacterSelect();
      } else if (e.key === "ArrowRight") {
        selectedIndex = (selectedIndex + 1) % characters.length;
        renderCharacterSelect();
      } else if (e.key === "Enter") {
        currentScreen = "entry";
        playEntryAnimation();
      }
    }
  });
};

function renderIntro() {
  ctx.fillStyle = "#2e1f45";
  ctx.fillRect(0, 0, 800, 600);
  ctx.fillStyle = "#fff";
  ctx.font = "32px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("肉搏動物園 測試畫面", 400, 280);
  ctx.font = "20px sans-serif";
  ctx.fillText("請按任意鍵開始互毆戰", 400, 320);
}

function renderCharacterSelect() {
  const c = characters[selectedIndex];
  ctx.fillStyle = "#2e1f45";
  ctx.fillRect(0, 0, 800, 600);
  ctx.fillStyle = "#fff";
  ctx.font = "28px sans-serif";
  ctx.fillText("選擇你的角色", 400, 80);
  ctx.font = "24px sans-serif";
  ctx.fillText("名字：" + c.name, 400, 180);
  ctx.fillText("種族：" + c.species, 400, 230);
  ctx.fillText("武器：" + c.weapon, 400, 280);
  ctx.font = "20px sans-serif";
  ctx.fillText("← → 選擇角色，Enter 確認", 400, 400);
}

function playEntryAnimation() {
  let opacity = 0;
  const interval = setInterval(() => {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, 800, 600);
    opacity += 0.1;
    if (opacity >= 1.0) {
      clearInterval(interval);
      renderEntryScreen();
    }
  }, 50);
}

function renderEntryScreen() {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, 800, 600);
  ctx.fillStyle = "#fff";
  ctx.font = "30px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("角色「" + characters[selectedIndex].name + "」進場中...", 400, 300);

  setTimeout(() => {
    alert("戰鬥開始！(之後會切換戰鬥場景)");
    renderIntro(); // 可以接續到真正場景
    currentScreen = "intro";
  }, 2000);
}
