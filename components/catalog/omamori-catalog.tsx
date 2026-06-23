"use client";

import { useI18n } from "@/components/i18n/i18n-provider";
import omamoriCatalog from "@/data/catalog/omamori-catalog.json";
import { CatalogGallery, CatalogItem } from "./catalog-gallery";
import { localizeOmamoriCatalogItems } from "./omamori-localization";

const copy = {
  "zh-CN": {
    eyebrow: "Catalog",
    title: "御守图鉴",
    description:
      "根据你给的御守素材图自动生成的御守卡片。现在先按名称整理，后面如果你给我更完整的设定，我可以继续补成正式图鉴。",
    empty: "暂时还没有可展示的御守资料。",
    labels: {
      rarity: "稀有度",
      size: "尺寸",
      unitPrice: "价格",
      effect: "效果",
      terrain: "分类",
      realDistribution: "来源",
      missing: "这枚御守目前只有素材图，详细设定还没补进来。",
    },
  },
  "zh-TW": {
    eyebrow: "Catalog",
    title: "御守圖鑑",
    description:
      "根據你提供的御守素材圖自動生成的御守卡片。目前先依照名稱整理，之後如果你提供更完整的設定，我可以再補成正式圖鑑。",
    empty: "暫時還沒有可展示的御守資料。",
    labels: {
      rarity: "稀有度",
      size: "尺寸",
      unitPrice: "價格",
      effect: "效果",
      terrain: "分類",
      realDistribution: "來源",
      missing: "這枚御守目前只有素材圖，詳細設定還沒補進來。",
    },
  },
  ja: {
    eyebrow: "Catalog",
    title: "お守り図鑑",
    description:
      "お守り素材フォルダから自動生成したカード一覧です。今は名前を中心に整理していて、設定資料が増えればもっと本格的な図鑑にできます。",
    empty: "表示できるお守りデータはまだありません。",
    labels: {
      rarity: "レア度",
      size: "サイズ",
      unitPrice: "価格",
      effect: "効果",
      terrain: "分類",
      realDistribution: "出典",
      missing: "このお守りは画像だけ登録されており、詳しい設定はまだありません。",
    },
  },
  en: {
    eyebrow: "Catalog",
    title: "Omamori Catalog",
    description:
      "A card gallery generated from your omamori art folder. For now it focuses on the artwork and display names, and we can expand it later with richer lore or effects.",
    empty: "No omamori entries are available yet.",
    labels: {
      rarity: "Rarity",
      size: "Size",
      unitPrice: "Price",
      effect: "Effect",
      terrain: "Type",
      realDistribution: "Source",
      missing: "This omamori currently only has artwork; detailed lore has not been added yet.",
    },
  },
} as const;

export const OmamoriCatalog = () => {
  const { language } = useI18n();
  const currentCopy = copy[language] ?? copy.en;
  const localizedItems = localizeOmamoriCatalogItems(
    omamoriCatalog as CatalogItem[],
    language,
  );

  return (
    <CatalogGallery
      eyebrow={currentCopy.eyebrow}
      title={currentCopy.title}
      description={currentCopy.description}
      emptyDescription={currentCopy.empty}
      labels={currentCopy.labels}
      items={localizedItems}
      accentClassName="text-amber-500"
    />
  );
};
