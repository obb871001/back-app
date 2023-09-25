import { Button, Form, Space } from "antd";
import CommonModal from "../../../../components/modal/commonModal";
import CreatePlayerForm from "../form/createPlayerForm";
import { createPlayer } from "../../../../api/methods/postApi";
import { useDispatch, useSelector } from "react-redux";
import { MD5 } from "crypto-js";
import { useTranslation } from "react-i18next";
import CryptoJS from "crypto-js";
import { ProForm } from "@ant-design/pro-components";
import { useForm } from "antd/es/form/Form";
import CommonForm from "../../../../components/modal/commonForm";
import { useNavigate } from "react-router";
import { hasSearched } from "../../../../redux/action/form/action";
import CommonPageTitle from "../../../../components/layout/CommonPageTitle";

const CreatePlayer = () => {
  const { t } = useTranslation();
  const i18n = (key) => t(`page.admin.playersearch.${key}`);

  const [form] = useForm();

  const navigate = useNavigate();

  const baseConfig = useSelector((state) => state.basicConfig);
  const dispatch = useDispatch();
  const handleSubmit = async (formData) => {
    try {
      await createPlayer({
        postData: {
          ...formData,
          passwd:
            `${CryptoJS.MD5(baseConfig.default_passwd).toString()}` ||
            CryptoJS.MD5("123456").toString(),
        },
      });
      navigate(`/admin/playersearch?memId=${formData.memId}`);
      localStorage.setItem("lastPath", "playersearch");
      dispatch(hasSearched());
    } catch (err) {
      throw err;
    }
  };

  return (
    // <CommonModal
    //   modalProps={{ title: i18n("modal.title") }}
    //   modalTrigger={true}
    //   submitFunction={handleSubmit}
    //   antdModalProps={{ okText: i18n("modal.title") }}
    // >
    <>
      <CommonPageTitle pagePath="createplayer" />
      <CommonForm
        customPath={`/admin/playersearch`}
        proFormProps={{
          layout: "horizontal",
          labelCol: {
            span: 2,
          },
          wrapperCol: {
            span: 5,
          },
          buttonProps: {
            cancelText: "backToPlayerList",
          },
        }}
        submitFunction={handleSubmit}
      >
        <CreatePlayerForm />
      </CommonForm>
    </>
    // </CommonModal>
  );
};

export default CreatePlayer;
