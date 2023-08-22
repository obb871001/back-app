import { Result } from "antd";
import React from "react";

const ErrorPage = () => {
  return (
    <Result
      status="403"
      title="You are not authorized to access this page."
      subTitle="Sorry, you are not authorized to access this page."
    />
  );
};

export default ErrorPage;
