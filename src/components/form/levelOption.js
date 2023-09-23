import i18next from "i18next";
import { useSelector } from "react-redux";

export const levelOptions = ({ Lv }) => {
  const i18n_cagent_level = (key) => i18next.t(`cagent_level.${key}`);
  return Array.from(
    { length: window.basicConfig?.level_limit || 6 },
    (_, i) => i
  )
    .filter((level) => level >= Number(Lv))
    .map((level) => {
      return {
        label: i18n_cagent_level(`${level}`),
        value: level,
      };
    });
};
