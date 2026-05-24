import type { President } from "../data/presidents";

type Props = {
  president: President;
  onClose?: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  showSwipeHint?: boolean;
};

export default function FunFacts({ president, onClose, onPrev, onNext, showSwipeHint = true }: Props) {
  const hasCrimes =
    president.Slavery ||
    president.Genocide ||
    president["War Crimes"] ||
    president.Rape ||
    president.Corruption;

  return (
    <div className="funFacts">
      {(onPrev || onNext || onClose) && (
        <div className="drawerNav">
          {onPrev ? (
            <button
              className="navBtn"
              onClick={onPrev}
              aria-label="Previous president"
            >
              ← Prev
            </button>
          ) : (
            <span />
          )}
          {onClose && (
            <button
              className="navBtn closeBtn"
              onClick={onClose}
              aria-label="Close"
            >
              Close
            </button>
          )}
          {onNext ? (
            <button
              className="navBtn"
              onClick={onNext}
              aria-label="Next president"
            >
              Next →
            </button>
          ) : (
            <span />
          )}
        </div>
      )}
      <div className="imgContainer">
        <img src={`/presidents/${president.Number}.jpg`} alt={president.President} />
      </div>
      <h2>
        <span className="num">№ {president.Number}</span>
        {president.President}
      </h2>
      <div className="lifespan">
        {president.Lived && <span>Lived {president.Lived}</span>}
        {president.Lived && president["In Office"] && <span>·</span>}
        {president["In Office"] && <span>In office {president["In Office"]}</span>}
      </div>
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
      {showSwipeHint && (
        <p className="swipeInstructions">
          Use the buttons above, swipe, or arrow keys to move between presidents.
        </p>
      )}
    </div>
  );
}
