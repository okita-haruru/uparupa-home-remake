import { User } from "@nextui-org/react";
import React from "react";
import { users } from "./data";
import { RankingCell } from "@/components/rankings/rank-cell";

const currencySymbolColor = "#ff9fcb";
const currencyValueColor = "#f4bbd5";

interface Props {
  user: (typeof users)[number];
  columnKey: string | React.Key;
}

export const RenderCellForRichRanking = ({ user, columnKey }: Props) => {
  // @ts-ignore
  const cellValue = user[columnKey];

  switch (columnKey) {
    case "ranking":
      return <RankingCell value={cellValue} />;

    case "name":
      return (
        <User
          avatarProps={{
            src: user.avatar,
            className: "square-avatar",
          }}
          name={cellValue}
        />
      );

    case "balance":
      return (
        <span className="font-medium">
          <span style={{ color: currencySymbolColor }}>❀</span>
          <span>{" "}</span>
          <span style={{ color: currencyValueColor }}>{cellValue}</span>
        </span>
      );

    default:
      return cellValue;
  }
};
