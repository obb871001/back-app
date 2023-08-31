import { Select, Typography } from "antd";
import dayjs from "dayjs";
import React from "react";
import { useTranslation } from "react-i18next";
import Flag from "react-world-flags";

const LanguageSelect = () => {
  const { i18n } = useTranslation();

  const languages = [
    {
      name: "简体",
      code: "zh",
      flag: "CN",
      value: "zh-cn",
    },
    {
      name: "English",
      code: "en",
      flag: "US",
      value: "en",
    },
  ];
  return (
    <>
      <Typography.Text>語言：</Typography.Text>
      <Select
        className="!w-[120px]"
        defaultValue={i18n.language}
        placeholder="Select with images"
        onChange={(value) => {
          i18n.changeLanguage(value);
        }}
      >
        {languages.map((language) => (
          <Select.Option value={language.value} key={language.code}>
            <Flag code={language.flag} height="10" />
            <span className="ml-[5px]">{language.name}</span>
          </Select.Option>
        ))}
      </Select>
    </>
  );
};

export default LanguageSelect;
