"use client";

import React from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useI18n } from "@/components/i18n/i18n-provider";

export const AddUser = () => {
  const { t } = useI18n();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div>
      <Button onPress={onOpen} color="primary">
        {t("common.addUser")}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {t("common.addUser")}
              </ModalHeader>
              <ModalBody>
                <Input label={t("common.email")} variant="bordered" />
                <Input label={t("common.firstName")} variant="bordered" />
                <Input label={t("common.lastName")} variant="bordered" />
                <Input label={t("common.phoneNumber")} variant="bordered" />
                <Input label={t("common.password")} type="password" variant="bordered" />
                <Input
                  label={t("common.confirmPassword")}
                  type="password"
                  variant="bordered"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  {t("common.close")}
                </Button>
                <Button color="primary" onPress={onClose}>
                  {t("common.addUser")}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
