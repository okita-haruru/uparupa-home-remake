"use client";

import { useEffect, useRef, useState } from "react";
import type { IconType } from "react-icons";
import { FaLeaf, FaSeedling, FaSnowflake, FaSun } from "react-icons/fa";
import { useI18n } from "@/components/i18n/i18n-provider";
import type { Language } from "@/components/i18n/messages";
import {
  activityEvents,
  activityPageCopy,
  regionLabels,
  seasonLabels,
  type ActivityEvent,
  type EventRegion,
  type EventSeason,
} from "./activity-events";

const localeMap: Record<Language, string> = {
  "zh-CN": "zh-CN",
  "zh-TW": "zh-TW",
  ja: "ja-JP",
  en: "en-US",
};

const seasonIcons: Record<EventSeason, IconType> = {
  spring: FaSeedling,
  summer: FaSun,
  autumn: FaLeaf,
  winter: FaSnowflake,
};

const tierClassNames = {
  sm: "event-card event-card-sm",
  md: "event-card event-card-md",
  lg: "event-card event-card-lg",
} as const;

const seasonCardClassNames: Record<EventSeason, string> = {
  spring: "event-card-spring",
  summer: "event-card-summer",
  autumn: "event-card-autumn",
  winter: "event-card-winter",
};

const regionBadgeClassNames: Record<EventRegion, string> = {
  china: "event-region-badge event-region-badge-china",
  japan: "event-region-badge event-region-badge-japan",
  usa: "event-region-badge event-region-badge-usa",
};

const sortedEvents = [...activityEvents].sort((left, right) => {
  if (left.month !== right.month) {
    return left.month - right.month;
  }

  return left.day - right.day;
});

const getLocalizedText = (
  value: Record<Language, string>,
  language: Language,
) => value[language] ?? value.en;

const getDayOfYear = (month: number, day: number) => {
  const start = new Date(2026, 0, 1);
  const target = new Date(2026, month - 1, day);
  const difference = target.getTime() - start.getTime();

  return Math.floor(difference / 86400000) + 1;
};

const getTimelinePosition = (month: number, day: number) => {
  return ((getDayOfYear(month, day) - 1) / 364) * 100;
};

const getMonthLabels = (language: Language) => {
  const formatter = new Intl.DateTimeFormat(localeMap[language], { month: "short" });

  return Array.from({ length: 12 }, (_, index) =>
    formatter.format(new Date(2026, index, 1)),
  );
};

const formatEventDate = (language: Language, event: ActivityEvent) => {
  return new Intl.DateTimeFormat(localeMap[language], {
    month: "short",
    day: "numeric",
  }).format(new Date(2026, event.month - 1, event.day));
};

