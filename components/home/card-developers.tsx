"use client";

import React, { useEffect, useState } from "react";
import { Avatar, AvatarGroup, Tooltip } from "@nextui-org/react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { GetDevelopersResponse } from "@/app/api/developers/route";
import { useI18n } from "@/components/i18n/i18n-provider";

export const CardDevelopers = () => {
  const { t } = useI18n();
  const [developers, setDevelopers] = useState<GetDevelopersResponse>();

  useEffect(() => {
    fetch("/api/developers").then(async (response) => {
      const data: GetDevelopersResponse = await response.json();
      setDevelopers(data);
    });
  }, []);

  return (
    <section className="home-panel home-side-panel select-none">
      <div className="home-panel-header">
        <span className="home-panel-eyebrow">{t("developersCard.title")}</span>
      </div>

      <div className="home-side-panel-content">
        <p className="home-side-description">{t("developersCard.subtitle")}</p>

        {developers?.summary && developers.summary.length > 0 ? (
          <AvatarGroup className="justify-center">
            {developers.summary.map((user) => (
              <Tooltip
                className="select-none"
                key={user.username}
                content={
                  <div className="flex items-center justify-center gap-1">
                    <span>{user.displayName}</span>
                    <FaExternalLinkAlt size={10} />
                  </div>
                }
              >
                <Avatar
                  color="default"
                  className="cursor-pointer bg-white/10"
                  src={user.avatar}
                  size="lg"
                  onClick={() => window.open(user.user_page)}
                />
              </Tooltip>
            ))}
          </AvatarGroup>
        ) : (
          <p className="home-side-empty">{t("common.loading")}</p>
        )}
      </div>
    </section>
  );
};
