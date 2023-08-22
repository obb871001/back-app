import { ExclamationCircleTwoTone } from "@ant-design/icons";
import { Tooltip } from "antd";
import React from "react";

const CommonTooltip = ({ tooltip, title }) => {
  return (
    <div className="flex items-center gap-[5px]">
      <span>{title}</span>
      <Tooltip title={tooltip}>
        <ExclamationCircleTwoTone />
      </Tooltip>
    </div>
  );
};

export default CommonTooltip;
