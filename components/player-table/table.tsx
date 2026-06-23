import {
  Button,
  Dropdown, DropdownItem, DropdownMenu, DropdownTrigger,
  Link,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import {Pagination} from "@nextui-org/react";
import React, {useEffect, useState} from "react";
import {columns, fetchKills} from "./data";
import { RenderCellForKillsRanking } from "./render-cell";
import { FaFilter } from "react-icons/fa6";
export const TableWrapperForKillsRanking = () => {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [method, setMethod] = useState("total");

  useEffect(() => {
    fetchKills(method, page).then(data => {
      setUsers(data);
      setTotal(data.length);
    });
  }, [method, page]);

  return (

      <div className=" w-full flex flex-col gap-4">
        <div className="flex justify-between flex-wrap gap-4 items-center">
          <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
            <Dropdown>
              <DropdownTrigger>
                <Button variant="bordered">
                  <FaFilter />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="total" onClick={() => setMethod("total")}>总击杀数</DropdownItem>
                <DropdownItem key="ancient_guardian" onClick={() => setMethod("ancient_guardian")}>远古守卫者</DropdownItem>
                <DropdownItem key="phantom" onClick={() => setMethod("phantom")}>幻翼</DropdownItem>
                <DropdownItem key="piglin" onClick={() => setMethod("piglin")}>猪灵</DropdownItem>
                <DropdownItem key="ender_dragon" onClick={() => setMethod("ender_dragon")}>末影龙</DropdownItem>
                <DropdownItem key="wither" onClick={() => setMethod("wither")}>凋零</DropdownItem>
                <DropdownItem key="warden" onClick={() => setMethod("warden")}>坚守者</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <Table aria-label="Example table with custom cells">
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
                        {RenderCellForKillsRanking({user: item, columnKey: columnKey})}
                      </TableCell>
                  )}
                </TableRow>
            )}
          </TableBody>
        </Table>
        <Pagination total={total / 20 + 1} initialPage={1} className="pagination-center"
                    onChange={(newPage) => setPage(newPage)}/>
      </div>
  );
};
