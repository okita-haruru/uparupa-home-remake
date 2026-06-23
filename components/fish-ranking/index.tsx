"use client";

import React from "react";
import { useI18n } from "@/components/i18n/i18n-provider";
import { TableWrapper } from "./table";

export const FishRanking = () => {
  const { t } = useI18n();

  return (
    <div className="mx-auto my-14 flex w-full max-w-[95rem] flex-col gap-4 lg:px-6">
      <h3 className="text-xl font-semibold">{t("fishRanking.title")}</h3>
      <div className="mx-auto w-full max-w-[95rem]">
        <TableWrapper />
      </div>
    </div>
  );
};
