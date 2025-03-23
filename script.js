let timer = 60;
let score = 0;

// Preload the winning sound
let winAudio = new Audio("https://www.fesliyanstudios.com/play-mp3/4386");

function makeBubble() {
  let clutter = "";
  for (let i = 1; i <= 136; i++) {
    let calc = Math.floor(Math.random() * 10);
    clutter += `<div class="bubble">${calc}</div>`;
  }
  document.querySelector(".pbtm").innerHTML = clutter;
}

function runTimer() {
  let time = setInterval(function () {
    if (timer > 0) {
      timer--;
      document.getElementById("timer").innerHTML = timer;
    } else {
      clearInterval(time);
      gameOver(); // Ends the game when time is up
    }
  }, 1000);
}

function gameOver() {
  // Clear bubbles and show final score
  document.querySelector(".pbtm").innerHTML = `
    <h1 class="game-over">Game Over</h1>
    <h2 class="final-score">Your Score: ${score}</h2>
  `;

  // Play sound for 5 seconds
  winAudio.play();
  setTimeout(() => winAudio.pause(), 5000);

  // Start confetti
  startConfetti();
}

function getNewHit() {
  document.querySelector("#hitVal").textContent = Math.floor(
    Math.random() * 10
  );
}

function increaseScore() {
  score += 10;
  document.querySelector("#scoreVal").textContent = score;
}

// Confetti function
function startConfetti() {
  let duration = 3 * 1000; // 3 seconds
  let end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 10,
      spread: 70,
      origin: { y: 0.6 },
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

// Bubble Click Handler
document.querySelector(".pbtm").addEventListener("click", function (dets) {
  if (
    Number(dets.target.textContent) ===
    Number(document.getElementById("hitVal").textContent)
  ) {
    increaseScore();
    makeBubble();
    getNewHit();
  }
});

// Initialize Game
makeBubble();
runTimer();
getNewHit();
