import { User, Tooltip, Chip } from "@nextui-org/react";
import React from "react";
import { kills } from "./data";
import { RankingCell } from "@/components/rankings/rank-cell";

interface Props {
  user: (typeof kills)[number];
  columnKey: string | React.Key;
}

export const RenderCellForKillsRanking = ({ user, columnKey }: Props) => {
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
            className: 'square-avatar'
          }}
          name={cellValue}
        >
        </User>
      );

    default:
      return cellValue;
  }
};
