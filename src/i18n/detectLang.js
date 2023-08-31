export const userLanguage = () => {
  const lang = window.navigator.userLanguage || window.navigator.language;
  const defaultLang = lang.toLowerCase();
  if (defaultLang === "zh-cn" || defaultLang === "zh-tw") {
    return "zh-cn";
  } else {
    return "en";
  }
};
