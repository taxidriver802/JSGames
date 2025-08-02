export const getPositionClass = (i) => {
  const top = i < 3 ? 'top' : '';
  const bottom = i >= 6 ? 'bottom' : '';
  const left = i % 3 === 0 ? 'left' : '';
  const right = i % 3 === 2 ? 'right' : '';
  return `${top} ${bottom} ${left} ${right}`.trim();
};

export const checkWinner = (board) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // cols
    [0, 4, 8],
    [2, 4, 6], // diagonals
  ];

  for (let [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]; // 'X' or 'O'
    }
  }

  return null;
};

export const getCpuMove = (board) => {
  const emptyIndices = board
    .map((v, i) => (v ? null : i))
    .filter((v) => v !== null);
  return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
};
