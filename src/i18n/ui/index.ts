export const languages = {
  en: "English",
  zh: "中文",
};

export const defaultLang = "en";

import uiLayout from "./layout";
import uiBase from "./base";

export const ui = {
  en: {
    ...uiLayout.en,
    ...uiBase.en,
  },
  zh: {
    ...uiLayout.zh,
    ...uiBase.zh,
  },
} as const;
