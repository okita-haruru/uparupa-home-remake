"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useI18n } from "@/components/i18n/i18n-provider";
import { API_REQUEST_TIMEOUT_MS, API_URL } from "@/config/apiconfig";
import { CardStatus } from "./card-status";
import { CardDevelopers } from "./card-developers";
import { CardSponsor } from "./card-sponsor";
import { HomeWorldCard } from "./home-world-card";
import { MyChart } from "./mychart";
import type { HomePlayerListData } from "./types";

export const Home = () => {
  const { t } = useI18n();
  const [playerListData, setPlayerListData] = useState<HomePlayerListData | null>(null);
  const [playerListStatus, setPlayerListStatus] = useState<number | null>(null);

  const loadPlayerList = () => {
    setPlayerListStatus(null);

    axios
      .get(`${API_URL}/player_list`, { timeout: API_REQUEST_TIMEOUT_MS })
      .then((response) => {
        setPlayerListStatus(response.status);
        setPlayerListData(response.data.data);
      })
      .catch((error) => {
        if (error.response?.status) {
          setPlayerListStatus(error.response.status);
        } else if (error.code === "ECONNABORTED") {
          setPlayerListStatus(401);
        } else {
          setPlayerListStatus(502);
        }

        console.error("Failed to fetch data:", error);
      });
  };

  useEffect(() => {
    loadPlayerList();
  }, []);

  const totalPlayers = playerListData
    ? playerListData.lobby.count + playerListData.survival.count
    : null;

  return (
    <div className="home-dashboard">
      <div className="home-dashboard-shell">
        <div className="home-dashboard-grid">
          <div className="home-grid-status">
            <CardStatus
              code={playerListStatus}
              count={totalPlayers}
              onRefresh={loadPlayerList}
            />
          </div>

          <div className="home-grid-lobby">
            <HomeWorldCard
              type="lobby"
              title={t("homepage.lobbyWorld")}
              data={playerListData}
            />
          </div>

          <div className="home-grid-survival">
            <HomeWorldCard
              type="survival"
              title={t("homepage.survivalWorld")}
              data={playerListData}
            />
          </div>

          <section className="home-panel home-chart-panel select-none home-grid-chart">
            <div className="home-panel-header">
              <span className="home-panel-eyebrow">
                {t("homepage.dailyActivePlayers")}
              </span>
            </div>
            <div className="home-chart-body">
              <div className="home-chart-canvas">
                <MyChart height="100%" />
              </div>
            </div>
          </section>

          <div className="home-grid-developers">
            <CardDevelopers />
          </div>

          <div className="home-grid-sponsors">
            <CardSponsor />
          </div>
        </div>
      </div>
    </div>
  );
};
