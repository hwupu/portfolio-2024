export const languages = {
  en: "English",
  zh: "中文",
};

export const defaultLang = "en";

import { uiLayout } from "./layout";

export const ui = {
  en: {
    ...uiLayout.en,
  },
  zh: {
    ...uiLayout.zh,
  },
} as const;
