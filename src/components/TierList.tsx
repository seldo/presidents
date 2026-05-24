import { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import type { President } from "../data/presidents";
import FunFacts from "./FunFacts";

type Props = {
  presidents: President[];
  tierOrder: readonly string[];
};

const HOME_TITLE = "US Presidents, Ranked";

function urlForPresident(p: President) {
  return `/president/${p.Number}`;
}

function titleForPresident(p: President) {
  return `${p.President} — ${p.Tier} — ${HOME_TITLE}`;
}

export default function TierList({ presidents, tierOrder }: Props) {
  const tiers: Record<string, President[]> = {};
  presidents.forEach((p) => {
    (tiers[p.Tier] ||= []).push(p);
  });

  const findByNumber = (num: string) =>
    presidents.findIndex((p) => p.Number === num);

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const drawerOpen = selectedIndex !== null;
  const selected = drawerOpen ? presidents[selectedIndex!] : null;

  // On mount, if URL already points to a president, open the drawer.
  // Also wire up popstate so browser back/forward syncs the drawer.
  useEffect(() => {
    const syncFromUrl = () => {
      const match = window.location.pathname.match(/^\/president\/(\d+)\/?$/);
      if (match) {
        const idx = findByNumber(match[1]);
        setSelectedIndex(idx >= 0 ? idx : null);
      } else {
        setSelectedIndex(null);
      }
    };
    syncFromUrl();
    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, []);

  // Update document title to match drawer state.
  useEffect(() => {
    document.title = selected ? titleForPresident(selected) : HOME_TITLE;
  }, [selected]);

  const openAt = (idx: number) => {
    setSelectedIndex(idx);
    const p = presidents[idx];
    window.history.pushState({ presidentNumber: p.Number }, "", urlForPresident(p));
  };

  const close = () => {
    setSelectedIndex(null);
    window.history.pushState({}, "", "/");
  };

  const advance = (direction: "back" | "forward") => {
    if (selectedIndex === null) return;
    const next =
      direction === "back"
        ? (selectedIndex - 1 + presidents.length) % presidents.length
        : (selectedIndex + 1) % presidents.length;
    setSelectedIndex(next);
    const p = presidents[next];
    // replaceState so rapid prev/next doesn't pollute history
    window.history.replaceState({ presidentNumber: p.Number }, "", urlForPresident(p));
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => advance("forward"),
    onSwipedRight: () => advance("back"),
  });

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "ArrowLeft") advance("back");
      else if (e.code === "ArrowRight") advance("forward");
      else if (e.code === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawerOpen, selectedIndex]);

  const toRoman = (n: number) => ["I", "II", "III", "IV", "V", "VI", "VII"][n] ?? "";

  return (
    <>
      <ol className="tiersList">
        {tierOrder.map((tier, tierIdx) => (
          <li key={tier}>
            <div className="tierLabel">
              <span className="roman">{toRoman(tierIdx)}</span>
              <h2>{tier}</h2>
            </div>
            <ol className="presidentList">
              {(tiers[tier] || []).map((president) => {
                const idx = presidents.indexOf(president);
                return (
                  <li key={president.Number}>
                    <a
                      href={urlForPresident(president)}
                      onClick={(e) => {
                        // Let modifier-clicks (cmd/ctrl/middle-click) open in a new tab
                        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
                        e.preventDefault();
                        openAt(idx);
                      }}
                    >
                      <div className="card">
                        <div className="imgHolder">
                          <img
                            src={`/presidents/${president.Number}.jpg`}
                            alt={president.President}
                          />
                        </div>
                        <div className="name">{president.President}</div>
                        <div className="meta">#{president.Number} · {president["In Office"]}</div>
                      </div>
                    </a>
                  </li>
                );
              })}
            </ol>
          </li>
        ))}
      </ol>

      <div
        className={`drawerBackdrop ${drawerOpen ? "open" : ""}`}
        onClick={close}
      />
      <aside
        className={`drawerPanel ${drawerOpen ? "open" : ""}`}
        {...swipeHandlers}
        aria-hidden={!drawerOpen}
      >
        {selected && (
          <FunFacts
            president={selected}
            onClose={close}
            onPrev={() => advance("back")}
            onNext={() => advance("forward")}
          />
        )}
      </aside>
    </>
  );
}
