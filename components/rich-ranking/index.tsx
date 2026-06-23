"use client";

import React from "react";
import { useI18n } from "@/components/i18n/i18n-provider";
import { TableWrapperForRichRanking } from "./table";

export const RichRanking = () => {
  const { t } = useI18n();

  return (
    <div className="mx-auto my-14 flex w-full max-w-[95rem] flex-col gap-4 lg:px-6">
      <h3 className="text-xl font-semibold">{t("richRanking.title")}</h3>
      <div className="mx-auto w-full max-w-[95rem]">
        <TableWrapperForRichRanking />
      </div>
    </div>
  );
};
