export default function Animation({ winner }) {
  return (
    <div className="winner">
      {winner.emojis.map((emoji) => {
        return <h1>{emoji}</h1>;
      })}
    </div>
  );
}
