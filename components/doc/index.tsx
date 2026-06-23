"use client";

import React from "react";
import { useI18n } from "@/components/i18n/i18n-provider";

export const Doc = () => {
  const { t } = useI18n();

  return (
    <div style={{ width: "100%", height: "100vh", border: "none" }}>
      <iframe
        src="https://doc.uparupa.town//"
        style={{ width: "100%", height: "100%", border: "none" }}
        title={t("doc.title")}
      />
    </div>
  );
};
