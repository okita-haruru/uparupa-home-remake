import { PlayerInfo } from "@/app/api";
import { Tooltip, User } from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";

export interface PlayerHeaderProps {
    name: string;
}

const getTooltipContent = (name: string) => {
    return (
        <div>
            <span>{name}</span>
        </div>
    )
}

export const PlayerAvatar = ({ name }: PlayerHeaderProps) => {
    const [playerInfo, setPlayerInfo] = useState<PlayerInfo>({
        uuid: '',
        avatar: '',
        name: 'Keriteal',
        lastSeen: 0,
        join: 0,
        playTime: 10,
        states: {
            totalFishing: { rank: 1, value: 1 },
            fishing: [],
            balance: { rank: 1, value: 1 },
            death: { rank: 1, value: 1 },
            kills: {
                warden: { rank: 1, value: 1 },
                enderDragon: { rank: 1, value: 1 },
                wither: { rank: 1, value: 1 },
                ancientGuardian: { rank: 1, value: 1 },
                phantom: { rank: 1, value: 1 },
                piglinBrute: { rank: 1, value: 1 },
            }
        },
        isOnline: false,
    });

    useEffect(() => {
        if (!name) return;

        axios.get(`/api/player/${name}`).then((res) => {
            setPlayerInfo(res.data);
        })
    }, [name]);

    return (
        <Tooltip content={getTooltipContent(name)}>
            <User avatarProps={{ src: playerInfo?.avatar, className: 'square-avatar' }} name={playerInfo?.name} />
        </Tooltip>
    )
}
