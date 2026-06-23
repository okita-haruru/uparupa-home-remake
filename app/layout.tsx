import "@/styles/globals.css";
import type { Metadata } from "next";
import clsx from "clsx";
import { ReactNode } from "react";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Uparupa",
  description: "Portal and functional homepage for the Uparupa Minecraft server.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/dzv7jfi.css" />
      </head>
      <body className={clsx("font-sans antialiased", fontSans.className)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

