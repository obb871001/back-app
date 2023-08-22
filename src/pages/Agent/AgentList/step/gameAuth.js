import { ProFormGroup, ProFormSelect } from "@ant-design/pro-components";
import { Divider, Space, Typography } from "antd";
import React, { useState } from "react";
import GamePermission from "../../../../components/permissionComponents/gamePermission";

const GameAuth = ({ form }) => {
  const [customSetting, setCustomSetting] = useState(false);
  return (
    <>
      <div className="mb-[20px]">
        <Typography.Title italic level={4}>
          遊戲權限
        </Typography.Title>{" "}
        <Space align="baseline">
          <ProFormGroup>
            {customSetting ? (
              <ProFormSelect width={200} />
            ) : (
              <GamePermission hiddenTitle form={form} />
            )}
          </ProFormGroup>
          <Typography.Text
            className="cursor-pointer text-blue-500"
            onClick={() => setCustomSetting((prev) => !prev)}
            underline
          >
            {customSetting ? "自訂" : "取消"}
          </Typography.Text>
        </Space>
      </div>
    </>
  );
};

export default GameAuth;
