import type { Language } from "@/components/i18n/messages";

export type EventRegion = "china" | "japan" | "usa";
export type EventSeason = "spring" | "summer" | "autumn" | "winter";
export type EventTier = "sm" | "md" | "lg";

export interface LocalizedText {
  "zh-CN": string;
  "zh-TW": string;
  ja: string;
  en: string;
}

export interface ActivityEvent {
  id: string;
  month: number;
  day: number;
  region: EventRegion;
  season: EventSeason;
  tier: EventTier;
  title: LocalizedText;
  summary: LocalizedText;
}

export const seasonLabels: Record<
  EventSeason,
  { date: [number, number]; label: LocalizedText }
> = {
  spring: {
    date: [3, 20],
    label: {
      "zh-CN": "春分",
      "zh-TW": "春分",
      ja: "春分",
      en: "Spring Equinox",
    },
  },
  summer: {
    date: [6, 21],
    label: {
      "zh-CN": "夏至",
      "zh-TW": "夏至",
      ja: "夏至",
      en: "Summer Solstice",
    },
  },
  autumn: {
    date: [9, 22],
    label: {
      "zh-CN": "秋分",
      "zh-TW": "秋分",
      ja: "秋分",
      en: "Autumn Equinox",
    },
  },
  winter: {
    date: [12, 21],
    label: {
      "zh-CN": "冬至",
      "zh-TW": "冬至",
      ja: "冬至",
      en: "Winter Solstice",
    },
  },
};

export const regionLabels: Record<EventRegion, LocalizedText> = {
  china: {
    "zh-CN": "中国",
    "zh-TW": "中國",
    ja: "中国",
    en: "China",
  },
  japan: {
    "zh-CN": "日本",
    "zh-TW": "日本",
    ja: "日本",
    en: "Japan",
  },
  usa: {
    "zh-CN": "美国",
    "zh-TW": "美國",
    ja: "アメリカ",
    en: "United States",
  },
};

export const activityPageCopy: Record<
  Language,
  {
    eyebrow: string;
    title: string;
    description: string;
    scrollHint: string;
    timelineTitle: string;
    activeEvent: string;
    currentWindow: string;
    regionTitle: string;
  }
> = {
  "zh-CN": {
    eyebrow: "Catalog",
    title: "节日图鉴",
    description:
      "把滚轮当成时间轴拖拽器来用就好。这一版先按 2026 年的中国、日本与美国大节日做预览，后面很适合继续接你们服务器自己的活动卡。",
    scrollHint: "滚轮上下滚动即可横向浏览卡片",
    timelineTitle: "年度时间轴",
    activeEvent: "当前焦点",
    currentWindow: "2026 节日日历预览",
    regionTitle: "节日区域",
  },
  "zh-TW": {
    eyebrow: "Catalog",
    title: "節日圖鑑",
    description:
      "把滾輪當成時間軸拖曳器來用就好。這一版先按 2026 年的中國、日本與美國大節日做預覽，之後很適合繼續接你們伺服器自己的活動卡。",
    scrollHint: "上下滾動滾輪即可橫向瀏覽卡片",
    timelineTitle: "年度時間軸",
    activeEvent: "目前焦點",
    currentWindow: "2026 節日日曆預覽",
    regionTitle: "節日區域",
  },
  ja: {
    eyebrow: "Catalog",
    title: "イベント年表",
    description:
      "マウスホイールで横に流れるイベントカードをめくる構成です。まずは 2026 年の中国、日本、アメリカの主要祝祭日を入れて、全体の見え方を固めています。",
    scrollHint: "ホイールを上下に動かすと横方向へスクロールします",
    timelineTitle: "年間タイムライン",
    activeEvent: "現在のフォーカス",
    currentWindow: "2026 festival preview",
    regionTitle: "地域",
  },
  en: {
    eyebrow: "Catalog",
    title: "Festival Timeline",
    description:
      "Use your mouse wheel like a timeline scrubber. This first pass previews major 2026 festivals from China, Japan, and the United States, so later we can slot in your own server events on top.",
    scrollHint: "Scroll vertically to move sideways through the cards",
    timelineTitle: "Year Timeline",
    activeEvent: "Active event",
    currentWindow: "2026 festival preview",
    regionTitle: "Region",
  },
};

