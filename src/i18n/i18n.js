import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en.json";
import zh_chs from "./zh_chs.json";
import { userLanguage } from "./detectLang";

const defaultLang = userLanguage();
i18n.use(initReactI18next).init({
  debug: false,
  lng: defaultLang === "en" ? "en" : "zh-cn",
  resources: {
    en: { translation: en },
    [`zh-cn`]: { translation: zh_chs },
  },
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
