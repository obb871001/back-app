import { ProFormGroup } from "@ant-design/pro-components";
import { Divider, Space, Typography } from "antd";
import { useState } from "react";
import CommissionPermission from "../../../../components/permissionComponents/commissionPermission";

const GameCommission = ({ form }) => {
  const [customSetting, setCustomSetting] = useState(false);
  return (
    <>
      <div className="mb-[20px]">
        <Typography.Title italic level={4}>
          遊戲佣金
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
            {customSetting.commission ? "自訂" : "取消"}
          </Typography.Text>
        </Space>
      </div>
    </>
  );
};

export default GameCommission;
