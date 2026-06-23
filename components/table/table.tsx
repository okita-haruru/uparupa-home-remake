"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useI18n } from "@/components/i18n/i18n-provider";
import { users } from "./data";
import { RenderCell } from "./render-cell";

export const TableWrapper = () => {
  const { t } = useI18n();
  const columns = [
    { name: t("common.rank"), uid: "ranking" },
    { name: t("common.player"), uid: "name" },
    { name: t("richRanking.balance"), uid: "balance" },
  ];

  return (
    <div className="flex w-full flex-col gap-4">
      <Table aria-label={t("accounts.allAccounts")}>
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              hideHeader={column.uid === "actions"}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={users}>
          {(item) => (
            <TableRow>
              {(columnKey) => (
                <TableCell>{RenderCell({ user: item, columnKey })}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
