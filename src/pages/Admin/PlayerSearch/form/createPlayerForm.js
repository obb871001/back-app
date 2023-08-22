import { ProFormGroup, ProFormText } from "@ant-design/pro-components";
import React from "react";
import { USERNAME_EXPRESSION } from "../../../../regex";

const CreatePlayerForm = () => {
  return (
    <>
      <ProFormGroup>
        <ProFormText
          name="username"
          label="玩家帳號"
          rules={[
            { required: true, message: "請輸入玩家帳號" },
            {
              pattern: USERNAME_EXPRESSION,
              message: "請輸入3-15位英文開頭的英文、數字、底線",
            },
          ]}
        />
      </ProFormGroup>
      <ProFormGroup>
        <ProFormText.Password
          name="password"
          label="密碼"
          rules={[{ required: true, message: "請輸入密碼" }]}
        />
      </ProFormGroup>
      <ProFormGroup>
        <ProFormText
          name="playerName"
          label="玩家名稱"
          rules={[{ required: true, message: "請輸入玩家名稱" }]}
        />
      </ProFormGroup>
    </>
  );
};

export default CreatePlayerForm;
