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
import { FaFilter } from "react-icons/fa6";
import { LuRefreshCw } from "react-icons/lu";
import { FaFishFins } from "react-icons/fa6";
import { LuRuler } from "react-icons/lu";
import { useI18n } from "@/components/i18n/i18n-provider";
import {
  fetchAmount,
  fetchFishes,
  fetchTotalAmount,
  fetchSize,
} from "./data";
import { RenderCell } from "./render-cell";

export const TableWrapper = () => {
  const { t } = useI18n();
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [method, setMethod] = useState("total");
  const [fish, setFish] = useState("JiYu");
  const [fishes, setFishes] = useState(new Map());
  const [refreshKey, setRefreshKey] = useState(0);

  const columnsForSize = [
    { name: t("common.rank"), uid: "ranking" },
    { name: t("common.player"), uid: "name" },
    { name: t("fishRanking.size"), uid: "size" },
  ];
  const columnsForAmount = [
    { name: t("common.rank"), uid: "ranking" },
    { name: t("common.player"), uid: "name" },
    { name: t("fishRanking.amount"), uid: "amount" },
  ];
  const methodLabels = new Map([
    ["total", t("fishRanking.totalCatch")],
    ["size", t("fishRanking.size")],
    ["amount", t("fishRanking.amount")],
  ]);
  const methodAccentColor = "#8dabf6";

  const renderMethodTrigger = () => {
    if (method === "size") {
      return (
        <>
          <LuRuler style={{ color: methodAccentColor }} />
          <span style={{ color: methodAccentColor }}>{methodLabels.get(method)}</span>
        </>
      );
    }

    if (method === "amount") {
      return (
        <>
          <FaFishFins style={{ color: methodAccentColor }} />
          <span style={{ color: methodAccentColor }}>{methodLabels.get(method)}</span>
        </>
      );
    }

    return (
      <>
        <FaFilter />
        {methodLabels.get(method)}
      </>
    );
  };

  const refreshData = () => {
    setRefreshKey((previousKey) => previousKey + 1);
  };

  useEffect(() => {
    fetchTotalAmount(page).then((data) => {
      setUsers(data);
      setTotal(data.length);
    });
    fetchFishes().then((fishMap) => setFishes(fishMap));
  }, [page]);

  useEffect(() => {
    if (method === "size") {
      fetchSize(fish, page).then((data) => {
        setUsers(data);
        setTotal(data.length);
      });
      return;
    }

    if (method === "amount") {
      fetchAmount(fish, page).then((data) => {
        setUsers(data);
        setTotal(data.length);
      });
      return;
    }

    fetchTotalAmount(page).then((data) => {
      setUsers(data);
      setTotal(data.length);
    });
  }, [page, method, fish, refreshKey]);

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 md:flex-nowrap">
          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered">
                {renderMethodTrigger()}
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label={t("fishRanking.tableLabel")}>
              <DropdownItem key="total" onClick={() => setMethod("total")}>
                {t("fishRanking.totalCatch")}
              </DropdownItem>
              <DropdownItem key="size" onClick={() => setMethod("size")}>
                {t("fishRanking.size")}
              </DropdownItem>
              <DropdownItem key="amount" onClick={() => setMethod("amount")}>
                {t("fishRanking.amount")}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          {method !== "total" && (
            <Dropdown>
              <DropdownTrigger>
                <Button variant="bordered">{fishes.get(fish)}</Button>
              </DropdownTrigger>
              <DropdownMenu aria-label={t("fishRanking.tableLabel")} className="dropdown-menu">
                {Array.from(fishes.entries()).map(([key, value]) => (
                  <DropdownItem key={key} onClick={() => setFish(key as string)}>
                    {value}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          )}
          <Button
            isIconOnly
            color="primary"
            onClick={refreshData}
            variant="faded"
            aria-label={t("common.refresh")}
          >
            <LuRefreshCw />
          </Button>
        </div>
      </div>
      <Table aria-label={t("fishRanking.tableLabel")}>
        <TableHeader columns={method === "size" ? columnsForSize : columnsForAmount}>
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
      <Pagination
        total={total / 20 + 1}
        initialPage={1}
        className="pagination-center"
        onChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
};
