import { ProFormGroup, ProFormSelect } from "@ant-design/pro-components";
import { Divider, Space, Typography } from "antd";
import React, { useState } from "react";
import GamePermission from "../../../../components/permissionComponents/gamePermission";
import { useTranslation } from "react-i18next";

const GameAuth = ({ form }) => {
  const { t } = useTranslation();
  const i18n = (key) => t(`page.agentinfomation.agentlist.modal.${key}`);

  const [customSetting, setCustomSetting] = useState(false);
  return (
    <>
      <div className="mb-[20px]">
        <Typography.Title italic level={4}>
          {i18n("gamePermission")}
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
            {customSetting ? i18n("customize") : i18n("cancel")}
          </Typography.Text>
        </Space>
      </div>
    </>
  );
};

export default GameAuth;
