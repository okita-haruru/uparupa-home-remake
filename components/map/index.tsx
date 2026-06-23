"use client";

import React from "react";
import { useI18n } from "@/components/i18n/i18n-provider";

export const Map = () => {
  const { t } = useI18n();

  return (
    <div style={{ width: "100%", height: "100vh", border: "none" }}>
      <iframe
        src="https://server.uparupa.town:8124/"
        className="h-full w-full border-none"
        title={t("map.title")}
      />
    </div>
  );
};
