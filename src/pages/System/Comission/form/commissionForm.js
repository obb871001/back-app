import { ProFormGroup, ProFormText } from "@ant-design/pro-components";
import React from "react";

const CommissionForm = () => {
  return (
    <>
      <ProFormGroup>
        <ProFormText
          tooltip="此設定為創建代理時可直接選取標籤來更方便的設定權限"
          label="佣金權限標籤名稱"
          name="loginName"
        />
      </ProFormGroup>
    </>
  );
};

export default CommissionForm;
