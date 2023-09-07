import { Button } from "antd";
import CommonModal from "../../../../components/modal/commonModal";
import CreatePlayerForm from "../form/createPlayerForm";
import { createPlayer } from "../../../../api/methods/postApi";
import { useSelector } from "react-redux";
import { MD5 } from "crypto-js";
import { useTranslation } from "react-i18next";

const CreatePlayer = () => {
  const { t } = useTranslation();
  const i18n = (key) => t(`page.admin.playersearch.${key}`);

  const baseConfig = useSelector((state) => state.basicConfig);
  const handleSubmit = async (formData) => {
    try {
      await createPlayer({
        postData: {
          ...formData,
          passwd: baseConfig.member_default_passwd || MD5("123456").toString(),
        },
      });
    } catch (err) {
      throw err;
    }
  };

  return (
    <CommonModal
      modalProps={{ title: i18n("modal.title") }}
      modalTrigger={true}
      submitFunction={handleSubmit}
      antdModalProps={{ okText: i18n("modal.title") }}
    >
      <CreatePlayerForm />
    </CommonModal>
  );
};

export default CreatePlayer;
