import type { President } from "../data/presidents";

type Props = {
  president: President;
  onClose?: () => void;
  showSwipeHint?: boolean;
};

export default function FunFacts({ president, onClose, showSwipeHint = true }: Props) {
  const hasCrimes =
    president.Slavery ||
    president.Genocide ||
    president["War Crimes"] ||
    president.Rape ||
    president.Corruption;

  return (
    <div className="funFacts" onClick={onClose}>
      <div className="imgContainer">
        <img src={`/presidents/${president.Number}.jpg`} alt={president.President} />
      </div>
      <h2>
        #{president.Number}: {president.President}
        <span>Lived {president.Lived}</span>
        <span>In office {president["In Office"]}</span>
      </h2>
      <h3>Pros:</h3>
      <p>{president.Pros}</p>
      <h3>Cons:</h3>
      <p>{president.Cons}</p>
      <h3>Fun facts:</h3>
      <p>{president["Fun fact"]}</p>
      {president.Tweets && (
        <p>
          <a href={president.Tweets} target="_blank" rel="noreferrer">
            A Twitter thread about {president.President}
          </a>
          .
        </p>
      )}
      <div className="crimeList">
        <h3>Crime report</h3>
        {hasCrimes ? (
          <ul>
            {president.Slavery && <li>😡 Owned slaves</li>}
            {president.Genocide && <li>😡 Genocide</li>}
            {president["War Crimes"] && <li>😡 War crimes</li>}
            {president.Rape && <li>😡 Sexual assault</li>}
            {president.Corruption && <li>😡 Corruption</li>}
          </ul>
        ) : (
          <p>No known crimes!</p>
        )}
      </div>
      {onClose && (
        <button className="closeCTA" onClick={onClose}>
          Close
        </button>
      )}
      {showSwipeHint && (
        <p className="swipeInstructions">
          You can swipe left or right or use arrow keys to move between presidents.
        </p>
      )}
    </div>
  );
}
