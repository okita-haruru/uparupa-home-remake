"use client";

import React, { useEffect, useState } from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useI18n } from "@/components/i18n/i18n-provider";
import { fetchKills } from "./data";
import { RenderCellForKillsRanking } from "./render-cell";

export const TableWrapperForKillsRanking = () => {
  const { t } = useI18n();
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [method, setMethod] = useState("total");

  const columns = [
    { name: t("common.rank"), uid: "ranking" },
    { name: t("common.player"), uid: "name" },
    { name: t("killsRanking.warden"), uid: "warden_kills" },
    { name: t("killsRanking.enderDragon"), uid: "ender_dragon_kills" },
    { name: t("killsRanking.wither"), uid: "wither_kills" },
    { name: t("killsRanking.ancientGuardian"), uid: "ancient_guardian_kills" },
    { name: t("killsRanking.phantom"), uid: "phantom_kills" },
    { name: t("killsRanking.piglinBrute"), uid: "piglin_brute_kills" },
    { name: t("killsRanking.totalKills"), uid: "total_kills" },
  ];

  useEffect(() => {
    fetchKills(method, page).then((data) => {
      setUsers(data);
      setTotal(data.length);
    });
  }, [method, page]);

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 md:flex-nowrap">
          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered">{t("killsRanking.sortMethod")}</Button>
            </DropdownTrigger>
            <DropdownMenu aria-label={t("killsRanking.tableLabel")}>
              <DropdownItem key="total" onClick={() => setMethod("total")}>
                {t("killsRanking.totalKills")}
              </DropdownItem>
              <DropdownItem
                key="ancient_guardian"
                onClick={() => setMethod("ancient_guardian")}
              >
                {t("killsRanking.ancientGuardian")}
              </DropdownItem>
              <DropdownItem key="phantom" onClick={() => setMethod("phantom")}>
                {t("killsRanking.phantom")}
              </DropdownItem>
              <DropdownItem key="piglin" onClick={() => setMethod("piglin")}>
                {t("killsRanking.piglinBrute")}
              </DropdownItem>
              <DropdownItem
                key="ender_dragon"
                onClick={() => setMethod("ender_dragon")}
              >
                {t("killsRanking.enderDragon")}
              </DropdownItem>
              <DropdownItem key="wither" onClick={() => setMethod("wither")}>
                {t("killsRanking.wither")}
              </DropdownItem>
              <DropdownItem key="warden" onClick={() => setMethod("warden")}>
                {t("killsRanking.warden")}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <Table aria-label={t("killsRanking.tableLabel")}>
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
                <TableCell>
                  {RenderCellForKillsRanking({ user: item, columnKey })}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Pagination
        total={total / 20 + 1}
        initialPage={1}
        className="pagination-center"
        onChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
};
