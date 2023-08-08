import { useState } from "react";

import Player from "./Player.js";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({
  player1,
  player2,
  player1IsNext,
  setPlayer1IsNext,
  setModalContent,
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
    setSquares(Array(9).fill(null));
    return;
  }

  return (
    <>
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
    </>
  );
}

function Modal({ content, setModalContent }) {
  if (!content) {
    return;
  }

  return (
    <>
      <div className="modal" onClick={() => setModalContent("")}>
        <div className="modal-content">
          <p>{content}</p>
          <button className="btn-modal" onClick={() => setModalContent("")}>
            OK
          </button>
        </div>
      </div>
    </>
  );
}

export default function App() {
  const [player1, setPlayer1] = useState({
    id: 1,
    emoji: "🦊",
    name: "Player 1",
    emojis: ["🦊"],
  });
  const [player2, setPlayer2] = useState({
    id: 2,
    emoji: "🐰",
    name: "Player 2",
    emojis: ["🐰"],
  });
  const [player1IsNext, setPlayer1IsNext] = useState(true);
  const [hidePicker1, setHidePicker1] = useState(true);
  const [hidePicker2, setHidePicker2] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const handleSetEmoji = (player, emoji) => {
    if (player.id === 1) {
      if (player2.emojis.findIndex((element) => element === emoji) === -1) {
        setPlayer1({
          id: 1,
          emoji: emoji,
          name: player.name,
          emojis: [...player.emojis, emoji],
        });
      } else {
        setModalContent("Pick an emoji that is not already in use");
      }
      setHidePicker1(!hidePicker1);
    } else {
      if (player1.emojis.findIndex((element) => element === emoji) === -1) {
        setPlayer2({
          id: 2,
          emoji: emoji,
          name: player.name,
          emojis: [...player.emojis, emoji],
        });
      } else {
        setModalContent("Pick an emoji that is not already in use");
      }
      setHidePicker2(!hidePicker2);
    }
  };

  return (
    <>
      <Modal content={modalContent} setModalContent={setModalContent} />
      <div className="main">
        <div className="main-container">
          <Player
            playerIsNext={player1IsNext}
            player={player1}
            onSetEmoji={handleSetEmoji}
            onSetPlayerName={(e) => setPlayer1({ ...player1, name: e })}
          />

          <div className="board-container">
            <Board
              player1={player1}
              player2={player2}
              player1IsNext={player1IsNext}
              setPlayer1IsNext={setPlayer1IsNext}
            />
          </div>

          <Player
            playerIsNext={!player1IsNext}
            player={player2}
            onSetEmoji={handleSetEmoji}
            onSetPlayerName={(e) => setPlayer2({ ...player2, name: e })}
          />
        </div>
      </div>
    </>
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
