"use client";

import { useMemo, useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";
import { useI18n } from "@/components/i18n/i18n-provider";
import { FilterIcon } from "@/components/icons/sidebar/filter-icon";
import fishCatalog from "@/data/catalog/fish-catalog.json";
import { CatalogGallery, CatalogItem } from "./catalog-gallery";
import { localizeFishCatalogItems } from "./fish-localization";

const rarityOrder = ["1", "2", "3", "4", "5", "6", "7", "8"] as const;
const terrainOrder = ["近岸", "渔场", "河流中下游"] as const;

const copy = {
  "zh-CN": {
    eyebrow: "Catalog",
    title: "钓鱼图鉴",
    description:
      "根据你提供的鱼类素材图和最新 Excel 自动整理出的鱼类卡片。这里会优先展示已有图片的鱼，并把尺寸、价格、稀有度和简介一起展示出来。",
    empty: "没有符合当前筛选条件的鱼类资料。",
    filterLabel: "筛选",
    filterRarityLabel: "稀有度",
    filterTerrainLabel: "地形",
    filterAllRarity: "全部稀有度",
    filterAllTerrain: "全部地形",
    labels: {
      rarity: "稀有度",
      rarityNames: {
        "1": "垃圾",
        "2": "普通",
        "3": "少见",
        "4": "稀有",
        "5": "史诗",
        "6": "传说",
        "7": "神级",
        "8": "绝绝子",
      },
      terrainNames: {
        近岸: "近岸",
        渔场: "渔场",
        河流中下游: "河流中下游",
      },
      size: "尺寸",
      unitPrice: "单价",
      effect: "效果",
      terrain: "地形",
      realDistribution: "分布",
      missing: "这条鱼目前只有素材图，详细说明还没补进表里。",
    },
  },
  "zh-TW": {
    eyebrow: "Catalog",
    title: "釣魚圖鑑",
    description:
      "根據你提供的魚類素材圖和最新 Excel 自動整理出的魚類卡片。這裡會優先展示已有圖片的魚，並把尺寸、價格、稀有度和簡介一起展示出來。",
    empty: "沒有符合目前篩選條件的魚類資料。",
    filterLabel: "篩選",
    filterRarityLabel: "稀有度",
    filterTerrainLabel: "地形",
    filterAllRarity: "全部稀有度",
    filterAllTerrain: "全部地形",
    labels: {
      rarity: "稀有度",
      rarityNames: {
        "1": "垃圾",
        "2": "普通",
        "3": "少見",
        "4": "稀有",
        "5": "史詩",
        "6": "傳說",
        "7": "神級",
        "8": "絕絕子",
      },
      terrainNames: {
        近岸: "近岸",
        渔场: "漁場",
        河流中下游: "河流中下游",
      },
      size: "尺寸",
      unitPrice: "單價",
      effect: "效果",
      terrain: "地形",
      realDistribution: "分布",
      missing: "這條魚目前只有素材圖，詳細說明還沒補進表裡。",
    },
  },
  ja: {
    eyebrow: "Catalog",
    title: "釣り図鑑",
    description:
      "魚の素材画像と最新の Excel をもとに自動整理した魚図鑑です。画像のある魚を優先して、サイズ、価格、レア度、説明をまとめて表示します。",
    empty: "現在のフィルター条件に合う魚データはありません。",
    filterLabel: "フィルター",
    filterRarityLabel: "レア度",
    filterTerrainLabel: "地形",
    filterAllRarity: "すべてのレア度",
    filterAllTerrain: "すべての地形",
    labels: {
      rarity: "レア度",
      rarityNames: {
        "1": "がらくた",
        "2": "普通",
        "3": "珍しい",
        "4": "希少",
        "5": "叙事詩",
        "6": "伝説",
        "7": "神級",
        "8": "ぶっ壊れ",
      },
      terrainNames: {
        近岸: "沿岸",
        渔场: "漁場",
        河流中下游: "河川中下流",
      },
      size: "サイズ",
      unitPrice: "単価",
      effect: "効果",
      terrain: "地形",
      realDistribution: "分布",
      missing: "この魚は画像だけ登録されており、詳細データはまだ表に追加されていません。",
    },
  },
  en: {
    eyebrow: "Catalog",
    title: "Fishing Catalog",
    description:
      "An auto-organized fish catalog built from your fish art folder and the latest spreadsheet. It shows thumbnail cards with size, price, rarity, and short notes whenever metadata is available.",
    empty: "No fish entries match the current filters.",
    filterLabel: "Filter",
    filterRarityLabel: "Rarity",
    filterTerrainLabel: "Terrain",
    filterAllRarity: "All rarities",
    filterAllTerrain: "All terrain",
    labels: {
      rarity: "Rarity",
      rarityNames: {
        "1": "Junk",
        "2": "Common",
        "3": "Uncommon",
        "4": "Rare",
        "5": "Epic",
        "6": "Legendary",
        "7": "Divine",
        "8": "Overpowered",
      },
      terrainNames: {
        近岸: "Nearshore",
        渔场: "Fishing Grounds",
        河流中下游: "Mid-lower Rivers",
      },
      size: "Size",
      unitPrice: "Price",
      effect: "Effect",
      terrain: "Terrain",
      realDistribution: "Range",
      missing: "This fish currently only has artwork; detailed metadata has not been filled in yet.",
    },
  },
} as const;

const splitTerrainCategory = (terrainCategory?: string) => {
  return terrainCategory
    ?.split(/\s*,\s*/)
    .map((segment) => segment.trim())
    .filter(Boolean) ?? [];
};

export const FishCatalog = () => {
  const { language } = useI18n();
  const [selectedRarity, setSelectedRarity] = useState<string>("all");
  const [selectedTerrain, setSelectedTerrain] = useState<string>("all");
  const currentCopy = copy[language] ?? copy.en;
  const rawItems = fishCatalog as CatalogItem[];

  const terrainOptions = useMemo(() => {
    const discoveredTerrains = Array.from(
      new Set(rawItems.flatMap((item) => splitTerrainCategory(item.terrainCategory))),
    );

    return discoveredTerrains.sort((left, right) => {
      const leftIndex = terrainOrder.indexOf(left as (typeof terrainOrder)[number]);
      const rightIndex = terrainOrder.indexOf(right as (typeof terrainOrder)[number]);

      if (leftIndex === -1 && rightIndex === -1) {
        return left.localeCompare(right, "zh-CN");
      }

      if (leftIndex === -1) {
        return 1;
      }

      if (rightIndex === -1) {
        return -1;
      }

      return leftIndex - rightIndex;
    });
  }, [rawItems]);

  const filteredRawItems = rawItems.filter((item) => {
    const rarityMatch = selectedRarity === "all" || item.rarity === selectedRarity;
    const terrainMatch =
      selectedTerrain === "all" ||
      splitTerrainCategory(item.terrainCategory).includes(selectedTerrain);

    return rarityMatch && terrainMatch;
  });

  const filteredItems = localizeFishCatalogItems(filteredRawItems, language);

  const triggerClassName = [
    "mt-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-transparent transition-colors lg:mt-8",
    selectedRarity === "all" && selectedTerrain === "all"
      ? "text-default-300 hover:text-default-50"
      : "text-default-100 hover:text-white",
  ].join(" ");

  const selectedKeys = [`rarity:${selectedRarity}`, `terrain:${selectedTerrain}`];

  const headerAccessory = (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <button
          type="button"
          className={triggerClassName}
          aria-label={currentCopy.filterLabel}
          title={currentCopy.filterLabel}
        >
          <FilterIcon size={28} />
        </button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label={currentCopy.filterLabel}
        closeOnSelect={false}
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onAction={(key) => {
          const [group, value] = String(key).split(":");

          if (group === "rarity") {
            setSelectedRarity(value);
          }

          if (group === "terrain") {
            setSelectedTerrain(value);
          }
        }}
      >
        <DropdownSection title={currentCopy.filterRarityLabel}>
          <>
            <DropdownItem key="rarity:all">{currentCopy.filterAllRarity}</DropdownItem>
            {rarityOrder.map((rarity) => (
              <DropdownItem key={`rarity:${rarity}`}>
                {currentCopy.labels.rarityNames[rarity]}
              </DropdownItem>
            ))}
          </>
        </DropdownSection>
        <DropdownSection title={currentCopy.filterTerrainLabel}>
          <>
            <DropdownItem key="terrain:all">{currentCopy.filterAllTerrain}</DropdownItem>
            {terrainOptions.map((terrain) => (
              <DropdownItem key={`terrain:${terrain}`}>
                {currentCopy.labels.terrainNames[
                  terrain as keyof typeof currentCopy.labels.terrainNames
                ] ?? terrain}
              </DropdownItem>
            ))}
          </>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );

  return (
    <CatalogGallery
      eyebrow={currentCopy.eyebrow}
      title={currentCopy.title}
      description={currentCopy.description}
      emptyDescription={currentCopy.empty}
      headerAccessory={headerAccessory}
      labels={currentCopy.labels}
      items={filteredItems}
      accentClassName="text-sky-500"
    />
  );
};
