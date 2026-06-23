"use client";

import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import clsx from "clsx";
import { LuLanguages } from "react-icons/lu";
import { useI18n } from "./i18n-provider";
import { LANGUAGE_OPTIONS, Language } from "./messages";

interface LanguageSwitcherProps {
  tone?: "default" | "glass";
  className?: string;
}

export const LanguageSwitcher = ({
  tone = "default",
  className,
}: LanguageSwitcherProps) => {
  const { language, setLanguage, t } = useI18n();

  const triggerClassName = clsx(
    "inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors",
    tone === "glass"
      ? "border border-white/45 bg-white/35 text-[#3e2e12] shadow-lg backdrop-blur-xl"
      : "bg-transparent text-default-600 hover:text-default-900",
    className
  );

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <button
          type="button"
          className={triggerClassName}
          aria-label={t("common.language")}
        >
          <LuLanguages size={20} />
        </button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label={t("common.language")}
        selectionMode="single"
        selectedKeys={[language]}
        onAction={(key) => setLanguage(key as Language)}
      >
        {LANGUAGE_OPTIONS.map((option) => (
          <DropdownItem key={option.value}>{option.label}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};
