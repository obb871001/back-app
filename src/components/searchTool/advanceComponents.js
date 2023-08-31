import { Col, Row, Typography } from "antd";
import React from "react";
import CustomSearchInput from "./customSearchInput";

const AdvanceComponents = ({ props }) => {
  return (
    <Row className="mb-[10px] w-full">
      <Col span={8}>
        <Typography.Text>{props.title}：</Typography.Text>
      </Col>
      <Col span={16}>
        <CustomSearchInput props={props} />
      </Col>
    </Row>
  );
};

export default AdvanceComponents;
