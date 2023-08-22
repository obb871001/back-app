import { Button } from "antd";
import CommonModal from "../../../../components/modal/commonModal";
import CreatePlayerForm from "../form/createPlayerForm";

const CreatePlayer = () => {
  return (
    <CommonModal
      modalProps={{ title: "創建玩家" }}
      useButton={
        <Button className="mb-[20px]" type="primary">
          創建玩家
        </Button>
      }
    >
      <CreatePlayerForm />
    </CommonModal>
  );
};

export default CreatePlayer;
