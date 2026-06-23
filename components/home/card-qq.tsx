"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Card,
  CardBody,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { FaQq } from "react-icons/fa";
import { useTheme } from "next-themes";
import { useI18n } from "@/components/i18n/i18n-provider";
import qqGroupQrcode from "@/public/assets/qq-group-qrcode.jpg";
import qqGroupQrcodeDark from "@/public/assets/qq-group-qrcode-dark.jpg";

export const CardQq = () => {
  const { t } = useI18n();
  const [showModal, setShowModal] = React.useState(false);
  const [, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const getImage = () => {
    return theme === "dark" ? qqGroupQrcodeDark : qqGroupQrcode;
  };

  return (
    <>
      <Card
        className="xl:max-w-sm rounded-xl bg-default-50 px-3 shadow-md w-full select-none"
        isPressable
        onPress={() => setShowModal(true)}
      >
        <CardBody className="flex-row gap-2.5 py-5">
          <FaQq className="my-auto" size={30} />
          <div className="flex flex-col">
            <span className="text-default-900">{t("qqCard.title")}</span>
            <span className="text-xs text-default-900">634917584</span>
          </div>
        </CardBody>
      </Card>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ModalContent>
          <ModalHeader />
          <ModalBody>
            <div className="flex justify-center">
              <Image src={getImage()} alt={t("qqCard.title")} />
            </div>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
};
