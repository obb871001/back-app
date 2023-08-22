import { Button } from "antd";
import CommonModal from "../../../../components/modal/commonModal";
import { TagsOutlined } from "@ant-design/icons";
import GameForm from "../form/gameForm";
import GamePermission from "../../../../components/permissionComponents/gamePermission";

const CreateGameAuth = () => {
  return (
    <CommonModal
      modalProps={{
        title: (
          <p>
            <TagsOutlined />
            新增遊戲權限標籤
          </p>
        ),
      }}
      useButton={
        <Button icon={<TagsOutlined />} type="primary">
          新增遊戲權限標籤
        </Button>
      }
    >
      <GameForm />
      <GamePermission />
    </CommonModal>
  );
};

export default CreateGameAuth;
