import { notification } from "antd";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router";
import { LoginForm, ProFormText } from "@ant-design/pro-components";

import {
  LockOutlined,
  MehOutlined,
  SmileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./styles.css";
import { actionSignIn } from "../../api/methods/postApi";
import { useState } from "react";
import { GodMod } from "../../utils/GodMod";
import { APP_NAME } from "../../constant";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";

const Signin = () => {
  const { t } = useTranslation();
  const i18n = (key) => t(`page.sign_in.${key}`);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [buttonLoading, setButtonLoading] = useState(false);

  const onFinish = (values) => {
    setButtonLoading(true);
    actionSignIn({
      account: values.username,
      passwd: CryptoJS.MD5(values.password).toString(),
    })
      .then((data) => {
        navigate("/home");
        if (Cookies.get("token")) {
          Cookies.remove("token");
        }
        Cookies.set("token", data.token);
        notification.open({
          message: i18n("loginSuccess"),
          description: `${i18n("welcome")} ${values.username}`,
          icon: <SmileOutlined className="text-blue-500" />,
        });
        dispatch({ type: "INITIALIZE_API" });
      })
      .catch((err) => {})
      .finally(() => {
        setButtonLoading(false);
      });
  };
  return (
    <main
      style={{
        background: `url(https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png)`,
      }}
      className="flex items-center justify-center w-full h-full absolute bg-cover bg-no-repeat bg-center"
    >
      <section className="bg-white shadow">
        <LoginForm
          logo={process.env.REACT_APP_LOGO_PATH}
          title={APP_NAME}
          subTitle={i18n("backendCms")}
          onValuesChange={(values) => {}}
          loading={buttonLoading}
          onFinish={(values) => {
            onFinish(values);
          }}
        >
          <ProFormText
            name="username"
            fieldProps={{
              size: "large",
              prefix: <UserOutlined className={"prefixIcon"} />,
            }}
            placeholder={i18n("loginName")}
            rules={[
              {
                required: true,
                message: i18n("pleaseInputLoginName"),
              },
            ]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: "large",
              prefix: <LockOutlined className={"prefixIcon"} />,
            }}
            placeholder={i18n("password")}
            rules={[
              {
                required: true,
                message: i18n("pleaseInputPassword"),
              },
            ]}
          ></ProFormText.Password>
        </LoginForm>
      </section>
    </main>
  );
};

export default Signin;
