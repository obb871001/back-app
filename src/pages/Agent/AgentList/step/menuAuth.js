import { ProFormGroup, ProFormSelect } from "@ant-design/pro-components";
import { Divider, Space, Typography } from "antd";
import React, { useState } from "react";
import MenuPermissions from "../../../../components/permissionComponents/menuPermissions";
import { useTranslation } from "react-i18next";

const MenuAuth = ({ form, isChild }) => {
  const { t } = useTranslation();
  const i18n = (key) => t(`page.agentinfomation.agentlist.modal.${key}`);

  const [customSetting, setCustomSetting] = useState(false);
  return (
    <>
      <div className="mb-[10px]">
        <Typography.Title italic level={4}>
          {i18n("menuPermission")}
        </Typography.Title>{" "}
        <Divider className="my-0" />
        <Space align="baseline">
          <ProFormGroup>
            {customSetting ? (
              <ProFormSelect name="menu_permission" options={[]} width={200} />
            ) : (
              <MenuPermissions
                hiddenTitle
                isChild={isChild}
                customSetting={customSetting}
                form={form}
              />
            )}
          </ProFormGroup>
          {/* <Typography.Text
            className="cursor-pointer text-blue-500 ml-[20px]"
            onClick={() => setCustomSetting((prev) => !prev)}
            underline
          >
            {customSetting ? i18n("customize") : i18n("cancel")}
          </Typography.Text> */}
        </Space>
      </div>
    </>
  );
};

export default MenuAuth;
