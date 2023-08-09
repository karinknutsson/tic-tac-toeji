import { useState } from "react";
import Animation from "./Animation.js";
import Player from "./Player.js";
import Board from "./Board.js";
import Modal from "./Modal.js";

const emojiInUseMessage = "Pick an emoji that is not in use";
const nobodyWinsMessage = "Nobody wins";

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
  const [winner, setWinner] = useState(undefined);
  const [modalContent, setModalContent] = useState("");

  const handleSetEmoji = (player, emoji) => {
    if (player.id === 1) {
      if (player2.emojis.findIndex((element) => element === emoji) === -1) {
        setPlayer1({
          ...player,
          emoji: emoji,
          emojis: [...player.emojis, emoji],
        });
      } else {
        setModalContent(emojiInUseMessage);
      }
    } else {
      if (player1.emojis.findIndex((element) => element === emoji) === -1) {
        setPlayer2({
          ...player,
          emoji: emoji,
          emojis: [...player.emojis, emoji],
        });
      } else {
        setModalContent(emojiInUseMessage);
      }
    }
  };

  return (
    <>
      <Animation winner={winner} />
      <Modal content={modalContent} onCloseModal={() => setModalContent("")} />
      <div className="main">
        <div className="game-container">
          <Player
            playerIsNext={player1IsNext}
            player={player1}
            onSetEmoji={handleSetEmoji}
            onSetPlayerName={(e) => setPlayer1({ ...player1, name: e })}
          />

          <Board
            player1={player1}
            player2={player2}
            player1IsNext={player1IsNext}
            setPlayer1IsNext={setPlayer1IsNext}
            noWinner={() => setModalContent(nobodyWinsMessage)}
            gameWon={(winner) => setWinner(winner)}
          />

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
