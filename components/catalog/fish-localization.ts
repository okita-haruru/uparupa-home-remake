import type { Language } from "@/components/i18n/messages";
import type { CatalogItem } from "./catalog-gallery";

type LocalizedText = Partial<Record<Language, string>>;

type FishTranslation = {
  name?: LocalizedText;
  summary?: LocalizedText;
};

const effectTranslations: Record<string, LocalizedText> = {
  "poison I (1s)": {
    "zh-TW": "中毒 I（1秒）",
    ja: "毒 I（1秒）",
    en: "Poison I (1s)",
  },
  "saturation VIII (2min)": {
    "zh-TW": "飽食 VIII（2分鐘）",
    ja: "満腹度 VIII（2分）",
    en: "Saturation VIII (2 min)",
  },
};

const fishTranslationsById: Record<string, FishTranslation> = {
  "1012": {
    name: { "zh-TW": "公子小丑魚", ja: "カクレクマノミ", en: "Ocellaris Clownfish" },
    summary: { "zh-TW": "有錢的小丑魚", ja: "お金持ちのクマノミ", en: "A wealthy clownfish" },
  },
  "1013": {
    name: { "zh-TW": "紅小丑魚", ja: "トマトアネモネフィッシュ", en: "Tomato Clownfish" },
    summary: { "zh-TW": "mine！mine！mine！", ja: "mine! mine! mine!", en: "mine! mine! mine!" },
  },
  "1014": {
    name: { "zh-TW": "透紅小丑魚", ja: "ハマクマノミ", en: "Maroon Clownfish" },
    summary: {
      "zh-TW": "透明感的紅小丑魚",
      ja: "透け感のある赤いクマノミ",
      en: "A translucent maroon clownfish",
    },
  },
  "1015": {
    name: { "zh-TW": "香魚", ja: "アユ", en: "Ayu Sweetfish" },
    summary: { "zh-TW": "兄弟你好香", ja: "兄弟、いい匂いだな", en: "Buddy, you smell amazing" },
  },
  "1016": {
    name: { "zh-TW": "花鱸（七星鱸魚）", ja: "スズキ", en: "Japanese Seabass" },
    summary: { "zh-TW": "普通的鱸魚", ja: "普通のスズキ", en: "Just an ordinary seabass" },
  },
  "1019": {
    name: { "zh-TW": "甲魚", ja: "スッポン", en: "Chinese Softshell Turtle" },
    summary: { "zh-TW": "鱉說了", ja: "スッポンがそう言ってる", en: "The softshell turtle has spoken" },
  },
  "1020": {
    name: { "zh-TW": "普通海草", ja: "ふつうの海草", en: "Common Seagrass" },
    summary: { "zh-TW": "是…是魚嗎…", ja: "こ、これって魚…？", en: "I-is this even a fish...?" },
  },
  "1021": {
    name: { "zh-TW": "魚鱗", ja: "魚のうろこ", en: "Fish Scale" },
    summary: { "zh-TW": "普通的魚鱗", ja: "普通の魚のうろこ", en: "Just an ordinary fish scale" },
  },
  "1023": {
    name: { "zh-TW": "金腹雙鋸魚", ja: "モーリシャスアネモネフィッシュ", en: "Mauritian Clownfish" },
    summary: { "zh-TW": "藍色的小丑魚", ja: "青いクマノミ", en: "A blue clownfish" },
  },
  "1024": {
    name: { "zh-TW": "擬刺尾鯛", ja: "ナンヨウハギ", en: "Blue Tang" },
    summary: { "zh-TW": "像藍寶石一樣", ja: "まるでサファイアみたい", en: "Like a sapphire" },
  },
  "1025": {
    name: { "zh-TW": "獅子魚", ja: "ミノカサゴ", en: "Red Lionfish" },
    summary: {
      "zh-TW": "醜萌醜萌的魚（有毒）",
      ja: "キモかわいい魚（毒あり）",
      en: "An ugly-cute fish (poisonous)",
    },
  },
  "1026": {
    name: { "zh-TW": "刺豚", ja: "ハリセンボン", en: "Porcupinefish" },
    summary: { "zh-TW": "好吃死了", ja: "めちゃくちゃ美味しい", en: "Dangerously delicious" },
  },
  "1029": {
    name: { "zh-TW": "刺海馬", ja: "イバラタツ", en: "Thorny Seahorse" },
    summary: { "zh-TW": "男媽媽", ja: "パパなのにママ", en: "A dad with serious mom vibes" },
  },
  "1030": {
    name: { "zh-TW": "管海馬", ja: "タツノオトシゴ", en: "Common Seahorse" },
    summary: { "zh-TW": "男媽媽", ja: "パパなのにママ", en: "A dad with serious mom vibes" },
  },
  "1031": {
    name: { "zh-TW": "北魷魚", ja: "スルメイカ", en: "Japanese Flying Squid" },
    summary: {
      "zh-TW": "魷魚最常見的形態",
      ja: "イカのいちばん定番な姿",
      en: "The most common squid form",
    },
  },
  "1033": {
    name: { "zh-TW": "寬花鱸", ja: "ヒラスズキ", en: "Blackfin Seabass" },
    summary: { "zh-TW": "普通的鱸魚", ja: "普通のスズキ", en: "Just an ordinary seabass" },
  },
  "1034": {
    name: { "zh-TW": "花鮃", ja: "ヒラメ", en: "Chinese Flounder" },
    summary: { "zh-TW": "右鮃", ja: "右向きのヒラメ", en: "A right-eyed flounder" },
  },
  "1035": {
    name: { "zh-TW": "灰鰭棘鯛", ja: "ゴールドシルクシーブリーム", en: "Goldsilk Seabream" },
    summary: { "zh-TW": "常見的鯛", ja: "よく見かけるタイ", en: "A common sea bream" },
  },
  "1036": {
    name: { "zh-TW": "黑鯛", ja: "クロダイ", en: "Black Seabream" },
    summary: { "zh-TW": "好吃的鯛", ja: "美味しいタイ", en: "A tasty sea bream" },
  },
  "1037": {
    name: { "zh-TW": "竹筴魚", ja: "マアジ", en: "Japanese Jack Mackerel" },
    summary: { "zh-TW": "竹筴魚炸物", ja: "アジフライ", en: "Fried horse mackerel" },
  },
  "1038": {
    name: { "zh-TW": "大堡礁雙鋸魚", ja: "スカンクアネモネフィッシュ", en: "Skunk Clownfish" },
    summary: {
      "zh-TW": "大堡礁原住民",
      ja: "グレートバリアリーフの住民",
      en: "Native to the Great Barrier Reef",
    },
  },
  "1039": {
    name: { "zh-TW": "背紋雙鋸魚", ja: "セジロクマノミ", en: "Backstripe Clownfish" },
    summary: { "zh-TW": "顏色怪怪的魚", ja: "色がちょっと変な魚", en: "A strangely colored fish" },
  },
  "1040": {
    name: { "zh-TW": "阿氏雙鋸魚", ja: "アラルディクラウンフィッシュ", en: "Allard's Clownfish" },
    summary: {
      "zh-TW": "金腹雙鋸魚親戚？",
      ja: "モーリシャスクマノミの親戚？",
      en: "Related to the Mauritian clownfish?",
    },
  },
  "1041": {
    name: { "zh-TW": "巴氏雙鋸魚", ja: "バーバリークラウンフィッシュ", en: "Barberi Clownfish" },
    summary: {
      "zh-TW": "紅小丑魚親戚？",
      ja: "トマトクマノミの親戚？",
      en: "Related to the tomato clownfish?",
    },
  },
  "1042": {
    name: { "zh-TW": "二帶雙鋸魚", ja: "ツーバンドクラウンフィッシュ", en: "Two-band Clownfish" },
    summary: { "zh-TW": "漂亮", ja: "きれい", en: "Beautiful" },
  },
  "1043": {
    name: { "zh-TW": "海帶", ja: "コンブ", en: "Kelp" },
    summary: { "zh-TW": "就是普通的海帶", ja: "ただの海藻", en: "Just ordinary kelp" },
  },
  "1044": {
    name: { "zh-TW": "伊勢龍蝦", ja: "イセエビ", en: "Japanese Spiny Lobster" },
    summary: { "zh-TW": "好想吃…", ja: "食べたい…", en: "I really want to eat this..." },
  },
  "1045": {
    name: { "zh-TW": "青龍", ja: "ケブカイセエビ", en: "Scalloped Spiny Lobster" },
    summary: { "zh-TW": "好想吃…", ja: "食べたい…", en: "I really want to eat this..." },
  },
  "1046": {
    name: { "zh-TW": "馬糞海膽", ja: "バフンウニ", en: "Short-spined Sea Urchin" },
    summary: { "zh-TW": "貴貴的海膽", ja: "お高いウニ", en: "A pricey sea urchin" },
  },
  "1047": {
    name: { "zh-TW": "石筆海膽", ja: "ペンシルウニ", en: "Pencil Urchin" },
    summary: {
      "zh-TW": "不太能吃的海膽",
      ja: "あまり食用向きじゃないウニ",
      en: "Not the best sea urchin for eating",
    },
  },
  "1048": {
    name: { "zh-TW": "日本對蝦", ja: "クルマエビ", en: "Kuruma Prawn" },
    summary: {
      "zh-TW": "立本有句古話：蝦頭",
      ja: "昔からこう言う、エビ頭",
      en: "As the old saying goes: shrimp head",
    },
  },
  "1049": {
    name: { "zh-TW": "中國明對蝦", ja: "シロアシエビ", en: "Chinese White Shrimp" },
    summary: { "zh-TW": "日月蝦蝦", ja: "エビエビ", en: "Shrimpy shrimpy" },
  },
  "1050": {
    name: { "zh-TW": "青口", ja: "ムラサキイガイ", en: "Mediterranean Mussel" },
    summary: { "zh-TW": "好吃！！！", ja: "うまい！！！", en: "Delicious!!!" },
  },
  "1051": {
    name: { "zh-TW": "普通生蠔", ja: "マガキ", en: "Pacific Oyster" },
    summary: { "zh-TW": "要放蒜嗎？", ja: "ニンニク入れる？", en: "Should we add garlic?" },
  },
};

