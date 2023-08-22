import CryptoJS from "crypto-js";
import { useState } from "react";

import { MehOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";

import LoginNameForm from "../form/loginNameForm";
import CommonModal from "../../../components/modal/commonModal";
import { setFirstLoginName } from "../../../api/methods/postApi";
import { notification } from "antd";
import { GodMod } from "../../../utils/GodMod";

const LoginNameSetting = () => {
  const [trigger, setTrigger] = useState(true);

  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    if (formData.newPasswd !== formData.newPasswdAgain) {
      throw "兩次密碼輸入不一致";
    }
    try {
      await setFirstLoginName({
        data: {
          loginname: formData.loginname,
          newPasswd: CryptoJS.MD5(formData.newPasswd).toString(),
        },
      });
      sessionStorage.removeItem("token");
      navigate("/signin");
      return "登錄名已成功設置，請重新登入，並使用新的登錄名登入";
    } catch (err) {
      throw err;
    }
  };

  return (
    <CommonModal
      modalProps={{ title: "設定登入名稱", width: 600 }}
      modalTrigger={trigger}
      setModalTrigger={setTrigger}
      submitFunction={handleSubmit}
      antdModalProps={{
        onCancel: () => {
          if (!GodMod) {
            navigate("/signin");
            notification.error({
              message: "尚未設置登入名稱，請重新登入",
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
