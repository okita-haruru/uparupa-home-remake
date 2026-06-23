"use client";

import { useI18n } from "@/components/i18n/i18n-provider";

export default function NotFound() {
  const { t } = useI18n();
  const messages = [t("notFound.message1"), t("notFound.message2")];

  return (
    <div className="flex h-full w-full flex-col items-center justify-center select-none">
      <h1 className="mx-auto my-7">404</h1>
      <span>{messages[Math.floor(Math.random() * messages.length)]}</span>
    </div>
  );
}
