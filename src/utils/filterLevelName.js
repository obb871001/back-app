import { useTranslation } from "react-i18next";

export default function FilterLevelName(type, level) {
  const { t } = useTranslation();
  const i18n_cagent_level = (key) => t(`cagent_level.${key}`);
  if (type === "child") {
    return i18n_cagent_level(`child`);
  } else {
    return i18n_cagent_level(`${level}`);
  }
}
