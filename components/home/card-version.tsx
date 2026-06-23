"use client";

import React, { useEffect, useState } from "react";
import { Card, CardBody } from "@nextui-org/react";
import { LuFileClock } from "react-icons/lu";
import { navigateUpdateLog } from "@/app/client-redirect";
import { useI18n } from "@/components/i18n/i18n-provider";

export interface WhatsNewData {
  version: string;
  "release-date": string;
  items: WhatsNewItem[];
}

export interface WhatsNewItem {
  title: string;
  details: string[];
}

export const CardVersion = () => {
  const { t } = useI18n();
  const [whatsNewData, setWhatsNewData] = useState<WhatsNewData[]>([]);
  const [hasLoadedChangelog, setHasLoadedChangelog] = useState(false);

  useEffect(() => {
    let isMounted = true;

    fetch("/api/changelog", { cache: "no-store" })
      .then(async (response) => (response.ok ? response.json() : []))
      .then((payload) => {
        if (!isMounted) {
          return;
        }

        setWhatsNewData(Array.isArray(payload) ? payload : []);
      })
      .catch(() => {
        if (isMounted) {
          setWhatsNewData([]);
        }
      })
      .finally(() => {
        if (isMounted) {
          setHasLoadedChangelog(true);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const versionLabel =
    !hasLoadedChangelog || whatsNewData.length === 0
      ? t("versionCard.currentVersionLoading")
      : t("versionCard.currentVersion", { version: whatsNewData[0].version });

  return (
    <Card
      className="xl:max-w-sm rounded-xl bg-primary px-3 shadow-md w-full select-none"
      isPressable
      onPress={() => navigateUpdateLog()}
    >
      <CardBody className="flex-row gap-2.5 py-5">
        <LuFileClock className="my-auto" size={30} />
        <div className="flex flex-col">
          <span className="text-white">{versionLabel}</span>
          <span className="text-xs text-white">{t("versionCard.clickToView")}</span>
        </div>
      </CardBody>
    </Card>
  );
};
