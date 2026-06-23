"use client";

import { useEffect, useRef, useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Chip,
  Skeleton,
  Tooltip,
} from "@nextui-org/react";
import axios from "axios";
import { SkinViewer, WalkingAnimation } from "skinview3d";
import {
  FaCheckCircle as OnlineIcon,
  FaCrown,
  FaSkull,
  FaTimesCircle as OfflineIcon,
} from "react-icons/fa";
import { PlayerInfo } from "@/app/api";
import { useI18n } from "@/components/i18n/i18n-provider";

export interface PlayerProps {
  name: string;
}

const copy = {
  "zh-CN": {
    notFound: "没有找到这位玩家的信息。",
  },
  "zh-TW": {
    notFound: "沒有找到這位玩家的資訊。",
  },
  ja: {
    notFound: "このプレイヤーの情報は見つかりませんでした。",
  },
  en: {
    notFound: "We couldn't find this player.",
  },
} as const;

const currencySymbol = "\u2740";
const currencySymbolColor = "#ff9fcb";
const currencyValueColor = "#f4bbd5";

export const Player = ({ name }: PlayerProps) => {
  const { language, t } = useI18n();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [playerInfo, setPlayerInfo] = useState<PlayerInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setHasError(false);

    axios
      .get(`/api/player?username=${name}`)
      .then((response) => (response.status === 200 ? response.data : {}))
      .then((payload) => {
        const nextPlayerInfo = payload?.data as PlayerInfo | undefined;

        if (nextPlayerInfo?.name) {
          setPlayerInfo(nextPlayerInfo);
          setHasError(false);
        } else {
          setPlayerInfo(null);
          setHasError(true);
        }
      })
      .catch((error) => {
        console.error("Failed to load player data:", error);
        setPlayerInfo(null);
        setHasError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [name]);

  useEffect(() => {
    if (!canvasRef.current || hasError) {
      return;
    }

    const viewer = new SkinViewer({
      canvas: canvasRef.current,
      width: 300,
      height: 400,
    });

    viewer.loadSkin(`https://mc-heads.net/skin/${name}`);
    viewer.background = "#39C5BB";
    viewer.autoRotate = true;
    viewer.autoRotateSpeed = 0.5;
    viewer.zoom = 0.6;
    viewer.fov = 10;
    viewer.animation = new WalkingAnimation();

    return () => {
      viewer.dispose();
    };
  }, [hasError, name]);

  const localizedCopy = copy[language] ?? copy.en;

  const lastSeenText =
    playerInfo && !playerInfo.isOnline
      ? t("player.lastSeen", {
          date: new Date(playerInfo.lastSeen * 1000).toLocaleString(language),
        })
      : "";

  if (!loading && (hasError || !playerInfo)) {
    return (
      <Card className="my-auto w-full max-w-md">
        <CardBody className="py-10 text-center text-default-500">
          {localizedCopy.notFound}
        </CardBody>
      </Card>
    );
  }

  return (
    <div className="h-full w-full">
      <Card className="my-auto w-fit max-w-fit">
        <CardBody className="p-0">
          <Skeleton isLoaded={!loading} className="h-fit w-fit">
            <div className="relative">
              <Card className="absolute left-0 top-0 m-2 rounded bg-default-500 p-1 select-none">
                <ul className="flex flex-col gap-1">
                  <li className="flex flex-row items-center gap-1">
                    <FaSkull />
                    <span>{playerInfo?.states.death.value}</span>
                    <span>#{playerInfo?.states.death.rank}</span>
                  </li>
                </ul>
              </Card>
              <canvas ref={canvasRef} width={300} height={400} />
            </div>
          </Skeleton>
        </CardBody>
        <CardFooter className="flex justify-between select-none">
          <div className="flex flex-col">
            <span className="text-medium">{name}</span>
            <div className="flex flex-row gap-1 text-sm text-default-500">
              <span>
                <span style={{ color: currencySymbolColor }}>{currencySymbol}</span>
                <span>{" "}</span>
                <span style={{ color: currencyValueColor }}>{playerInfo?.states.balance.value}</span>
              </span>
              <span>#{playerInfo?.states.balance.rank}</span>
              <div className="my-auto h-fit">
                {playerInfo?.states.balance.rank === 1 && (
                  <FaCrown className="text-yellow-500" />
                )}
                {playerInfo?.states.balance.rank === 2 && (
                  <FaCrown className="text-gray-500" />
                )}
                {playerInfo?.states.balance.rank === 3 && (
                  <FaCrown className="text-yellow-800" />
                )}
              </div>
            </div>
          </div>
          <Tooltip content={lastSeenText}>
            <Chip
              variant="shadow"
              color={playerInfo?.isOnline ? "success" : "danger"}
              startContent={playerInfo?.isOnline ? <OnlineIcon /> : <OfflineIcon />}
            >
              {playerInfo?.isOnline ? t("player.online") : t("player.offline")}
            </Chip>
          </Tooltip>
        </CardFooter>
      </Card>
    </div>
  );
};
