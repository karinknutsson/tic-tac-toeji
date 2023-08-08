import { useState, useEffect } from "react";

export default function Board({
  player1,
  player2,
  player1IsNext,
  setPlayer1IsNext,
}) {
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares, player1, player2)) {
      return;
    }
    const nextSquares = squares.slice();
    if (player1IsNext) {
      nextSquares[i] = player1.emoji;
    } else {
      nextSquares[i] = player2.emoji;
    }
    setSquares(nextSquares);
    setPlayer1IsNext(!player1IsNext);
  }

  function isGameOver() {
    return !squares.some((element) => element === null);
  }

  const winner = calculateWinner(squares, player1, player2);

  if (isGameOver() && !winner) {
    return <h2>Nobody wins!</h2>;
  }

  if (winner) {
    return <h2>{winner.name} wins!</h2>;
  }

  return (
    <>
      <div className="board-container">
        <div className="board-row">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="board-row">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="board-row">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </div>
    </>
  );
}

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function calculateWinner(squares, player1, player2) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (
      player1.emojis.some((element) => element === squares[a]) &&
      player1.emojis.some((element) => element === squares[b]) &&
      player1.emojis.some((element) => element === squares[c])
    ) {
      return player1;
    }

    if (
      player2.emojis.some((element) => element === squares[a]) &&
      player2.emojis.some((element) => element === squares[b]) &&
      player2.emojis.some((element) => element === squares[c])
    ) {
      return player2;
    }
  }

  return null;
}
