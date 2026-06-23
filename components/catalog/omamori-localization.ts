import type { Language } from "@/components/i18n/messages";
import type { CatalogItem } from "./catalog-gallery";

type LocalizedText = Partial<Record<Language, string>>;

const omamoriNameTranslationsById: Record<string, LocalizedText> = {
  "3001": {
    "zh-CN": "包札（大）",
    "zh-TW": "包札（大）",
    en: "Wrapped Talisman (Large)",
  },
  "3002": {
    "zh-CN": "商业繁盛札（大）",
    "zh-TW": "商業繁昌札（大）",
    en: "Business Prosperity Talisman (Large)",
  },
  "3003": {
    "zh-CN": "除厄札",
    "zh-TW": "除厄札",
    en: "Evil-Dispelling Talisman",
  },
  "3004": {
    "zh-CN": "除厄御守",
    "zh-TW": "除厄御守",
    en: "Protection Omamori",
  },
  "3005": {
    "zh-CN": "特别御守",
    "zh-TW": "特別御守",
    en: "Special Omamori",
  },
  "3006": {
    "zh-CN": "稻荷御守（紫）",
    "zh-TW": "稻荷御守（紫）",
    en: "Inari Omamori (Purple)",
  },
  "3007": {
    "zh-CN": "稻荷御守（红）",
    "zh-TW": "稻荷御守（紅）",
    en: "Inari Omamori (Red)",
  },
  "3008": {
    "zh-CN": "车体御守",
    "zh-TW": "車體御守",
    en: "Vehicle Omamori",
  },
  "3009": {
    "zh-CN": "肌守（自行车、贴身用）",
    "zh-TW": "肌守（自行車、貼身用）",
    en: "Personal Charm (Bike / Carry-on)",
  },
  "3010": {
    "zh-CN": "商业繁盛御守",
    "zh-TW": "商業繁昌御守",
    en: "Business Prosperity Omamori",
  },
  "3011": {
    "zh-CN": "事业御守",
    "zh-TW": "事業御守",
    en: "Work Omamori",
  },
  "3012": {
    "zh-CN": "福钱御守",
    "zh-TW": "福錢御守",
    en: "Lucky Coin Omamori",
  },
  "3013": {
    "zh-CN": "宝御守",
    "zh-TW": "寶御守",
    en: "Treasure Omamori",
  },
  "3014": {
    "zh-CN": "学德御守",
    "zh-TW": "學德御守",
    en: "Academic Blessing Omamori",
  },
  "3015": {
    "zh-CN": "合格御守",
    "zh-TW": "合格御守",
    en: "Exam Success Omamori",
  },
  "3016": {
    "zh-CN": "御守",
    "zh-TW": "御守",
    en: "Omamori",
  },
  "3017": {
    "zh-CN": "达成御守",
    "zh-TW": "達成御守",
    en: "Achievement Omamori",
  },
  "3018": {
    "zh-CN": "身体健全御守",
    "zh-TW": "身體健全御守",
    en: "Health Omamori",
  },
  "3019": {
    "zh-CN": "病气平愈御守（桐盒装）",
    "zh-TW": "病氣平癒御守（桐盒裝）",
    en: "Healing Omamori (Paulownia Box)",
  },
};

const getLocalizedName = (item: CatalogItem, language: Language) => {
  if (language === "ja") {
    return item.name;
  }

  return omamoriNameTranslationsById[item.id]?.[language] ?? item.name;
};

export const localizeOmamoriCatalogItems = (
  items: CatalogItem[],
  language: Language,
) => {
  return items.map((item) => ({
    ...item,
    name: getLocalizedName(item, language),
  }));
};