export const ActivityCatalog = () => {
  const { language } = useI18n();
  const copy = activityPageCopy[language] ?? activityPageCopy.en;
  const railRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [timelineProgress, setTimelineProgress] = useState(
    getTimelinePosition(sortedEvents[0].month, sortedEvents[0].day),
  );

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) {
      return;
    }

    const updateRailState = () => {
      const center = rail.scrollLeft + rail.clientWidth / 2;
      let nextActiveIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;
      const cardPoints: Array<{ center: number; progress: number }> = [];

      for (let index = 0; index < cardRefs.current.length; index += 1) {
        const card = cardRefs.current[index];

        if (!card) {
          continue;
        }

        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(cardCenter - center);
        cardPoints.push({
          center: cardCenter,
          progress: getTimelinePosition(sortedEvents[index].month, sortedEvents[index].day),
        });

        if (distance < closestDistance) {
          closestDistance = distance;
          nextActiveIndex = index;
        }
      }

      if (cardPoints.length > 0) {
        if (center <= cardPoints[0].center) {
          setTimelineProgress(cardPoints[0].progress);
        } else if (center >= cardPoints[cardPoints.length - 1].center) {
          setTimelineProgress(cardPoints[cardPoints.length - 1].progress);
        } else {
          for (let index = 0; index < cardPoints.length - 1; index += 1) {
            const currentPoint = cardPoints[index];
            const nextPoint = cardPoints[index + 1];

            if (center >= currentPoint.center && center <= nextPoint.center) {
              const segmentRatio =
                (center - currentPoint.center) /
                (nextPoint.center - currentPoint.center);
              const interpolatedProgress =
                currentPoint.progress +
                (nextPoint.progress - currentPoint.progress) * segmentRatio;

              setTimelineProgress(interpolatedProgress);
              break;
            }
          }
        }
      }

      setActiveIndex(nextActiveIndex);
    };

    const handleWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) {
        return;
      }

      const maxScrollLeft = rail.scrollWidth - rail.clientWidth;
      if (maxScrollLeft <= 0) {
        return;
      }

      event.preventDefault();
      rail.scrollBy({
        left: event.deltaY,
        behavior: "auto",
      });
    };

    updateRailState();
    rail.addEventListener("scroll", updateRailState, { passive: true });
    rail.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      rail.removeEventListener("scroll", updateRailState);
      rail.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const activeEvent = sortedEvents[activeIndex] ?? sortedEvents[0];
  const monthLabels = getMonthLabels(language);

  return (
    <div className="event-catalog-page">
      <div className="event-catalog-shell">
        <header className="event-catalog-header">
          <div className="event-catalog-copy">
            <span className="event-catalog-eyebrow">{copy.eyebrow}</span>
            <h1 className="event-catalog-title">{copy.title}</h1>
            <p className="event-catalog-description">{copy.description}</p>
          </div>

          <div className="event-catalog-active">
            <span className="event-catalog-active-label">{copy.activeEvent}</span>
            <strong className="event-catalog-active-title">
              {getLocalizedText(activeEvent.title, language)}
            </strong>
            <div className="event-catalog-active-meta">
              <span className={regionBadgeClassNames[activeEvent.region]}>
                {getLocalizedText(regionLabels[activeEvent.region], language)}
              </span>
              <span className="event-catalog-active-date">
                {formatEventDate(language, activeEvent)}
              </span>
            </div>
          </div>
        </header>

        <div className="event-catalog-stage">
          <div className="event-scroll-hint">
            <span>{copy.scrollHint}</span>
            <span className="event-scroll-hint-window">{copy.currentWindow}</span>
          </div>

          <div ref={railRef} className="event-rail" role="region" aria-label={copy.title}>
            <div className="event-rail-track">
              {sortedEvents.map((event, index) => (
                <article
                  key={event.id}
                  ref={(node) => {
                    cardRefs.current[index] = node;
                  }}
                  className={`${tierClassNames[event.tier]} ${seasonCardClassNames[event.season]}`}
                >
                  <div className="event-card-topline">
                    <span className={regionBadgeClassNames[event.region]}>
                      {getLocalizedText(regionLabels[event.region], language)}
                    </span>
                    <span className="event-card-date">
                      {formatEventDate(language, event)}
                    </span>
                  </div>

                  <div className="event-card-ghost">
                    {String(event.month).padStart(2, "0")}
                  </div>

                  <div className="event-card-content">
                    <p className="event-card-kicker">{copy.regionTitle}</p>
                    <h2 className="event-card-title">
                      {getLocalizedText(event.title, language)}
                    </h2>
                    <p className="event-card-summary">
                      {getLocalizedText(event.summary, language)}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <section className="event-timeline-panel" aria-label={copy.timelineTitle}>
            <div className="event-timeline-header">
              <div>
                <span className="event-timeline-eyebrow">{copy.timelineTitle}</span>
                <h2 className="event-timeline-title">{copy.currentWindow}</h2>
              </div>
              <span className="event-timeline-active-date">
                {formatEventDate(language, activeEvent)}
              </span>
            </div>

            <div className="event-timeline-months" aria-hidden="true">
              {monthLabels.map((label) => (
                <span key={label}>{label}</span>
              ))}
            </div>

            <div className="event-timeline-track">
              <div
                className="event-timeline-progress"
                style={{ width: `${timelineProgress}%` }}
              />
              <div
                className="event-timeline-cursor"
                style={{ left: `${timelineProgress}%` }}
              />

              {sortedEvents.map((event) => (
                <span
                  key={event.id}
                  className={`event-timeline-tick event-timeline-tick-${event.region}`}
                  style={{ left: `${getTimelinePosition(event.month, event.day)}%` }}
                  title={getLocalizedText(event.title, language)}
                />
              ))}

              {(
                Object.entries(seasonLabels) as Array<
                  [EventSeason, (typeof seasonLabels)[EventSeason]]
                >
              ).map(([season, details]) => {
                const Icon = seasonIcons[season];
                const position = getTimelinePosition(details.date[0], details.date[1]);

                return (
                  <div
                    key={season}
                    className={`event-season-marker event-season-marker-${season}`}
                    style={{ left: `${position}%` }}
                  >
                    <span className="event-season-icon-wrap">
                      <Icon className="event-season-icon" />
                    </span>
                    <span className="event-season-label">
                      {getLocalizedText(details.label, language)}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
