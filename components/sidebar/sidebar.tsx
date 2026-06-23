import React from "react";
import { usePathname } from "next/navigation";
import { FaMoneyBillWave, FaUser } from "react-icons/fa";
import { GiFishing, GiLiver, GiTreasureMap } from "react-icons/gi";
import { IoDocumentText } from "react-icons/io5";
import { LuBookOpen, LuFileClock, LuSwords } from "react-icons/lu";
import { useI18n } from "@/components/i18n/i18n-provider";
import { CardTitle } from "@/components/home/card-title";
import { HomeIcon } from "../icons/sidebar/home-icon";
import { useSidebarContext } from "../layout/layout-context";
import { Sidebar } from "./sidebar.styles";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";

const catalogCopyByLanguage = {
  "zh-CN": {
    title: "图鉴",
    fish: "钓鱼图鉴",
  },
  "zh-TW": {
    title: "圖鑑",
    fish: "釣魚圖鑑",
  },
  ja: {
    title: "図鑑",
    fish: "釣り図鑑",
  },
  en: {
    title: "Catalog",
    fish: "Fishing Catalog",
  },
} as const;

const playerCopyByLanguage = {
  "zh-CN": {
    title: "玩家",
    info: "玩家信息",
  },
  "zh-TW": {
    title: "玩家",
    info: "玩家資訊",
  },
  ja: {
    title: "プレイヤー",
    info: "プレイヤー情報",
  },
  en: {
    title: "Players",
    info: "Player Info",
  },
} as const;

export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();
  const { language, t } = useI18n();

  const catalogCopy = catalogCopyByLanguage[language] ?? catalogCopyByLanguage.en;
  const playerCopy = playerCopyByLanguage[language] ?? playerCopyByLanguage.en;

  const navigation = [
    {
      title: t("common.server"),
      items: [
        {
          title: t("common.docs"),
          icon: <IoDocumentText />,
          path: "https://doc.uparupa.town/",
        },
        {
          title: t("common.updateLog"),
          icon: <LuFileClock />,
          path: "/update-log",
        },
      ],
    },
    {
      title: playerCopy.title,
      items: [
        {
          title: playerCopy.info,
          icon: <FaUser />,
          path: "/player-info",
        },
      ],
    },
    {
      title: t("common.rankings"),
      items: [
        {
          title: t("common.treasure"),
          icon: <FaMoneyBillWave />,
          path: "/treasure-ranking",
        },
        {
          title: t("common.fishing"),
          icon: <GiFishing />,
          path: "/fish-ranking",
        },
        {
          title: t("common.kills"),
          icon: <LuSwords />,
          path: "/kills-ranking",
        },
        {
          title: t("common.playtime"),
          icon: <GiLiver />,
          path: "/time-ranking",
        },
      ],
    },
    {
      title: catalogCopy.title,
      items: [
        {
          title: catalogCopy.fish,
          icon: <LuBookImage />,
          path: "/catalog/fish",
        },
      ],
    },
    {
      title: t("common.tools"),
      items: [
        {
          title: t("common.liveMap"),
          icon: <GiTreasureMap />,
          path: "/map",
        },
      ],
    },
  ];

  return (
    <aside className="sticky top-0 z-50 h-screen">
      {collapsed ? <div className={Sidebar.Overlay()} onClick={setCollapsed} /> : null}
      <div
        className={Sidebar({
          collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          <CardTitle />
        </div>
        <div className="flex h-full flex-col justify-between select-none">
          <div className={Sidebar.Body()}>
            <SidebarItem
              title={t("common.functionalZone")}
              icon={<HomeIcon />}
              isActive={pathname === "/homepage"}
              href="/homepage"
            />
            {navigation.map((menu, index) => (
              <SidebarMenu key={`menu-${index}`} title={menu.title}>
                {menu.items.map((menuItem, itemIndex) => (
                  <SidebarItem
                    key={`menu-${index}-${itemIndex}`}
                    title={menuItem.title}
                    icon={menuItem.icon}
                    href={menuItem.path}
                    isActive={pathname.startsWith(menuItem.path)}
                  />
                ))}
              </SidebarMenu>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};
