export const userLanguage = () => {
  const lang = window.navigator.userLanguage || window.navigator.language;
  const defaultLang = lang.toLowerCase();
  if (defaultLang === "zh_cn" || defaultLang === "zh-tw") {
    return "zh_cn";
  } else {
    return "en";
  }
};
