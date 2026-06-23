"use client";

import React, { createContext, useContext, useEffect, useLayoutEffect, useState } from "react";
import {
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
  Language,
  messages,
} from "./messages";

type Variables = Record<string, string | number>;

interface I18nContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, variables?: Variables) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

const useClientLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const interpolate = (template: string, variables?: Variables) => {
  if (!variables) {
    return template;
  }

  return Object.entries(variables).reduce((result, [key, value]) => {
    return result.replaceAll(`{${key}}`, String(value));
  }, template);
};

const resolveMessage = (language: Language, key: string) => {
  const value = key
    .split(".")
    .reduce<unknown>((current, part) => {
      if (!current || typeof current !== "object") {
        return undefined;
      }

      return (current as Record<string, unknown>)[part];
    }, messages[language]);

  if (typeof value === "string") {
    return value;
  }

  if (language !== DEFAULT_LANGUAGE) {
    const fallbackValue = key
      .split(".")
      .reduce<unknown>((current, part) => {
        if (!current || typeof current !== "object") {
          return undefined;
        }

        return (current as Record<string, unknown>)[part];
      }, messages[DEFAULT_LANGUAGE]);

    if (typeof fallbackValue === "string") {
      return fallbackValue;
    }
  }

  return key;
};

const detectLanguage = (): Language => {
  if (typeof window === "undefined") {
    return DEFAULT_LANGUAGE;
  }

  const savedLanguage = window.localStorage.getItem(
    LANGUAGE_STORAGE_KEY
  ) as Language | null;

  if (savedLanguage && savedLanguage in messages) {
    return savedLanguage;
  }

  const candidates = [
    window.navigator.language,
    ...(window.navigator.languages ?? []),
  ].filter(Boolean);

  for (const candidate of candidates) {
    if (candidate.startsWith("zh-TW") || candidate.startsWith("zh-HK")) {
      return "zh-TW";
    }

    if (candidate.startsWith("zh")) {
      return "zh-CN";
    }

    if (candidate.startsWith("ja")) {
      return "ja";
    }

    if (candidate.startsWith("en")) {
      return "en";
    }
  }

  return DEFAULT_LANGUAGE;
};

export const I18nProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>(DEFAULT_LANGUAGE);

  useClientLayoutEffect(() => {
    const detectedLanguage = detectLanguage();

    setLanguage((currentLanguage) =>
      currentLanguage === detectedLanguage ? currentLanguage : detectedLanguage
    );
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    document.documentElement.lang = language;
  }, [language]);

  return (
    <I18nContext.Provider
      value={{
        language,
        setLanguage,
        t: (key, variables) => interpolate(resolveMessage(language, key), variables),
      }}
    >
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }

  return context;
};
