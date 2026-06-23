import { User, Tooltip, Chip } from "@nextui-org/react";
import React from "react";
import { playTime } from "./data";
import { RankingCell } from "@/components/rankings/rank-cell";
import { formatPlayTime } from "./format-playtime";

interface Props {
  user: (typeof playTime)[number];
  columnKey: string | React.Key;
}

export const RenderCellForPlayTimeRanking = ({ user, columnKey }: Props) => {
  // @ts-ignore
  const cellValue = user[columnKey];
  switch (columnKey) {
    case "ranking":
      return <RankingCell value={cellValue} showTrophy={false} />;

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

    case "play_time":
      return formatPlayTime(String(cellValue));

    default:
      return cellValue;
  }
};
