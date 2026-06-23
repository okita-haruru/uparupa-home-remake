import { FaTrophy } from "react-icons/fa6";

export const TROPHY_STYLES: Record<number, { icon: string; background: string; border: string }> = {
  1: {
    icon: "#f5c451",
    background: "rgba(245, 196, 81, 0.14)",
    border: "rgba(245, 196, 81, 0.3)",
  },
  2: {
    icon: "#c7d2e2",
    background: "rgba(199, 210, 226, 0.14)",
    border: "rgba(199, 210, 226, 0.3)",
  },
  3: {
    icon: "#d99663",
    background: "rgba(217, 150, 99, 0.14)",
    border: "rgba(217, 150, 99, 0.3)",
  },
};

interface RankingCellProps {
  value: string | number;
  showTrophy?: boolean;
}

export const RankingCell = ({ value, showTrophy = true }: RankingCellProps) => {
  const rank = Number(value);
  const trophyStyle = TROPHY_STYLES[rank];
  const isTopThree = Boolean(trophyStyle);

  return (
    <div className="inline-flex items-center font-medium">
      <span
        className={isTopThree ? "relative inline-block pr-3 text-[1.4rem] font-semibold leading-none" : ""}
        style={
          isTopThree
            ? {
                color: "transparent",
                WebkitTextStroke: `1.4px ${trophyStyle.icon}`,
              }
            : undefined
        }
      >
        {value}
        {showTrophy && trophyStyle ? (
          <FaTrophy
            size={11}
            className="absolute -right-1 -top-1"
            style={{
              color: trophyStyle.icon,
              filter: `drop-shadow(0 0 4px ${trophyStyle.background})`,
            }}
          />
        ) : null}
      </span>
    </div>
  );
};
