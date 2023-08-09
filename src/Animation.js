export default function Animation({ winner }) {
  if (!winner) {
    return;
  } else {
    return (
      <div className="winner">
        {winner.emojis.map((emoji) => (
          <h1>emoji</h1>
        ))}
      </div>
    );
  }
}
