"use client";

import Link from "next/link";
import React from "react";
import { Button, Input } from "@nextui-org/react";
import { useI18n } from "@/components/i18n/i18n-provider";
import { DotsIcon } from "@/components/icons/accounts/dots-icon";
import { ExportIcon } from "@/components/icons/accounts/export-icon";
import { InfoIcon } from "@/components/icons/accounts/info-icon";
import { TrashIcon } from "@/components/icons/accounts/trash-icon";
import { HouseIcon } from "@/components/icons/breadcrumb/house-icon";
import { UsersIcon } from "@/components/icons/breadcrumb/users-icon";
import { SettingsIcon } from "@/components/icons/sidebar/settings-icon";
import { TableWrapper } from "@/components/table/table";
import { AddUser } from "./add-user";

export const Accounts = () => {
  const { t } = useI18n();

  return (
    <div className="mx-auto my-14 flex w-full max-w-[95rem] flex-col gap-4 lg:px-6">
      <ul className="flex">
        <li className="flex gap-2">
          <HouseIcon />
          <Link href="/homepage">
            <span>{t("common.home")}</span>
          </Link>
          <span> / </span>
        </li>

        <li className="flex gap-2">
          <UsersIcon />
          <span>{t("common.users")}</span>
          <span> / </span>
        </li>
        <li className="flex gap-2">
          <span>{t("common.list")}</span>
        </li>
      </ul>

      <h3 className="text-xl font-semibold">{t("accounts.allAccounts")}</h3>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 md:flex-nowrap">
          <Input
            classNames={{
              input: "w-full",
              mainWrapper: "w-full",
            }}
            placeholder={t("common.searchUsers")}
          />
          <SettingsIcon />
          <TrashIcon />
          <InfoIcon />
          <DotsIcon />
        </div>
        <div className="flex flex-row flex-wrap gap-3.5">
          <AddUser />
          <Button color="primary" startContent={<ExportIcon />}>
            {t("common.exportToCsv")}
          </Button>
        </div>
      </div>
      <div className="mx-auto w-full max-w-[95rem]">
        <TableWrapper />
      </div>
    </div>
  );
};
