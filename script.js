//your JS code here. If required.
const submitBtn = document.getElementById("submit");
  const playerForm = document.getElementById("playerForm");
  const gameBoard = document.getElementById("gameBoard");
  const messageDiv = document.getElementById("message");
  const board = document.getElementById("board");

  let players = {};
  let currentPlayer = 'X';
  let gameOver = false;
  let boardState = Array(9).fill(null); // 0-indexed

  const winCombos = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // cols
    [0,4,8], [2,4,6]           // diagonals
  ];

  submitBtn.addEventListener('click', () => {
    const p1 = document.getElementById("player-1").value.trim();
    const p2 = document.getElementById("player-2").value.trim();

    if (p1 === "" || p2 === "") {
      alert("Please enter both player names.");
      return;
    }

    players = { X: p1, O: p2 };
    messageDiv.textContent = `${players[currentPlayer]}, you're up`;
    playerForm.style.display = "none";
    gameBoard.style.display = "block";
  });

  board.addEventListener('click', (e) => {
    const cell = e.target;
    const index = parseInt(cell.id) - 1;

    if (!cell.classList.contains("cell") || boardState[index] || gameOver) return;

    cell.textContent = currentPlayer;
    boardState[index] = currentPlayer;

    if (checkWinner(currentPlayer)) {
      messageDiv.textContent = `${players[currentPlayer]}, congratulations you won!`;
      gameOver = true;
    } else if (boardState.every(cell => cell)) {
      messageDiv.textContent = `It's a draw!`;
      gameOver = true;
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      messageDiv.textContent = `${players[currentPlayer]}, you're up`;
    }
  });

  function checkWinner(player) {
    return winCombos.some(combo =>
      combo.every(index => boardState[index] === player)
    );
  }