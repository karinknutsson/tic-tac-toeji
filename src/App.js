import { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { Tooltip } from 'react-tooltip'

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

function PlayerPicker({ hidePicker }) {

	if (hidePicker) {
		return null;
	}

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

	let hidePicker1 = true;
	let hidePicker2 = true;

  	return (
  		<>
			<div className="main-container">
				<div className="player-container">
					<div className="player-title-container">
						<h1><button className="btn-emoji" data-tooltip-id="set-emoji-player1" data-tooltip-content="Click to set emoji">{player1}</button></h1>
						<Tooltip id="set-emoji-player1" />
						<h2><a data-tooltip-id="set-name-player1" data-tooltip-content="Click to edit name">Player 1</a></h2>
						<Tooltip id="set-name-player1" />
 				    </div>
					<PlayerPicker hidePicker={hidePicker1} />
				</div>
				<div className="board-container">
					<Board player1={player1} player2={player2} player1IsNext={player1IsNext} setPlayer1IsNext={setPlayer1IsNext} />
				</div>
				<div className="player-container">
					<h1>{player2} Player 2</h1>
					<PlayerPicker hidePicker={hidePicker2} />
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
