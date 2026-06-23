"use client";
import Link from "next/link";
import React from "react";
import { HouseIcon } from "@/components/icons/breadcrumb/house-icon";
import { UsersIcon } from "@/components/icons/breadcrumb/users-icon";
import { TableWrapperForKillsRanking } from "./table";
import {Button, Input} from "@nextui-org/react";
import {SettingsIcon} from "@/components/icons/sidebar/settings-icon";
import {TrashIcon} from "@/components/icons/accounts/trash-icon";
import {InfoIcon} from "@/components/icons/accounts/info-icon";
import {DotsIcon} from "@/components/icons/accounts/dots-icon";
import {ExportIcon} from "@/components/icons/accounts/export-icon"
import {  Dropdown,  DropdownTrigger,  DropdownMenu,  DropdownSection,  DropdownItem} from "@nextui-org/react";
export const KillsRanking = () => {
    return (
        <div className="my-14 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
            <ul className="flex">
                <li className="flex gap-2">
                    <HouseIcon/>
                    <Link href={"/homepage"}>
                        <span>主页</span>
                    </Link>
                    <span> / </span>{" "}
                </li>

                <li className="flex gap-2">
                    <UsersIcon/>
                    <span>排行榜</span>
                    <span> / </span>{" "}
                </li>
                <li className="flex gap-2">
                    <span>击杀榜</span>
                </li>
            </ul>

            <h3 className="text-xl font-semibold">战斗！爽！</h3>

            <div className="max-w-[95rem] mx-auto w-full">
                <TableWrapperForKillsRanking/>
            </div>
        </div>
    );
};
