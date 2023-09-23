import { Typography } from "antd";
import React from "react";

export const ErrorMessage = ({ errorMessage }) => {
  return Object.values(errorMessage).map((item) => {
    return <Typography.Text>{item}</Typography.Text>;
  });
};
