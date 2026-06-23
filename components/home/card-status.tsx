"use client";

import { BsFillHousesFill } from "react-icons/bs";
import { useI18n } from "@/components/i18n/i18n-provider";

interface CardStatusProps {
  count: number | null;
  code: number | null;
  onRefresh: () => void;
}

export const CardStatus = ({ count, code, onRefresh }: CardStatusProps) => {
  const { t } = useI18n();

  const statusText =
    code === null
      ? t("statusCard.loading")
      : code === 501
        ? t("statusCard.maintenance")
        : code === 200
          ? t("statusCard.online")
          : t("statusCard.offline");

  const detailText =
    code === 200 && count !== null
      ? t("statusCard.playersOnline", { count })
      : code === null
        ? t("common.loading")
        : statusText;

  const indicatorClassName =
    code === 200
      ? "home-status-indicator-online"
      : code === 501
        ? "home-status-indicator-maintenance"
        : code === null
          ? "home-status-indicator-loading"
          : "home-status-indicator-offline";

  return (
    <button
      type="button"
      className="home-panel home-status-panel select-none"
      onClick={onRefresh}
    >
      <div className="home-panel-header">
        <div className="home-status-header">
          <span className={`home-status-indicator ${indicatorClassName}`} />
          <span className="home-panel-eyebrow">{t("statusCard.townStatus")}</span>
        </div>
      </div>

      <div className="home-status-body">
        <div className="home-status-icon-wrap">
          <BsFillHousesFill size={22} />
        </div>
        <div className="home-status-copy">
          <p className="home-panel-detail">{code === 200 ? detailText : statusText}</p>
        </div>
      </div>
    </button>
  );
};
