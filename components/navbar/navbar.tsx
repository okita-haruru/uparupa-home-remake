import { Link, Navbar, NavbarContent } from "@nextui-org/react";
import React from "react";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";
import { DarkModeSwitch } from "@/components/navbar/darkmodeswitch";
import { QqButton } from "@/components/navbar/qq-button";
import { SearchBar } from "@/components/navbar/searchbar";
import { GithubIcon } from "../icons/navbar/github-icon";
import { BurguerButton } from "./burguer-button";

interface Props {
  children: React.ReactNode;
}

export const NavbarWrapper = ({ children }: Props) => {
  const navIconLinkClassName =
    "inline-flex h-10 w-10 items-center justify-center rounded-full bg-transparent text-default-600 transition-colors hover:text-default-900";

  return (
    <div className="relative flex max-h-dvh flex-1 flex-col overflow-y-scroll overflow-x-hidden">
      <Navbar
        isBordered
        className="w-full"
        classNames={{
          wrapper: "w-full max-w-full",
        }}
      >
        <NavbarContent className="md:hidden">
          <BurguerButton />
        </NavbarContent>
        <NavbarContent className="w-full max-md:hidden">
          <SearchBar />
        </NavbarContent>
        <NavbarContent
          justify="end"
          className="w-fit items-center gap-1.5 data-[justify=end]:flex-grow-0"
        >
          <QqButton />
          <Link
            href="https://github.com/Ave-CRYCHIC"
            target="_blank"
            className={navIconLinkClassName}
            aria-label="GitHub"
          >
            <GithubIcon />
          </Link>
          <DarkModeSwitch />
          <LanguageSwitcher />
        </NavbarContent>
      </Navbar>
      {children}
    </div>
  );
};
