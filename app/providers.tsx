"use client";
import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes";
import { I18nProvider } from "@/components/i18n/i18n-provider";
import { Layout } from "@/components/layout/layout";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  return (
    <NextUIProvider>
      <NextThemesProvider defaultTheme="system" attribute="class" {...themeProps}>
        <I18nProvider>
          <Layout>
            {children}
          </Layout>
        </I18nProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
