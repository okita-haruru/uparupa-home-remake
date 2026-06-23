"use client";

import { KeyboardEvent, useState } from "react";
import { Button, Card, CardBody, Input } from "@nextui-org/react";
import { LuSearch } from "react-icons/lu";
import { useI18n } from "@/components/i18n/i18n-provider";
import { Player } from "./player";

const copy = {
  "zh-CN": {
    eyebrow: "PLAYERS",
    title: "玩家信息",
    description: "键入玩家ID搜索数据",
    placeholder: "键入玩家ID搜索数据",
    button: "查看玩家",
  },
  "zh-TW": {
    eyebrow: "PLAYERS",
    title: "玩家資訊",
    description: "輸入玩家 ID 搜尋資料",
    placeholder: "輸入玩家 ID 搜尋資料",
    button: "查看玩家",
  },
  ja: {
    eyebrow: "PLAYERS",
    title: "プレイヤー情報",
    description: "プレイヤー ID を入力してデータを検索",
    placeholder: "プレイヤー ID を入力してデータを検索",
    button: "表示する",
  },
  en: {
    eyebrow: "PLAYERS",
    title: "Player Info",
    description: "Type a player ID to search data",
    placeholder: "Type a player ID to search data",
    button: "View Player",
  },
} as const;

export const PlayerInfoSearch = () => {
  const { language } = useI18n();
  const localizedCopy = copy[language] ?? copy.en;
  const [keyword, setKeyword] = useState("");
  const [currentPlayer, setCurrentPlayer] = useState("");

  const submitSearch = () => {
    const nextPlayer = keyword.trim();

    if (!nextPlayer) {
      return;
    }

    setCurrentPlayer(nextPlayer);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") {
      return;
    }

    submitSearch();
  };

  return (
    <div className="mx-auto my-14 flex w-full max-w-[95rem] flex-col gap-6 px-4 lg:px-6">
      <header className="flex flex-col gap-3">
        <span className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-500">
          {localizedCopy.eyebrow}
        </span>
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold text-default-900">
            {localizedCopy.title}
          </h1>
          <p className="max-w-3xl text-default-500">
            {localizedCopy.description}
          </p>
        </div>
      </header>

      <Card className="border border-default-100 bg-default-50/90 shadow-md">
        <CardBody className="flex flex-col gap-3 md:flex-row md:items-center">
          <Input
            autoComplete="off"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={localizedCopy.placeholder}
            startContent={<LuSearch className="text-default-400" size={18} />}
          />
          <Button
            onPress={submitSearch}
            className="md:min-w-[9rem] !bg-[#8ca8e7] !text-[#0f172a] hover:!bg-[#9bb3e9]"
          >
            {localizedCopy.button}
          </Button>
        </CardBody>
      </Card>

      {currentPlayer ? (
        <div className="flex justify-center">
          <Player name={currentPlayer} />
        </div>
      ) : null}
    </div>
  );
};
