import { User, Tooltip, Chip } from "@nextui-org/react";
import React from "react";
import { data_for_size,data_for_amount } from "./data";
import { RankingCell, TROPHY_STYLES } from "@/components/rankings/rank-cell";
import { FaFishFins } from "react-icons/fa6";
import { LuRuler } from "react-icons/lu";

const catchColor = "#8dabf6";

interface PropsForSize {
  user: (typeof data_for_size)[number];
  columnKey: string | React.Key;
}
interface PropsForAmount {
    user: (typeof data_for_amount)[number];
    columnKey: string | React.Key;
}



export const RenderCell = ({ user, columnKey }: PropsForAmount) => {
    // @ts-ignore
    const cellValue = user[columnKey];
    const ranking = Number(user.ranking);
    const topRankStyle = TROPHY_STYLES[ranking];
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

        case "amount":
            return (
                <span className="inline-flex items-center gap-2 font-medium" style={{ color: catchColor }}>
                    <FaFishFins size={12} />
                    <span>{cellValue}</span>
                </span>
            );

        case "size":
            return (
                <span
                    className="inline-flex items-center gap-2 font-medium"
                    style={{ color: topRankStyle?.icon ?? catchColor }}
                >
                    <LuRuler size={13} />
                    <span>{cellValue}</span>
                </span>
            );

        default:
            return cellValue;
    }
};
