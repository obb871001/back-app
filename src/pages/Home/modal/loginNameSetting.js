import CryptoJS from "crypto-js";
import { useState } from "react";

import { MehOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";

import LoginNameForm from "../form/loginNameForm";
import CommonModal from "../../../components/modal/commonModal";
import { setFirstLoginName } from "../../../api/methods/postApi";
import { notification } from "antd";
import { GodMod } from "../../../utils/GodMod";
import { useTranslation } from "react-i18next";

const LoginNameSetting = () => {
  const { t } = useTranslation();
  const i18n = (key) => t(`page.loginname.${key}`);

  const [trigger, setTrigger] = useState(true);

  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    if (formData.newPasswd !== formData.newPasswdAgain) {
      throw i18n("passwordNotSame");
    }
    try {
      await setFirstLoginName({
        data: {
          login_name: formData.loginname,
          new_passwd: CryptoJS.MD5(formData.newPasswd).toString(),
        },
      });
      sessionStorage.removeItem("token");
      navigate("/signin");
      return i18n("successSetLoginName");
    } catch (err) {
      throw err;
    }
  };

  return (
    <CommonModal
      modalProps={{ title: i18n("setLoginname"), width: 600 }}
      modalTrigger={trigger}
      setModalTrigger={setTrigger}
      submitFunction={handleSubmit}
      antdModalProps={{
        onCancel: () => {
          if (!GodMod) {
            navigate("/signin");
            notification.error({
              message: i18n("unsetLoginName"),
              icon: <MehOutlined className="text-red-500" />,
            });
          }
        },
      }}
    >
      <LoginNameForm />
    </CommonModal>
  );
};

export default LoginNameSetting;
