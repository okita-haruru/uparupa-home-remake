"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";
import { useTheme } from "next-themes";
import { RiQqLine } from "react-icons/ri";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";
import { useI18n } from "@/components/i18n/i18n-provider";
import qqGroupQrcode from "@/public/assets/qq-group-qrcode.jpg";
import qqGroupQrcodeDark from "@/public/assets/qq-group-qrcode-dark.jpg";

interface WhatsNewData {
  version: string;
  "release-date": string;
}

const QQ_GROUP_NUMBER = "634917584";

export const PortalHome = () => {
  const { t } = useI18n();
  const { theme } = useTheme();
  const [showQqModal, setShowQqModal] = useState(false);
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

  const qqGroupImage = theme === "dark" ? qqGroupQrcodeDark : qqGroupQrcode;

  return (
    <main className="portal-landing">
      <div className="portal-top-actions">
        <button
          type="button"
          className="portal-icon-button"
          aria-label={t("qqCard.title")}
          title={`${t("qqCard.title")} ${QQ_GROUP_NUMBER}`}
          onClick={() => setShowQqModal(true)}
        >
          <RiQqLine size={20} />
        </button>
        <LanguageSwitcher tone="glass" />
      </div>
      <div className="portal-background" aria-hidden="true" />
      <div className="portal-frost" aria-hidden="true" />

      <section className="portal-content">
        <div className="portal-panel">
          <h1 className="portal-title">Uparupa</h1>
          <p className="portal-subtitle">{t("portal.subtitle")}</p>

          <div className="portal-actions">
            <Link href="/homepage" className="portal-button portal-button-primary">
              {t("portal.enterHomepage")}
            </Link>
            <Link href="/update-log" className="portal-button portal-button-secondary">
              {t("portal.latestUpdate")}
            </Link>
          </div>
        </div>
      </section>

      <Link href="/update-log" className="portal-version-link">
        {versionLabel}
      </Link>

      <Modal isOpen={showQqModal} onClose={() => setShowQqModal(false)}>
        <ModalContent>
          <ModalHeader className="justify-center">{t("qqCard.title")}</ModalHeader>
          <ModalBody className="pb-6">
            <div className="flex flex-col items-center gap-3">
              <Image
                src={qqGroupImage}
                alt={t("qqCard.title")}
                className="h-auto w-full max-w-xs rounded-2xl"
              />
              <p className="text-sm font-medium text-default-600">{QQ_GROUP_NUMBER}</p>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </main>
  );
};
