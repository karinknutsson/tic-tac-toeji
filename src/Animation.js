export default function Animation({ winner }) {
  if (!winner) {
    return;
  } else {
    console.log(winner);
    return (
      <div className="winner">
        {winner.emojis.map((emoji) => {
          return <h1>{emoji}</h1>;
        })}
      </div>
    );
  }
}
