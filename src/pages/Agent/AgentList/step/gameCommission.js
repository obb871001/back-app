import { ProFormGroup } from "@ant-design/pro-components";
import { Divider, Space, Typography } from "antd";
import { useState } from "react";
import CommissionPermission from "../../../../components/permissionComponents/commissionPermission";
import { useTranslation } from "react-i18next";

const GameCommission = ({ form }) => {
  const { t } = useTranslation();
  const i18n = (key) => t(`page.agentinfomation.agentlist.modal.${key}`);

  const [customSetting, setCustomSetting] = useState(false);
  return (
    <>
      <div className="mb-[20px]">
        <Typography.Title italic level={4}>
          {i18n("gameCommission")}
        </Typography.Title>{" "}
        <Space align="baseline">
          <ProFormGroup>
            {customSetting ? (
              <ProFormGroup width={200} />
            ) : (
              <CommissionPermission form={form} hiddenTitle />
            )}
          </ProFormGroup>
          <Typography.Text
            className="cursor-pointer text-blue-500"
            onClick={() => setCustomSetting((prev) => !prev)}
            underline
          >
            {customSetting.commission ? i18n("customize") : i18n("cancel")}
          </Typography.Text>
        </Space>
      </div>
    </>
  );
};

export default GameCommission;
