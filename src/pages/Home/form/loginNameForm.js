import { ProFormGroup, ProFormText } from "@ant-design/pro-components";
import { LOGINNAME_EXPRESSION } from "../../../regex";

const LoginNameForm = () => {
  return (
    <>
      <ProFormGroup>
        <ProFormText
          tooltip="此登入名稱為之後的登入名稱"
          label="設定登入名稱"
          name="loginname"
          rules={[
            { required: true, message: "請輸入登入名稱" },
            {
              pattern: LOGINNAME_EXPRESSION,
              message: "输入应以字母开头，后面可接2到14个字母、数字或下划线",
            },
          ]}
        />
      </ProFormGroup>
      <ProFormGroup>
        <ProFormText.Password
          tooltip="此密碼為之後的登入密碼"
          label="設定密碼"
          name="newPasswd"
          rules={[{ required: true, message: "請輸入密碼" }]}
        />
        <ProFormText.Password
          tooltip=""
          label="再次輸入密碼"
          name="newPasswdAgain"
          rules={[{ required: true, message: "請再次輸入密碼" }]}
        />
      </ProFormGroup>
    </>
  );
};

export default LoginNameForm;
