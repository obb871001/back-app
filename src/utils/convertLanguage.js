export const convertLanguage = (key) => {
  switch (key) {
    case "zh_cn":
      return "zhs";
    default:
      return key;
  }
};
