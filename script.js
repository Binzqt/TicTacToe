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
  if (checkWin()) {
    setTimeout(() => alert(`${currentPlayer} wins!`), 100);
    resetGame();
    return;
  }
  if (isDraw()) {
    setTimeout(() => alert(`It's a draw!`), 100);
    resetGame();
    return;
  }
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateCurrentPlayerDisplay();
}

function updateCurrentPlayerDisplay() {
  currentPlayerDisplay.textContent = `Current Player: ${currentPlayer}`;
}

function checkWin() {
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
    pattern.every((index) => cells[index].textContent === currentPlayer)
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
