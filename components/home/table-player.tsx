"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  User,
} from "@nextui-org/react";
import { useI18n } from "@/components/i18n/i18n-provider";
import { API_URL } from "@/config/apiconfig";

interface Player {
  ping: number;
  name: string;
  uuid: string;
  avatar: string;
}

interface Data {
  lobby: {
    players: Player[];
    count: number;
  };
  survival: {
    players: Player[];
    count: number;
  };
}

const transformData = (data: Data, type: "lobby" | "survival") => {
  if (!data[type].players) {
    return [];
  }

  return data[type].players.map((player, index) => ({
    num: index + 1,
    name: player.name,
    avatar: player.avatar,
  }));
};

export function PlayerTable({ type }: { type: "lobby" | "survival" }) {
  const { t } = useI18n();
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/player_list`)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.error("Failed to fetch data:", error);
      });
  }, [type]);

  if (!data) {
    return (
      <div className="mb-4 mt-4 flex items-center justify-center">
        <Spinner size="lg" label={t("common.loading")} color="primary" />
      </div>
    );
  }

  const transformedData = transformData(data, type);

  if (transformedData.length === 0) {
    return (
      <div>
        <h5 className="mb-4 mt-4 text-center text-m font-semibold select-none">
          {t("common.noPlayersOnline")}
        </h5>
      </div>
    );
  }

  return (
    <Table aria-label={t("common.players")}>
      <TableHeader>
        <TableColumn className="equal-width select-none">
          {t("common.rank")}
        </TableColumn>
        <TableColumn className="equal-width select-none">
          {t("common.player")}
        </TableColumn>
      </TableHeader>
      <TableBody>
        {transformedData.map((row, index) => (
          <TableRow key={index}>
            <TableCell className="select-none">{row.num}</TableCell>
            <TableCell>
              <User
                avatarProps={{ src: row.avatar, className: "square-avatar select-none" }}
                name={row.name}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