export const activityEvents: ActivityEvent[] = [
  {
    id: "jp-new-year",
    month: 1,
    day: 1,
    region: "japan",
    season: "winter",
    tier: "md",
    title: {
      "zh-CN": "正月",
      "zh-TW": "正月",
      ja: "正月",
      en: "Shogatsu",
    },
    summary: {
      "zh-CN": "开年参拜、御守与新年登录礼很适合做成和风首页氛围。",
      "zh-TW": "開年參拜、御守與新年登入禮很適合做成和風首頁氛圍。",
      ja: "初詣、御守、お年玉ログインボーナスの空気感が強い新年カード。",
      en: "A strong New Year card for shrine visits, talismans, and first-login gifts.",
    },
  },
  {
    id: "cn-spring-festival",
    month: 2,
    day: 17,
    region: "china",
    season: "winter",
    tier: "lg",
    title: {
      "zh-CN": "春节",
      "zh-TW": "春節",
      ja: "春節",
      en: "Spring Festival",
    },
    summary: {
      "zh-CN": "红包、烟花、年兽和彩灯都可以围着它做成年度最大活动。",
      "zh-TW": "紅包、煙花、年獸和彩燈都可以圍著它做成年內最大活動。",
      ja: "紅包、花火、灯籠、年獣モチーフまで広げやすい大型イベント。",
      en: "The biggest annual tentpole: red envelopes, fireworks, lanterns, and festive monsters.",
    },
  },
  {
    id: "jp-foundation-day",
    month: 2,
    day: 11,
    region: "japan",
    season: "winter",
    tier: "sm",
    title: {
      "zh-CN": "建国纪念日",
      "zh-TW": "建國紀念日",
      ja: "建国記念の日",
      en: "National Foundation Day",
    },
    summary: {
      "zh-CN": "适合做日本主题装饰、签到任务和历史感的节日点缀。",
      "zh-TW": "適合做日本主題裝飾、簽到任務與歷史感的小型活動。",
      ja: "和風装飾や静かな記念タスクに向いた、落ち着いた祝日カード。",
      en: "A quieter holiday card for Japanese decor, check-ins, and heritage-flavored tasks.",
    },
  },
  {
    id: "us-valentines",
    month: 2,
    day: 14,
    region: "usa",
    season: "winter",
    tier: "sm",
    title: {
      "zh-CN": "情人节",
      "zh-TW": "情人節",
      ja: "バレンタインデー",
      en: "Valentine's Day",
    },
    summary: {
      "zh-CN": "很适合做限定糖果、双人任务和粉红系装饰。",
      "zh-TW": "很適合做限定糖果、雙人任務與粉紅系裝飾。",
      ja: "限定スイーツやペアクエスト、ピンク系の装飾で映える一枚。",
      en: "Great for seasonal sweets, paired quests, and soft pink event dressing.",
    },
  },
  {
    id: "cn-lantern",
    month: 3,
    day: 3,
    region: "china",
    season: "spring",
    tier: "md",
    title: {
      "zh-CN": "元宵节",
      "zh-TW": "元宵節",
      ja: "元宵節",
      en: "Lantern Festival",
    },
    summary: {
      "zh-CN": "灯会、灯谜、夜景和元宵奖励会让这张卡在春分前特别漂亮。",
      "zh-TW": "燈會、燈謎、夜景與元宵獎勵會讓這張卡在春分前特別漂亮。",
      ja: "灯会、夜景、謎かけ系ミッションと相性の良い春先イベント。",
      en: "Lantern shows, riddles, and night-sky rewards make this a strong early-spring card.",
    },
  },
  {
    id: "jp-hinamatsuri",
    month: 3,
    day: 3,
    region: "japan",
    season: "spring",
    tier: "sm",
    title: {
      "zh-CN": "雏祭",
      "zh-TW": "雛祭",
      ja: "ひな祭り",
      en: "Hinamatsuri",
    },
    summary: {
      "zh-CN": "桃花、纸偶与室内和风摆设都很适合做成柔和的春季节点。",
      "zh-TW": "桃花、紙偶與室內和風擺設都很適合做成柔和的春季節點。",
      ja: "桃の節句らしい柔らかい配色と飾り付けが映える祝祭日。",
      en: "Soft spring colors, dolls, and delicate interiors make for a gentle seasonal beat.",
    },
  },
  {
    id: "cn-qingming",
    month: 4,
    day: 5,
    region: "china",
    season: "spring",
    tier: "md",
    title: {
      "zh-CN": "清明节",
      "zh-TW": "清明節",
      ja: "清明節",
      en: "Qingming Festival",
    },
    summary: {
      "zh-CN": "更偏春游与追思气质，适合做淡雅一点的草地与青团主题活动。",
      "zh-TW": "更偏春遊與追思氣質，適合做淡雅一點的草地與青團主題活動。",
      ja: "春の野遊びと静かな追想を合わせた、落ち着いたイベントに向く日。",
      en: "A quieter spring moment for picnics, soft greens, and reflective seasonal quests.",
    },
  },
  {
    id: "us-easter",
    month: 4,
    day: 5,
    region: "usa",
    season: "spring",
    tier: "sm",
    title: {
      "zh-CN": "复活节",
      "zh-TW": "復活節",
      ja: "イースター",
      en: "Easter",
    },
    summary: {
      "zh-CN": "彩蛋搜集、兔子装饰和草地寻宝都很适合做成轻快小活动。",
      "zh-TW": "彩蛋蒐集、兔子裝飾與草地尋寶都很適合做成輕快小活動。",
      ja: "エッグハントやウサギ装飾で軽やかな春イベントにしやすい日。",
      en: "Egg hunts, bunny props, and meadow treasure hunts make this easy to plug in.",
    },
  },
  {
    id: "jp-golden-week",
    month: 5,
    day: 3,
    region: "japan",
    season: "spring",
    tier: "lg",
    title: {
      "zh-CN": "黄金周",
      "zh-TW": "黃金週",
      ja: "ゴールデンウィーク",
      en: "Golden Week",
    },
    summary: {
      "zh-CN": "这是很适合做长档期连续活动的一周，登录奖励和旅行主题都能接进去。",
      "zh-TW": "這是很適合做長檔期連續活動的一週，登入獎勵與旅行主題都能接進去。",
      ja: "連続ログイン報酬や旅路モチーフをまとめて受け止められる大型連休。",
      en: "A perfect long-run slot for travel themes, login chains, and layered mini-events.",
    },
  },
  {
    id: "cn-dragon-boat",
    month: 6,
    day: 19,
    region: "china",
    season: "summer",
    tier: "md",
    title: {
      "zh-CN": "端午节",
      "zh-TW": "端午節",
      ja: "端午節",
      en: "Dragon Boat Festival",
    },
    summary: {
      "zh-CN": "龙舟竞速、粽子掉落和水域玩法都能很好地挂在这张卡上。",
      "zh-TW": "龍舟競速、粽子掉落與水域玩法都能很好地掛在這張卡上。",
      ja: "水辺アクティビティ、競走、限定フード報酬に向いた夏前イベント。",
      en: "Water routes, races, and festival food drops all sit naturally on this summer card.",
    },
  },
  {
    id: "us-independence-day",
    month: 7,
    day: 4,
    region: "usa",
    season: "summer",
    tier: "md",
    title: {
      "zh-CN": "独立日",
      "zh-TW": "獨立日",
      ja: "独立記念日",
      en: "Independence Day",
    },
    summary: {
      "zh-CN": "烟花、游行和夏夜庆典感会非常强，适合做高饱和度的夜间活动。",
      "zh-TW": "煙花、遊行與夏夜慶典感會非常強，適合做高飽和度的夜間活動。",
      ja: "花火とパレードの派手さを前面に出せる、真夏の大型イベント向け。",
      en: "Fireworks, parades, and bold summer-night energy make this a vivid showcase card.",
    },
  },
  {
    id: "jp-tanabata",
    month: 7,
    day: 7,
    region: "japan",
    season: "summer",
    tier: "md",
    title: {
      "zh-CN": "七夕",
      "zh-TW": "七夕",
      ja: "七夕",
      en: "Tanabata",
    },
    summary: {
      "zh-CN": "短册、愿望树和星空桥段非常适合做成双人或社区型活动。",
      "zh-TW": "短冊、願望樹與星空橋段非常適合做成雙人或社群型活動。",
      ja: "短冊、願い事、星空の演出で二人組や共同達成型イベントに向く。",
      en: "Wish strips, starry skies, and paired goals make this a naturally social summer event.",
    },
  },
  {
    id: "jp-obon",
    month: 8,
    day: 13,
    region: "japan",
    season: "summer",
    tier: "lg",
    title: {
      "zh-CN": "盂兰盆节",
      "zh-TW": "盂蘭盆節",
      ja: "お盆",
      en: "Obon",
    },
    summary: {
      "zh-CN": "灯火、返乡、夜祭和静谧夏夜都能把这张卡撑成很有氛围的大节日。",
      "zh-TW": "燈火、返鄉、夜祭與靜謐夏夜都能把這張卡撐成很有氛圍的大節日。",
      ja: "灯火と帰省、夜祭の余韻で空気感を大きく作れる真夏の主役級イベント。",
      en: "Lanterns, homecoming, and quiet summer nights make this one of the moodiest big cards.",
    },
  },
  {
    id: "cn-mid-autumn",
    month: 9,
    day: 25,
    region: "china",
    season: "autumn",
    tier: "lg",
    title: {
      "zh-CN": "中秋节",
      "zh-TW": "中秋節",
      ja: "中秋節",
      en: "Mid-Autumn Festival",
    },
    summary: {
      "zh-CN": "赏月、月饼、灯笼和夜景最适合做成整年里最漂亮的一张秋季卡。",
      "zh-TW": "賞月、月餅、燈籠與夜景最適合做成整年裡最漂亮的一張秋季卡。",
      ja: "月見、提灯、夜景演出で秋の看板イベントにしやすい一枚。",
      en: "Moon viewing, lanterns, and night-sky rewards give autumn its most cinematic card.",
    },
  },
  {
    id: "cn-national-day",
    month: 10,
    day: 1,
    region: "china",
    season: "autumn",
    tier: "md",
    title: {
      "zh-CN": "国庆节",
      "zh-TW": "國慶節",
      ja: "国慶節",
      en: "National Day",
    },
    summary: {
      "zh-CN": "长假、烟花、签到奖励和主城装饰都很适合挂在这里。",
      "zh-TW": "長假、煙花、簽到獎勵與主城裝飾都很適合掛在這裡。",
      ja: "長期ログイン施策や街の飾り替えと相性の良い大型連休カード。",
      en: "Long holiday rewards, fireworks, and city decorations fit cleanly into this slot.",
    },
  },
  {
    id: "us-halloween",
    month: 10,
    day: 31,
    region: "usa",
    season: "autumn",
    tier: "md",
    title: {
      "zh-CN": "万圣节",
      "zh-TW": "萬聖節",
      ja: "ハロウィン",
      en: "Halloween",
    },
    summary: {
      "zh-CN": "南瓜、幽灵、糖果和换装最适合做成高辨识度的秋夜活动。",
      "zh-TW": "南瓜、幽靈、糖果與換裝最適合做成高辨識度的秋夜活動。",
      ja: "カボチャ、ゴースト、仮装の要素で一気に世界観を変えられる夜祭カード。",
      en: "Pumpkins, ghosts, candy, and costumes make this an instant visual switch-up.",
    },
  },
  {
    id: "jp-shichi-go-san",
    month: 11,
    day: 15,
    region: "japan",
    season: "autumn",
    tier: "sm",
    title: {
      "zh-CN": "七五三",
      "zh-TW": "七五三",
      ja: "七五三",
      en: "Shichi-Go-San",
    },
    summary: {
      "zh-CN": "家庭、成长与祈愿主题很适合作为秋季尾声的小型节点。",
      "zh-TW": "家庭、成長與祈願主題很適合作為秋季尾聲的小型節點。",
      ja: "家族や成長祈願の空気を静かに入れられる、晩秋の小さな節目。",
      en: "A gentler late-autumn beat for family, growth, and blessing-themed rewards.",
    },
  },
  {
    id: "us-thanksgiving",
    month: 11,
    day: 26,
    region: "usa",
    season: "autumn",
    tier: "md",
    title: {
      "zh-CN": "感恩节",
      "zh-TW": "感恩節",
      ja: "感謝祭",
      en: "Thanksgiving",
    },
    summary: {
      "zh-CN": "丰收、晚餐、合作任务和温暖灯光都很适合做成偏社区向的活动。",
      "zh-TW": "豐收、晚餐、合作任務與溫暖燈光都很適合做成偏社群向的活動。",
      ja: "収穫祭や共同ディナー、暖色の装飾でコミュニティ感を出しやすい祝日。",
      en: "Harvest tables, co-op dinners, and warm lights make this a very communal event card.",
    },
  },
  {
    id: "us-christmas",
    month: 12,
    day: 25,
    region: "usa",
    season: "winter",
    tier: "lg",
    title: {
      "zh-CN": "圣诞节",
      "zh-TW": "聖誕節",
      ja: "クリスマス",
      en: "Christmas",
    },
    summary: {
      "zh-CN": "下雪、礼物、铃铛和夜灯会让冬季主视觉一下子完整起来。",
      "zh-TW": "下雪、禮物、鈴鐺與夜燈會讓冬季主視覺一下子完整起來。",
      ja: "雪、ギフト、イルミネーションで冬の主役ビジュアルを一気に作れる日。",
      en: "Snow, gifts, bells, and lights make this an easy winter headliner.",
    },
  },
  {
    id: "jp-omisoka",
    month: 12,
    day: 31,
    region: "japan",
    season: "winter",
    tier: "md",
    title: {
      "zh-CN": "大晦日",
      "zh-TW": "大晦日",
      ja: "大晦日",
      en: "Omisoka",
    },
    summary: {
      "zh-CN": "跨年倒数、除夜钟和一年的纪念回顾都适合放在最后一张卡收尾。",
      "zh-TW": "跨年倒數、除夜鐘與一年的紀念回顧都適合放在最後一張卡收尾。",
      ja: "年越しカウントダウンと除夜の鐘で、一年の終わりを締めるラストカード。",
      en: "A natural final card for countdowns, bells, and a year-end sendoff.",
    },
  },
];
