import { Col, Row, Typography } from "antd";
import React from "react";
import CustomSearchInput from "./customSearchInput";

const AdvanceComponents = ({ props }) => {
  return (
    <Row className="mb-[15px] w-full">
      <Col span={8} className="justify-end flex items-center">
        <Typography.Text className="font-bold !text-sm">
          {props.title}：
        </Typography.Text>
      </Col>
      <Col span={16}>
        <CustomSearchInput props={props} />
      </Col>
    </Row>
  );
};

export default AdvanceComponents;
