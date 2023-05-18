import { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
//import { Theme } from 'emoji-picker-react';

function Square({ value, onSquareClick }) {
	return (
		<button className="square" onClick={onSquareClick}>
			{value}
		</button>
	);
}

function Board({ player1, player2, player1IsNext, setPlayer1IsNext }) {
	const [squares, setSquares] = useState(Array(9).fill(null));

	function handleClick(i) {
		if (squares[i] || calculateWinner(squares)) {
			return;
		}
		const nextSquares = squares.slice();
		if (player1IsNext) {
			nextSquares[i] = player1;
		} else {
			nextSquares[i] = player2;
		}
		setSquares(nextSquares);
		setPlayer1IsNext(!player1IsNext);
	}

	const winner = calculateWinner(squares);
	let status;
	if (winner) {
		status = 'Winner: ' + winner;
	} else {
		status = 'Next player: ' + (player1IsNext ? player1 : player2);
	}

	return (
		<>
			<div className="status">{status}</div>
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

function PlayerPicker() {

	function handleOnEmoji(e) {
		console.log(e);
	}

	return (
		<>
			<div><EmojiPicker onEmojiClick={handleOnEmoji} theme='dark' /></div>
		</>
	);
}

export default function App() {
	const [player1IsNext, setPlayer1IsNext] = useState(true);

	let player1 = '🦊';
	let player2 = '🐰';

  	return (
  		<>
			<div className="main-container">
				<div className="player-container">
					<h1>Player 1</h1>
					<PlayerPicker />
				</div>
				<div className="board-container">
					<Board player1={player1} player2={player2} player1IsNext={player1IsNext} setPlayer1IsNext={setPlayer1IsNext} />
				</div>
				<div className="player-container">
					<h1>Player 2</h1>
					<PlayerPicker />
				</div>
			</div>
		</>
	);
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
