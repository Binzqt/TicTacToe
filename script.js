const board = document.getElementById("board");
const resetButton = document.getElementById("resetButton");
const currentPlayerDisplay = document.getElementById("currentPlayer");
const toggleMode = document.getElementById("toggleMode");
const resetModal = document.getElementById("resetModal");
const yesButton = resetModal.querySelector(".yes");
const noButton = resetModal.querySelector(".no");
let currentPlayer = "X";
let isDarkMode = true;
const root = document.documentElement;

function updateTheme(isDark) {
  if (isDark) {
    root.style.setProperty("--bg-color", "#1d1d1d");
    root.style.setProperty("--text-color", "#ffffff");
    root.style.setProperty("--modal-bg", "#333");
    root.style.setProperty("--modal-text", "#ffffff");
    root.style.setProperty("--border-color", "#000");
    toggleMode.classList.remove("light");
    toggleMode.classList.add("dark");
  } else {
    root.style.setProperty("--bg-color", "#ffffff");
    root.style.setProperty("--text-color", "#000000");
    root.style.setProperty("--modal-bg", "#ffffff");
    root.style.setProperty("--modal-text", "#000000");
    root.style.setProperty("--border-color", "#000");
    toggleMode.classList.remove("dark");
    toggleMode.classList.add("light");
  }
}

for (let i = 0; i < 9; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.addEventListener("click", () => handleCellClick(cell));
  board.appendChild(cell);
}

function handleCellClick(cell) {
  if (cell.textContent || cell.classList.contains("taken")) return;

  cell.textContent = currentPlayer;
  cell.classList.add("taken", currentPlayer.toLowerCase());

  if (checkWin(currentPlayer)) {
    showVictoryMessage(currentPlayer);
    return;
  }

  if (isDraw()) {
    showDrawMessage();
    return;
  }
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateCurrentPlayerDisplay();
}

function updateCurrentPlayerDisplay() {
  currentPlayerDisplay.textContent = `Current Player: ${currentPlayer}`;
}

function checkWin(player) {
  const cells = document.querySelectorAll(".cell");
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winPatterns.some((pattern) =>
    pattern.every((index) => cells[index].textContent === player)
  );
}

function isDraw() {
  return [...document.querySelectorAll(".cell")].every(
    (cell) => cell.textContent
  );
}

function resetGame() {
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.textContent = "";
    cell.className = "cell";
  });
  currentPlayer = "X";
  updateCurrentPlayerDisplay();
}

resetButton.addEventListener("click", () => {
  resetModal.style.display = "block";
});

yesButton.addEventListener("click", () => {
  resetGame();
  resetModal.style.display = "none";
});

noButton.addEventListener("click", () => {
  resetModal.style.display = "none";
});

toggleMode.addEventListener("click", () => {
  isDarkMode = !isDarkMode;
  updateTheme(isDarkMode);
});

updateTheme(isDarkMode);

function showVictoryMessage(player) {
  const victoryModal = document.createElement("div");
  victoryModal.classList.add("victory-modal");

  if (player === "X") {
    victoryModal.classList.add("x");
  } else if (player === "O") {
    victoryModal.classList.add("o");
  }

  const victoryMessage = document.createElement("p");
  victoryMessage.classList.add("victory-message");
  victoryMessage.textContent = `${player} Wins! 🎉`;
  victoryModal.appendChild(victoryMessage);

  const backButton = document.createElement("button");
  backButton.classList.add("back-button");
  backButton.textContent = "Back";
  victoryModal.appendChild(backButton);

  document.body.appendChild(victoryModal);

  setTimeout(() => {
    victoryModal.style.display = "block";

    backButton.addEventListener("click", () => {
      resetGame();
      document.body.removeChild(victoryModal);
    });
  }, 500);
}

function showDrawMessage() {
  const drawModal = document.createElement("div");
  drawModal.classList.add("draw-modal");

  drawModal.classList.add("draw");

  const drawMessage = document.createElement("p");
  drawMessage.classList.add("draw-message");
  drawMessage.textContent = "It's a Draw! 😐";
  drawModal.appendChild(drawMessage);

  const backButton = document.createElement("button");
  backButton.classList.add("back-button");
  backButton.textContent = "Back";
  drawModal.appendChild(backButton);

  document.body.appendChild(drawModal);

  setTimeout(() => {
    drawModal.style.display = "block";

    backButton.addEventListener("click", () => {
      resetGame();
      document.body.removeChild(drawModal);
    });
  }, 500);
}

const style = document.createElement("style");
style.innerHTML = `
        .draw-modal {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 20px;
            width: 300px;
            text-align: center;
            font-family: "Press Start 2P", cursive;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.7);
            border: 4px solid #000;
            font-size: 1.2rem;
            z-index: 1000;
            opacity: 0;
            animation: fadeInModal 0.5s forwards;
        }

        @keyframes fadeInModal {
            0% {
                opacity: 0;
            }
            100% {
                opacity: 1;
            }
        }

        .draw-modal .draw-message {
            font-size: 1.5rem;
            margin-bottom: 20px;
        }

        .draw-modal .back-button {
            padding: 10px 20px;
            border: none;
            font-family: "Press Start 2P", cursive;
            font-size: 1.1rem;
            cursor: pointer;
            width: 80%;
            margin-top: 10px;
            transition: background-color 0.2s;
        }

        .draw-modal .back-button:hover {
            opacity: 0.8;
        }

        .draw-modal.draw {
            background-color: #ffcc00; /* Yellow for draw */
        }

        .draw-background {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: -1;
            opacity: 0;
            animation: fadeInBackground 1s forwards;
            background-color: #ffcc00; /* Yellow for draw */
        }

        @keyframes fadeInBackground {
            0% {
                opacity: 0;
            }
            100% {
                opacity: 0.5;
            }
        }
    `;
document.head.appendChild(style);

toggleMode.addEventListener("click", () => {
  isDarkMode = !isDarkMode;
  updateTheme(isDarkMode);
});

updateTheme(isDarkMode);
