import { CheckOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import React from "react";

const NoticeTitle = ({ required, optional, customTitle }) => {
  return (
    <div className="mb-[10px]">
      <Typography.Title
        className="flex items-center gap-[5px] !text-[#082958]"
        italic
        level={4}
        strong
      >
        <CheckOutlined />{" "}
        {required ? "必填欄位" : optional ? "選填欄位" : customTitle}
      </Typography.Title>
      <div className="w-full border-b-1 border-dotted border-[#082958]"></div>
    </div>
  );
};

export default NoticeTitle;
