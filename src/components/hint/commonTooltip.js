import { ExclamationCircleTwoTone } from "@ant-design/icons";
import { Tooltip } from "antd";
import React from "react";

const CommonTooltip = ({ tooltip, title, className }) => {
  return (
    <div className={`${className} flex items-center gap-[5px]`}>
      <span>{title}</span>
      <Tooltip title={tooltip}>
        <ExclamationCircleTwoTone />
      </Tooltip>
    </div>
  );
};

export default CommonTooltip;
