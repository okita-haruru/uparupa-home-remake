"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { FaQq } from "react-icons/fa";
import { RiQqLine } from "react-icons/ri";
import { useI18n } from "@/components/i18n/i18n-provider";
import qqGroupQrcode from "@/public/assets/qq-group-qrcode.jpg";
import qqGroupQrcodeDark from "@/public/assets/qq-group-qrcode-dark.jpg";

const QQ_GROUP_NUMBER = "634917584";
const triggerClassName =
  "inline-flex h-10 w-10 items-center justify-center rounded-full bg-transparent text-default-600 transition-colors hover:text-default-900";

export const QqButton = () => {
  const { t } = useI18n();
  const { resolvedTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const qrCode = useMemo(
    () => (resolvedTheme === "dark" ? qqGroupQrcodeDark : qqGroupQrcode),
    [resolvedTheme],
  );

  return (
    <>
      <button
        type="button"
        className={triggerClassName}
        aria-label={t("qqCard.title")}
        title={`${t("qqCard.title")} ${QQ_GROUP_NUMBER}`}
        onClick={() => setIsOpen(true)}
      >
        {resolvedTheme === "dark" ? <FaQq size={21} /> : <RiQqLine size={20} />}
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalContent>
          <ModalHeader className="justify-center">{t("qqCard.title")}</ModalHeader>
          <ModalBody className="pb-6">
            <div className="flex flex-col items-center gap-3">
              <Image
                src={qrCode}
                alt={t("qqCard.title")}
                className="h-auto w-full max-w-xs rounded-2xl"
              />
              <p className="text-sm font-medium text-default-600">{QQ_GROUP_NUMBER}</p>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
