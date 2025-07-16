const firstpage = document.getElementById("first-page");
const board = document.getElementsByClassName("board")[0];
const inputplayer1 = document.getElementById("player1");
const inputplayer2 = document.getElementById("player2");
const message = document.getElementsByClassName("message")[0];
const grid = document.getElementsByClassName("grid")[0];
const button = document.getElementById("submit");

let player1 = "";
let player2 = "";
let turn = "";
let currText = "x";
let winner = null;

// 3x3 result matrix
let res = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""]
];

// Verify if any player has won
const verifyResult = (res) => {
  // Rows
  for (let i = 0; i < 3; i++) {
    if (res[i][0] && res[i][0] === res[i][1] && res[i][1] === res[i][2]) {
      return { value: res[i][0] };
    }
  }
  // Columns
  for (let j = 0; j < 3; j++) {
    if (res[0][j] && res[0][j] === res[1][j] && res[1][j] === res[2][j]) {
      return { value: res[0][j] };
    }
  }
  // Diagonals
  if (res[0][0] && res[0][0] === res[1][1] && res[1][1] === res[2][2]) {
    return { value: res[0][0] };
  }
  if (res[0][2] && res[0][2] === res[1][1] && res[1][1] === res[2][0]) {
    return { value: res[0][2] };
  }
  return null;
};

// Start Game
function handleClickStart() {
  player1 = inputplayer1.value.trim();
  player2 = inputplayer2.value.trim();

  if (!player1 || !player2) {
    alert("Both player names are required!");
    return;
  }

  firstpage.style.display = "none";
  board.style.display = "block";
  currText = "x";
  turn = player1;
  winner = null;

  // Clear previous game state
  res = [["", "", ""], ["", "", ""], ["", "", ""]];
  Array.from(grid.children).forEach((div) => {
    div.innerText = "";
    div.style.pointerEvents = "auto";
  });

  message.innerText = `${turn}, you're up`;
}

// Handle click on grid cell
function handleDivClick(div) {
  if (div.innerText !== "" || winner !== null) return;

  div.innerText = currText;
  const index = Number(div.id) - 1;
  const row = Math.floor(index / 3);
  const col = index % 3;

  res[row][col] = currText;

  const final = verifyResult(res);

  if (final && final.value !== undefined) {
    message.innerText = `${turn} congratulations you won!`;
    winner = final.value;
    // Disable all cells
    Array.from(grid.children).forEach((cell) => {
      cell.style.pointerEvents = "none";
    });
    return;
  }

  // Toggle turn
  turn = turn === player1 ? player2 : player1;
  currText = currText === "x" ? "o" : "x";
  message.innerText = `${turn}, you're up`;
}

button.onclick = handleClickStart;

// Bind all grid cell clicks
Array.from(grid.children).forEach((div) => {
  div.addEventListener("click", () => handleDivClick(div));
});
