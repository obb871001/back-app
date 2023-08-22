import { ProFormGroup, ProFormSelect } from "@ant-design/pro-components";
import { Divider, Space, Typography } from "antd";
import React, { useState } from "react";
import MenuPermissions from "../../../../components/permissionComponents/menuPermissions";

const MenuAuth = ({ form }) => {
  const [customSetting, setCustomSetting] = useState(false);
  return (
    <>
      <div className="mb-[20px]">
        <Typography.Title italic level={4}>
          選單權限
        </Typography.Title>{" "}
        <Space align="baseline">
          <ProFormGroup>
            {customSetting ? (
              <ProFormSelect
                name="menuPermission"
                options={[
                  { label: "一般會員", value: "member" },
                  { label: "未解决", value: "open" },
                  { label: "已解决", value: "closed" },
                  { label: "解决中", value: "processing" },
                ]}
                width={200}
              />
            ) : (
              <MenuPermissions
                hiddenTitle
                customSetting={customSetting}
                form={form}
              />
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

export default MenuAuth;
