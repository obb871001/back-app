import { ProFormGroup } from "@ant-design/pro-components";
import { Divider, Space, Typography } from "antd";
import { useState } from "react";
import CommissionPermission from "../../../../components/permissionComponents/commissionPermission";
import { useTranslation } from "react-i18next";
import FilterLevelName from "../../../../utils/filterLevelName";
import { useSelector } from "react-redux";

const GameCommission = ({ form, prefix }) => {
  const { t } = useTranslation();
  const i18n = (key) => t(`page.agentinfomation.agentlist.modal.${key}`);

  const agentInfo = useSelector((state) => state.agentInfo);

  const [customSetting, setCustomSetting] = useState(false);
  return (
    <>
      <div className="mb-[10px]">
        <Typography.Title italic level={4}>
          {FilterLevelName(null, agentInfo.level + 1)}
          {i18n(`game_${prefix}`)}
        </Typography.Title>{" "}
        <Divider className="my-0" />
        <Space align="baseline">
          <ProFormGroup>
            {customSetting ? (
              <ProFormGroup width={200} />
            ) : (
              <CommissionPermission form={form} prefix={prefix} hiddenTitle />
            )}
          </ProFormGroup>
          {/* <Typography.Text
            className="cursor-pointer text-blue-500"
            onClick={() => setCustomSetting((prev) => !prev)}
            underline
          >
            {customSetting.commission ? i18n("customize") : i18n("cancel")}
          </Typography.Text> */}
        </Space>
      </div>
    </>
  );
};

export default GameCommission;
