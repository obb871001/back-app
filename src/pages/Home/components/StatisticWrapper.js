import { Space, Typography } from "antd";
import React from "react";
import CommonTooltip from "../../../components/hint/commonTooltip";

const StatisticWrapper = ({
  tooltip,
  title,
  children,
  textClassName,
  wrapperClassName,
}) => {
  return (
    <section className="mb-[15px]">
      <Space className="mb-[10px]">
        {tooltip && <CommonTooltip tooltip={tooltip} />}
        <Typography.Title className={`!my-0 ${textClassName}`} level={4}>
          {title}
        </Typography.Title>
      </Space>
      <section
        className={`p-[30px] ${wrapperClassName}`}
        style={{ borderLeft: "5px solid #e7e7e7" }}
      >
        {children}
      </section>
    </section>
  );
};

export default StatisticWrapper;
