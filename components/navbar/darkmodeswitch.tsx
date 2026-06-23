"use client";

import React, { useMemo } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { useTheme as useNextTheme } from "next-themes";
import { LuPalette } from "react-icons/lu";
import { useI18n } from "@/components/i18n/i18n-provider";

const labels = {
  "zh-CN": {
    aria: "主题",
    light: "浅色",
    dark: "深色",
    system: "跟随系统",
  },
  "zh-TW": {
    aria: "主題",
    light: "淺色",
    dark: "深色",
    system: "跟隨系統",
  },
  ja: {
    aria: "テーマ",
    light: "ライト",
    dark: "ダーク",
    system: "システム",
  },
  en: {
    aria: "Theme",
    light: "Light",
    dark: "Dark",
    system: "System",
  },
} as const;

const triggerClassName =
  "inline-flex h-10 w-10 items-center justify-center rounded-full bg-transparent text-default-600 transition-colors hover:text-default-900";

export const DarkModeSwitch = () => {
  const { language } = useI18n();
  const { setTheme, theme } = useNextTheme();

  const copy = labels[language] ?? labels.en;
  const selectedKeys = useMemo(() => [theme ?? "system"], [theme]);

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <button
          type="button"
          className={triggerClassName}
          aria-label={copy.aria}
        >
          <LuPalette size={22} />
        </button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label={copy.aria}
        selectionMode="single"
        selectedKeys={selectedKeys}
        onAction={(key) => setTheme(String(key))}
      >
        <DropdownItem key="light">{copy.light}</DropdownItem>
        <DropdownItem key="dark">{copy.dark}</DropdownItem>
        <DropdownItem key="system">{copy.system}</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
