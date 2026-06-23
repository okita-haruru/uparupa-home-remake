"use client";

import Image from "next/image";
import type { ReactNode } from "react";

const currencySymbol = "\u2740";
const currencySymbolColor = "#ff9fcb";
const currencyValueColor = "#f4bbd5";

export interface CatalogItem {
  id: string;
  name: string;
  image: string;
  summary?: string;
  scientificName?: string;
  code?: string;
  rarity?: string;
  sizeCm?: string;
  unitPrice?: string;
  effect?: string;
  terrainCategory?: string;
  realDistribution?: string;
  hasMetadata?: boolean;
}

interface CatalogGalleryProps {
  title: string;
  description: string;
  eyebrow: string;
  emptyDescription: string;
  headerAccessory?: ReactNode;
  labels: {
    rarity: string;
    rarityNames?: Record<string, string>;
    size: string;
    unitPrice: string;
    effect: string;
    terrain: string;
    realDistribution: string;
    missing: string;
  };
  items: CatalogItem[];
  accentClassName: string;
}

const tagClassName =
  "rounded-full border border-default-200 bg-default-100/80 px-3 py-1 text-xs text-default-700";

const stackedTagClassName = `${tagClassName} w-fit max-w-full self-end text-right`;

const rarityBadgeStyles: Record<string, string> = {
  "1": "border-[#5e5e5e] bg-[#6d6d6d] text-white",
  "2": "border-[#c8c8c8] bg-[#d9d9d9] text-[#141414]",
  "3": "border-[#8ebae8] bg-[#9dc6f1] text-[#10243b]",
  "4": "border-[#a0cb6b] bg-[#aed67a] text-[#18310f]",
  "5": "border-[#9157e6] bg-[#9b63ee] text-white",
  "6": "border-[#f0ca5e] bg-[#ffd86b] text-[#3c2a00]",
  "7": "border-[#e57cb5] bg-[#f28ac6] text-[#3b1027]",
  "8": "border-[#f36d7d] bg-[#ff7b88] text-[#3b0d14]",
};

const getRarityBadgeClassName = (rarity?: string) => {
  if (!rarity) {
    return null;
  }

  return rarityBadgeStyles[rarity] ?? "border-default-300 bg-default-200 text-default-900";
};

const getRarityBadgeLabel = (
  rarity: string | undefined,
  rarityNames?: Record<string, string>,
) => {
  if (!rarity) {
    return null;
  }

  return rarityNames?.[rarity] ?? rarity;
};

export const CatalogGallery = ({
  title,
  description,
  eyebrow,
  emptyDescription,
  headerAccessory,
  labels,
  items,
  accentClassName,
}: CatalogGalleryProps) => {
  return (
    <div className="mx-auto my-14 flex w-full max-w-[95rem] flex-col gap-6 px-4 lg:px-6">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex flex-col gap-3">
          <span className={`text-xs font-semibold uppercase tracking-[0.28em] ${accentClassName}`}>
            {eyebrow}
          </span>
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-semibold text-default-900">{title}</h1>
            <p className="max-w-3xl text-default-500">{description}</p>
          </div>
        </div>
        {headerAccessory ? <div className="lg:pt-2">{headerAccessory}</div> : null}
      </header>

      {items.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-default-300 bg-default-50 p-10 text-default-500">
          {emptyDescription}
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {items.map((item) => (
            <article
              key={`${item.id}-${item.image}`}
              className="flex h-full flex-col rounded-3xl border border-default-100 bg-default-50/90 p-4 shadow-md"
            >
              <div className="relative mb-4 aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-default-100 via-default-50 to-default-100">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                  className="object-contain p-5"
                />
              </div>

              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="truncate text-lg font-semibold text-default-900">
                      {item.name}
                    </h2>
                    {item.rarity ? (
                      <span
                        className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold ${getRarityBadgeClassName(item.rarity)}`}
                      >
                        {getRarityBadgeLabel(item.rarity, labels.rarityNames)}
                      </span>
                    ) : null}
                  </div>
                  {item.scientificName ? (
                    <p className="truncate text-sm italic text-default-500">
                      {item.scientificName}
                    </p>
                  ) : null}
                </div>
              </div>

              <p className="mt-3 min-h-[3.5rem] text-sm leading-6 text-default-600">
                {item.summary?.trim() ? item.summary : labels.missing}
              </p>

              {item.sizeCm || item.unitPrice || item.effect || item.terrainCategory ? (
                <div className="mt-auto pt-4">
                  <div className="flex min-h-[6.5rem]">
                    <div className="ml-auto flex min-w-0 max-w-[12rem] flex-col items-end gap-2">
                      {item.sizeCm ? (
                        <span className={stackedTagClassName}>
                          {labels.size} {item.sizeCm}
                        </span>
                      ) : null}
                      {item.unitPrice ? (
                        <span className={stackedTagClassName}>
                          {labels.unitPrice} <span style={{ color: currencySymbolColor }}>{currencySymbol}</span>
                          <span>{" "}</span>
                          <span style={{ color: currencyValueColor }}>{item.unitPrice}</span>
                        </span>
                      ) : null}
                      {item.effect ? (
                        <span className={stackedTagClassName}>
                          {labels.effect} {item.effect}
                        </span>
                      ) : null}
                      {item.terrainCategory ? (
                        <span className={stackedTagClassName}>
                          {item.terrainCategory}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
              ) : null}
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
