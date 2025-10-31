// ---- GIF paths (είναι στον ίδιο φάκελο) ----
const WIN_GIF = "./assets/win1.gif";
const LOSE_GIF = "./assets/looser1.gif";
const TIE_GIF = "./assets/tie.gif";

// ---- State ----
let humanScore = 0;
let computerScore = 0;
const TARGET_WINS = 5;
let gameOver = false;

const resultDiv = document.getElementById("result");
const humanScoreEl = document.getElementById("humanScore");
const computerScoreEl = document.getElementById("computerScore");
const finalGifEl = document.getElementById("finalGif");
const buttons = document.querySelectorAll(".choice");

function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  return choices[Math.floor(Math.random() * choices.length)];
}

function resolveRound(human, computer) {
  if (human === computer) return { outcome: "tie", msg: "It's a DRAW!!" };

  if (human === "rock")
    return computer === "scissors"
      ? { outcome: "win", msg: "Bravo, you beat the computer!" }
      : { outcome: "lose", msg: "I guess the computer is smarter 😘" };

  if (human === "paper")
    return computer === "rock"
      ? { outcome: "win", msg: "Bravo, you beat the computer!" }
      : { outcome: "lose", msg: "I guess the computer is smarter 😘" };

  if (human === "scissors")
    return computer === "paper"
      ? { outcome: "win", msg: "Bravo, you beat the computer!" }
      : { outcome: "lose", msg: "I guess the computer is smarter 😘" };
}

function updateScores() {
  humanScoreEl.textContent = humanScore;
  computerScoreEl.textContent = computerScore;
}

function setButtonsEnabled(enabled) {
  buttons.forEach((b) => (b.disabled = !enabled));
}

function finishGame() {
  gameOver = true;
  setButtonsEnabled(false);

  const src =
    humanScore === computerScore
      ? TIE_GIF
      : humanScore === TARGET_WINS
      ? WIN_GIF
      : LOSE_GIF;

  finalGifEl.src = src;
  finalGifEl.style.display = "block";
}

function resetGame() {
  humanScore = 0;
  computerScore = 0;
  gameOver = false;
  updateScores();
  resultDiv.textContent = "";
  finalGifEl.style.display = "none";
  setButtonsEnabled(true);
}

// ---- Events ----
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (gameOver) return;

    const human = btn.dataset.move; // 'rock' | 'paper' | 'scissors'
    const computer = getComputerChoice();
    const { outcome, msg } = resolveRound(human, computer);

    if (outcome === "win") humanScore += 1;
    if (outcome === "lose") computerScore += 1;

    updateScores();

    resultDiv.textContent =
      `You chose ${human}, computer chose ${computer}.\n${msg}\n` +
      `Score - You: ${humanScore}, Computer: ${computerScore}`;

    if (humanScore === TARGET_WINS || computerScore === TARGET_WINS) {
      const winnerLine =
        humanScore === TARGET_WINS
          ? "\n🎉 You won the game!"
          : "\n💻 Computer wins!";
      resultDiv.textContent += winnerLine;

      finishGame();
    }
  });
});

const startBtn = document.getElementById("start");
if (startBtn) startBtn.addEventListener("click", resetGame);

resetGame();
