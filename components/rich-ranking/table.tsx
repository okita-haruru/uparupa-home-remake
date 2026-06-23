"use client";

import React, { useEffect, useState } from "react";
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useI18n } from "@/components/i18n/i18n-provider";
import { fetchUsers } from "./data";
import { RenderCellForRichRanking } from "./render-cell";

export const TableWrapperForRichRanking = () => {
  const { t } = useI18n();
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const columns = [
    { name: t("common.rank"), uid: "ranking" },
    { name: t("common.player"), uid: "name" },
    { name: t("richRanking.balance"), uid: "balance" },
  ];

  useEffect(() => {
    fetchUsers(page).then((data) => {
      setUsers(data);
      setTotal(data.length);
    });
  }, [page]);

  return (
    <div className="flex w-full flex-col gap-4">
      <Table aria-label={t("richRanking.tableLabel")}>
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
                  {RenderCellForRichRanking({ user: item, columnKey })}
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