const terrainTranslations: Record<string, LocalizedText> = {
  近岸: { "zh-TW": "近岸", ja: "沿岸", en: "Nearshore" },
  渔场: { "zh-TW": "漁場", ja: "漁場", en: "Fishing Grounds" },
  河流中下游: { "zh-TW": "河流中下游", ja: "河川中下流", en: "Mid-lower Rivers" },
};

const distributionTranslations: Record<string, LocalizedText> = {
  热带礁区: { "zh-TW": "熱帶礁區", ja: "熱帯礁域", en: "Tropical Reefs" },
  北海道渔场: { "zh-TW": "北海道漁場", ja: "北海道漁場", en: "Hokkaido Fishing Grounds" },
  河流: { "zh-TW": "河流", ja: "河川", en: "Rivers" },
  湖泊: { "zh-TW": "湖泊", ja: "湖沼", en: "Lakes" },
  近海: { "zh-TW": "近海", ja: "近海", en: "Coastal Waters" },
};

const joinerByLanguage: Record<Language, string> = {
  "zh-CN": "、",
  "zh-TW": "、",
  ja: "・",
  en: ", ",
};

const getLocalizedText = (
  source: string | undefined,
  language: Language,
  translations?: LocalizedText,
) => {
  if (!source) {
    return source;
  }

  if (language === "zh-CN") {
    return source;
  }

  return translations?.[language] ?? source;
};

const translateDelimitedText = (
  source: string | undefined,
  language: Language,
  translations: Record<string, LocalizedText>,
) => {
  if (!source?.trim()) {
    return source;
  }

  const segments = source
    .split(/\s*,\s*/)
    .map((segment) => segment.trim())
    .filter(Boolean)
    .map((segment) => getLocalizedText(segment, language, translations[segment]) ?? segment);

  return segments.join(joinerByLanguage[language]);
};

export const localizeFishCatalogItems = (items: CatalogItem[], language: Language) => {
  return items.map((item) => {
    const translations = fishTranslationsById[item.id];

    return {
      ...item,
      name: getLocalizedText(item.name, language, translations?.name) ?? item.name,
      summary: getLocalizedText(item.summary, language, translations?.summary) ?? item.summary,
      effect: getLocalizedText(item.effect, language, effectTranslations[item.effect ?? ""]) ?? item.effect,
      terrainCategory:
        translateDelimitedText(item.terrainCategory, language, terrainTranslations) ??
        item.terrainCategory,
      realDistribution:
        translateDelimitedText(item.realDistribution, language, distributionTranslations) ??
        item.realDistribution,
    };
  });
};
