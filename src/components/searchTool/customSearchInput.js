import { Input } from "antd";
import React from "react";

const CustomSearchInput = ({ props }) => {
  const { type, label, name, ex = "" } = props;
  switch (type) {
    case "text":
      return <Input name={name} placeholder={`例：${ex}`} />;
    default:
      return <Input name={name} placeholder={`例：${ex}`} />;
  }
};

export default CustomSearchInput;
