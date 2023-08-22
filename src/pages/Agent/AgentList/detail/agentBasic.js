import { ProFormSwitch } from "@ant-design/pro-components";
import { Divider } from "antd";
import React from "react";

const AgentBasic = () => {
  return (
    <>
      <Divider />
      <ProFormSwitch
        label="代理帳號狀態"
        onChange={(v) => {
          console.log(v);
        }}
      />
    </>
  );
};

export default AgentBasic;
