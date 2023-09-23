import { ProFormGroup, ProFormText } from "@ant-design/pro-components";
import { LOGINNAME_EXPRESSION } from "../../../regex";
import { useTranslation } from "react-i18next";

const LoginNameForm = () => {
  const { t } = useTranslation();
  const i18n = (key) => t(`page.loginname.${key}`);
  const i18n_express = (key) => t(`expressHint.${key}`);

  return (
    <>
      <ProFormGroup>
        <ProFormText
          tooltip={i18n("loginnameHint")}
          label={i18n("setLoginname")}
          name="loginname"
          rules={[
            { required: true, message: i18n("pleaseEnterLoginname") },
            {
              pattern: LOGINNAME_EXPRESSION,
              message: i18n_express("accountHint"),
            },
          ]}
        />
      </ProFormGroup>
      <ProFormGroup>
        <ProFormText.Password
          tooltip={i18n("passwordHint")}
          label={i18n("setPassword")}
          name="newPasswd"
          rules={[{ required: true, message: i18n("pleaseEnterPassword") }]}
        />
        <ProFormText.Password
          tooltip=""
          label={i18n("enterPasswordAgain")}
          name="newPasswdAgain"
          rules={[{ required: true, message: i18n("enterPasswordAgain") }]}
        />
      </ProFormGroup>
    </>
  );
};

export default LoginNameForm;
