"use client";

import { FC, useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Spinner } from "@nextui-org/react";
import { CardFooter } from "@nextui-org/card";
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

const copy = {
  "zh-CN": {
    error: "暂时无法加载更新日志。",
  },
  "zh-TW": {
    error: "暫時無法載入更新日誌。",
  },
  ja: {
    error: "更新ログを読み込めませんでした。",
  },
  en: {
    error: "Failed to load update log.",
  },
} as const;

export const WhatsNew: FC = () => {
  const { language, t } = useI18n();
  const [whatsNewData, setWhatsNewData] = useState<WhatsNewData[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    fetch("/api/changelog", { cache: "no-store" })
      .then(async (response) => (response.ok ? response.json() : []))
      .then((payload) => {
        if (!isMounted) {
          return;
        }

        const nextData = Array.isArray(payload) ? payload : [];
        setWhatsNewData(nextData);
        setHasError(nextData.length === 0);
      })
      .catch(() => {
        if (isMounted) {
          setWhatsNewData([]);
          setHasError(true);
        }
      })
      .finally(() => {
        if (isMounted) {
          setHasLoaded(true);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const localizedCopy = copy[language] ?? copy.en;

  return (
    <div
      className="flex flex-col items-center lg:px-6 sm:pt-4"
      style={{ height: "100vh", maxHeight: "100vh" }}
    >
      <h1 className="select-none">{t("updateLog.title")}</h1>
      <p className="select-none">{t("updateLog.description")}</p>
      <div id="log-container" className="w-full">
        {!hasLoaded ? (
          <div className="m-auto flex gap-2">
            <Spinner id="spinner" />
            <span className="my-auto select-none">{t("updateLog.loading")}</span>
          </div>
        ) : hasError ? (
          <div className="m-auto text-sm text-default-500">{localizedCopy.error}</div>
        ) : (
          whatsNewData.map((value) => (
            <Card key={value.version} className="mx-1 my-3 h-fit">
              <CardHeader className="px-3 py-1.5">
                <h2 className="font-bold">{value.version}</h2>
              </CardHeader>
              <CardBody className="h-fit overflow-auto px-3 py-0">
                {value.items.map((whatsNewItem, index) => (
                  <div key={`news-${index}`}>
                    <span>{whatsNewItem.title}</span>
                    <div className="flex flex-col">
                      {whatsNewItem.details.map((detail, detailIndex) => (
                        <span className="ml-2" key={`detail-${index}-${detailIndex}`}>
                          - {detail}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </CardBody>
              <CardFooter className="py-1">
                <span className="ml-auto select-none text-sm">
                  {t("common.releaseDate")}:
                  <span className="font-medium"> {value["release-date"]}</span>
                </span>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
