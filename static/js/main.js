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

let currentScreen = "intro"; // intro, select
let selectedIndex = 0;

window.onload = function () {
  const canvas = document.getElementById("fightCanvas");
  const ctx = canvas.getContext("2d");

  renderIntro(ctx);

  document.addEventListener("keydown", function handleKey(e) {
    if (currentScreen === "intro") {
      currentScreen = "select";
      renderCharacterSelect(ctx);
    } else if (currentScreen === "select") {
      if (e.key === "ArrowLeft") {
        selectedIndex = (selectedIndex - 1 + characters.length) % characters.length;
        renderCharacterSelect(ctx);
      } else if (e.key === "ArrowRight") {
        selectedIndex = (selectedIndex + 1) % characters.length;
        renderCharacterSelect(ctx);
      } else if (e.key === "Enter") {
        alert("你選擇了「" + characters[selectedIndex].name + "」，即將進入戰鬥！");
      }
    }
  });
};

function renderIntro(ctx) {
  ctx
