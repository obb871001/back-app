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

const Signin = () => {
  const navigate = useNavigate();

  const [buttonLoading, setButtonLoading] = useState(false);

  const onFinish = (values) => {
    setButtonLoading(true);
    // if (GodMod) {
    //   navigate("/home");
    //   notification.open({
    //     message: "老子登入了",
    //     description: `歡迎回來 ${values.username}`,
    //     icon: <SmileOutlined className="text-blue-500" />,
    //   });
    //   return;
    // }
    actionSignIn({
      account: values.username,
      passwd: CryptoJS.MD5(values.password).toString(),
    })
      .then((data) => {
        navigate("/home");
        if (sessionStorage.getItem("token")) {
          sessionStorage.removeItem("token");
        }
        sessionStorage.setItem("token", data.token);
        notification.open({
          message: data.message,
          description: `歡迎回來 ${values.username}`,
          icon: <SmileOutlined className="text-blue-500" />,
        });
      })
      .catch((err) => {
        const data = err.response.data;
        notification.open({
          message: data.message,
          description: `請檢查帳號密碼`,
          icon: <MehOutlined className="text-red-500" />,
        });
      })
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
          title="Boom69"
          subTitle="後台管理"
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
            placeholder={"用户名"}
            rules={[
              {
                required: true,
                message: "请输入用户名!",
              },
            ]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: "large",
              prefix: <LockOutlined className={"prefixIcon"} />,
            }}
            placeholder={"密码"}
            rules={[
              {
                required: true,
                message: "请输入密码!",
              },
            ]}
          ></ProFormText.Password>
        </LoginForm>
      </section>
    </main>
  );
};

export default Signin;
