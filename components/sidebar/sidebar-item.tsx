import NextLink from "next/link";
import React from "react";
import {useSidebarContext} from "../layout/layout-context";
import clsx from "clsx";
import {FaExternalLinkAlt} from "react-icons/fa";

interface Props {
  title: string;
  icon: React.ReactNode;
  isActive?: boolean;
  href?: string;
}

export const SidebarItem = ({icon, title, isActive, href = ""}: Props) => {
  const {collapsed, setCollapsed} = useSidebarContext();
  const isExternal = href?.startsWith("http");
  const activeClassName =
    "bg-[#8ca8e7] text-[#0f172a] hover:bg-[#9bb3e9] [&_span]:text-[#0f172a] [&_svg]:text-[#0f172a] [&_svg_path]:fill-[#0f172a]";
  const inactiveClassName =
    "text-default-900 hover:bg-[#8ca8e7]/14";

  const handleClick = () => {
    if (window.innerWidth < 768) {
      setCollapsed();
    }
  };
  return (
    <NextLink
      href={href}
      className="text-default-900 active:bg-none max-w-full"
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer noopener" : undefined}
    >
      <div
        className={clsx(
          isActive ? activeClassName : inactiveClassName,
          "flex gap-2 w-full min-h-[44px] h-full items-center px-3.5 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98]"
        )}
        onClick={handleClick}
      >
        {icon}
        <span>{title}</span>
        {isExternal && <FaExternalLinkAlt size={10}/>}
      </div>
    </NextLink>
  );
};
