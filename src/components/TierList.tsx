import { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import type { President } from "../data/presidents";
import FunFacts from "./FunFacts";

type Props = {
  presidents: President[];
  tierOrder: readonly string[];
};

export default function TierList({ presidents, tierOrder }: Props) {
  const tiers: Record<string, President[]> = {};
  presidents.forEach((p) => {
    (tiers[p.Tier] ||= []).push(p);
  });

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const drawerOpen = selectedIndex !== null;
  const selected = drawerOpen ? presidents[selectedIndex!] : null;

  const close = () => setSelectedIndex(null);

  const advance = (direction: "back" | "forward") => {
    if (selectedIndex === null) return;
    const next =
      direction === "back"
        ? (selectedIndex - 1 + presidents.length) % presidents.length
        : (selectedIndex + 1) % presidents.length;
    setSelectedIndex(next);
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

  return (
    <>
      <ol className="tiersList">
        {tierOrder.map((tier) => (
          <li key={tier}>
            <h2>{tier}</h2>
            <ol className="presidentList">
              {(tiers[tier] || []).map((president) => {
                const idx = presidents.indexOf(president);
                return (
                  <li key={president.Number}>
                    <a
                      href={`/president/${president.Number}`}
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedIndex(idx);
                      }}
                    >
                      <div>
                        <div className="imgHolder">
                          <img
                            src={`/presidents/${president.Number}.jpg`}
                            alt={president.President}
                          />
                        </div>
                        <div className="seo">
                          <h3>{president.President}</h3>
                        </div>
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
        {selected && <FunFacts president={selected} onClose={close} />}
      </aside>
    </>
  );
}
