"use client";

import { Avatar } from "@nextui-org/react";
import { useI18n } from "@/components/i18n/i18n-provider";
import type { HomePlayerListData, HomeWorldType } from "./types";

interface HomeWorldCardProps {
  type: HomeWorldType;
  title: string;
  data: HomePlayerListData | null;
}

export const HomeWorldCard = ({ type, title, data }: HomeWorldCardProps) => {
  const { t } = useI18n();
  const world = data?.[type];
  const count = world?.count ?? null;
  const players = world?.players ?? [];
  const visiblePlayers = players.slice(0, 4);
  const hasLoadedPlayers = count !== null && count > 0;

  const detailText =
    count === null
      ? t("common.loading")
      : count === 0
        ? t("common.noPlayersOnline")
        : t("statusCard.playersOnline", { count });

  return (
    <section className="home-panel home-world-panel select-none">
      <div className="home-panel-header">
        <span className="home-panel-eyebrow">{title}</span>
      </div>

      <div className="home-world-summary">
        <div className="home-world-count">{count === null ? "--" : count}</div>
        <p className="home-panel-detail">{detailText}</p>
      </div>

      <div className="home-world-player-list">
        {hasLoadedPlayers ? (
          visiblePlayers.map((player) => (
            <div key={player.uuid} className="home-world-player-chip">
              <Avatar
                src={player.avatar}
                name={player.name}
                className="h-7 w-7 rounded-full"
              />
              <span>{player.name}</span>
            </div>
          ))
        ) : null}
        {hasLoadedPlayers && count !== null && count > visiblePlayers.length ? (
          <div className="home-world-player-chip home-world-player-chip-muted">
            +{count - visiblePlayers.length}
          </div>
        ) : null}
      </div>
    </section>
  );
};
