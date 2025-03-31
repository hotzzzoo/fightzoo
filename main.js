window.onload = function () {
  const canvas = document.getElementById("fightCanvas");
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#2e1f45";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#fff";
  ctx.font = "32px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("肉搏動物園 測試畫面", canvas.width / 2, canvas.height / 2 - 20);
  ctx.font = "20px sans-serif";
  ctx.fillText("請按任意鍵開始互毆戰", canvas.width / 2, canvas.height / 2 + 30);
};