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

	const winner = calculateWinner(squares);

	if (isGameOver() && !winner) {
		return <Modal content={"No winner"} setModalContent={() => ""} />;
	}

	return (
		<>
			<div className="board">
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

function PlayerPicker({ hidePicker, setEmoji, player }) {

	if (hidePicker) {
		return null;
	}

	function handleOnEmoji(e) {
		setEmoji(e.emoji);
	}

	return (
		<>
			<div><EmojiPicker onEmojiClick={(e) => setEmoji(player, e.emoji)} lazyLoadEmojis="false" theme="dark" /></div>
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
					<p>
						{content}
					</p>
					<button className="btn-modal" onClick={() => setModalContent("")}>OK</button>
				</div>
			</div>
		</>
	);
}

export default function App() {
	const [player1, setPlayer1] = useState({id: 1, emoji: '🦊'});
	const [player2, setPlayer2] = useState({id: 2, emoji: '🐰'});
	const [player1IsNext, setPlayer1IsNext] = useState(true);
	const [hidePicker1, setHidePicker1] = useState(true);
	const [hidePicker2, setHidePicker2] = useState(true);
	const [showModal, setShowModal] = useState(false);
	const [modalContent, setModalContent] = useState("Some content");

	function showPicker(player) {
		if (player.id === player1.id) {
			setHidePicker1(!hidePicker1);
		} else {
			setHidePicker2(!hidePicker2);
		}
	}

	const setEmoji = (player, emoji) => {
		if (player.id === 1) {
			if (emoji !== player2.emoji) {
				setPlayer1({id: 1, emoji: emoji});
			} else {
				setModalContent("Please pick an emoji that is not already in use");
			}
			setHidePicker1(!hidePicker1);
		} else {
			if (emoji !== player1.emoji) {
				setPlayer2({id: 2, emoji: emoji});
			} else {
				setModalContent("Please pick an emoji that is not already in use");
			}
			setHidePicker2(!hidePicker2);
		}
	}

  	return (
  		<>
			<Modal content={modalContent} setModalContent={setModalContent}/>
			<div className="main">
				<h1>T I C - T A C - T O E J I</h1>
				<div className="main-container">
					<div className={"player-container " + (player1IsNext ? "active" : "")}>
						<div className="player-title-container">
							<h1>
								<button
									className="btn-emoji"
									data-tooltip-id="set-emoji-player1"
									data-tooltip-content="Click to set emoji"
									onClick={() => showPicker(player1)}
								>
									{player1.emoji}
								</button>
							</h1>
							<Tooltip id="set-emoji-player1" />
							<h2><a data-tooltip-id="set-name-player1" data-tooltip-content="Click to edit name">Player 1</a></h2>
							<Tooltip id="set-name-player1" />
	 				    </div>
						<PlayerPicker hidePicker={hidePicker1} setEmoji={setEmoji} player={player1}/>
					</div>
					<div className="board-container">
						<Board
							player1={player1}
							player2={player2}
							player1IsNext={player1IsNext}
							setPlayer1IsNext={setPlayer1IsNext}
							//setModalContent={setModalContent}
						/>
					</div>
					<div className={"player-container " + (!player1IsNext ? "active" : "")}>
						<div className="player-title-container">
							<h1>
								<button
									className="btn-emoji"
									data-tooltip-id="set-emoji-player1"
									data-tooltip-content="Click to set emoji"
									onClick={() => showPicker(player2)}
								>
									{player2.emoji}
								</button>
							</h1>
							<Tooltip id="set-emoji-player2" />
							<h2><a data-tooltip-id="set-name-player2" data-tooltip-content="Click to edit name">Player 2</a></h2>
							<Tooltip id="set-name-player2" />
	 				    </div>
						<PlayerPicker hidePicker={hidePicker2} setEmoji={setEmoji} player={player2}/>
					</div>
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
