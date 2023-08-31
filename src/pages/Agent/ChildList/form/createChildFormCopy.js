import {
  ProFormGroup,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";
import { Divider, Space, Typography } from "antd";
import React, { useState } from "react";
import MenuPermissions from "../../../../components/permissionComponents/menuPermissions";
import CommissionPermission from "../../../../components/permissionComponents/commissionPermission";
import GamePermission from "../../../../components/permissionComponents/gamePermission";

const CreateChildForm = ({ form }) => {
  const [customSetting, setCustomSetting] = useState({
    menu: false,
    commission: false,
    gameAuth: false,
  });
  return (
    <>
      <ProFormGroup>
        <ProFormText width="md" readonly name="lastAgent" label="上層代理" />
        <ProFormText width="md" readonly value="子帳號" label="類型" />
      </ProFormGroup>
      <ProFormGroup>
        <ProFormText
          rules={[{ required: true, message: "請輸入子代理帳號" }]}
          name="cagent"
          label="子代理帳號"
        />
        <ProFormText
          rules={[{ required: true, message: "請輸入暱稱" }]}
          tooltip="設定辨識名稱"
          name="nickname"
          label="暱稱"
        />
      </ProFormGroup>
      <ProFormGroup>
        <ProFormText.Password
          rules={[{ required: true, message: "請輸入密碼" }]}
          name="passwd"
          label="密碼"
        />
      </ProFormGroup>
      <Divider dashed />
      <div className="mb-[20px]">
        <Typography.Title italic level={4}>
          常用選單標籤
        </Typography.Title>{" "}
        <Space align="baseline">
          <ProFormGroup>
            {customSetting.menu ? (
              <ProFormSelect
                name="menu_permission"
                options={[
                  { label: "一般會員", value: "member" },
                  { label: "未解决", value: "open" },
                  { label: "已解决", value: "closed" },
                  { label: "解决中", value: "processing" },
                ]}
                width={200}
              />
            ) : (
              <MenuPermissions form={form} />
            )}
          </ProFormGroup>
          <Typography.Text
            className="cursor-pointer text-blue-500"
            onClick={() =>
              setCustomSetting((prev) => ({ ...prev, menu: !prev.menu }))
            }
            underline
          >
            {customSetting.menu ? "自訂" : "取消"}
          </Typography.Text>
        </Space>
        <Divider dashed />
      </div>
    </>
  );
};

export default CreateChildForm;
