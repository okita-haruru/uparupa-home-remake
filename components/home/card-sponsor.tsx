"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Avatar } from "@nextui-org/react";
import { useI18n } from "@/components/i18n/i18n-provider";

interface SponsorInfo {
  avatar: string;
  name: string;
  amount: string;
  date: string;
}

export const CardSponsor = () => {
  const { t } = useI18n();
  const [items, setItems] = useState<SponsorInfo[]>([]);

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const { data } = await axios.get("/api/sponsor");
        if (data.success && Array.isArray(data.sponsors)) {
          setItems(data.sponsors);
        }
      } catch (error) {
        console.error("Error fetching sponsors data:", error);
      }
    };

    fetchSponsors();
  }, []);

  return (
    <section className="home-panel home-side-panel select-none">
      <div className="home-panel-header">
        <span className="home-panel-eyebrow">{t("sponsorCard.title")}</span>
      </div>

      <div className="home-side-panel-content home-sponsor-panel-content">
        {items.length > 0 ? (
          <div className="home-sponsor-list">
            {items.map((item) => (
              <div key={item.name} className="home-sponsor-item">
                <Avatar
                  color="default"
                  src={item.avatar}
                  className="h-12 w-12 rounded-full bg-white/10"
                />
                <div className="home-sponsor-copy">
                  <span className="home-sponsor-name">{item.name}</span>
                  <span className="home-sponsor-date">{item.date}</span>
                </div>
                <span className="home-sponsor-amount">{item.amount}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="home-side-empty">{t("common.loading")}</p>
        )}
      </div>
    </section>
  );
};
