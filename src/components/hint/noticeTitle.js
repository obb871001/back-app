import { CheckOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

const NoticeTitle = ({ required, optional, customTitle }) => {
  const { t } = useTranslation();
  const i18n = (key) => t(`commonModal.${key}`);
  return (
    <div className="mb-[10px]">
      <Typography.Title
        className="flex items-center gap-[5px] !text-[#082958]"
        italic
        level={4}
        strong
      >
        <CheckOutlined />{" "}
        {required
          ? i18n("requiredCol")
          : optional
          ? i18n("optionalCol")
          : customTitle}
      </Typography.Title>
      <div className="w-full border-b-1 border-dotted border-[#082958]"></div>
    </div>
  );
};

export default NoticeTitle;
