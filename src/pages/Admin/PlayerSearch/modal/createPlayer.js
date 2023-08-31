import { Button } from "antd";
import CommonModal from "../../../../components/modal/commonModal";
import CreatePlayerForm from "../form/createPlayerForm";
import { createPlayer } from "../../../../api/methods/postApi";
import { useSelector } from "react-redux";
import { MD5 } from "crypto-js";

const CreatePlayer = () => {
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
      modalProps={{ title: "創建玩家" }}
      modalTrigger={true}
      submitFunction={handleSubmit}
      antdModalProps={{ okText: "創建玩家" }}
    >
      <CreatePlayerForm />
    </CommonModal>
  );
};

export default CreatePlayer;
