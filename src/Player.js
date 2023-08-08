export default function Player({
  playerIsNext,
  player,
  onSetEmoji,
  onSetPlayerName,
}) {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <>
      <div className="emojiPicker">
        <EmojiPicker
          onEmojiClick={(e) => {
            onSetEmoji(player, e.emoji);
            setShowPicker(false);
          }}
          theme="dark"
          preload
        />
      </div>
      <div className={"player-container " + (playerIsNext ? "active" : "")}>
        <div className="player-title-container">
          <h1>
            <button
              className="btn-emoji"
              data-tooltip-id="set-emoji-player"
              data-tooltip-content="Click to set emoji"
              onClick={() => setShowPicker(true)}
            >
              {player1.emoji}
            </button>
          </h1>
          <Tooltip id="set-emoji-player" />
          <input
            type="text"
            value={player.name}
            onChange={(e) => onSetPlayerName(e.target.value)}
            className="player-name"
            data-tooltip-id="set-name-player"
            data-tooltip-content="Click to edit name, press enter to save"
            maxlength="8"
          />
          <Tooltip id="set-name-player" />
        </div>
      </div>
    </>
  );
}
