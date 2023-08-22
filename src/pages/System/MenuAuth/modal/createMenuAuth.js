import { Button } from "antd";
import CommonModal from "../../../../components/modal/commonModal";
import MenuPermissions from "../../../../components/permissionComponents/menuPermissions";
import MenuForm from "../form/menuForm";
import { TagsOutlined } from "@ant-design/icons";

const CreateMenuAuth = () => {
  return (
    <CommonModal
      modalProps={{ title: <p><TagsOutlined/>新增選單權限標籤</p> }}
      useButton={
        <Button icon={<TagsOutlined />} type="primary">
          新增選單權限標籤
        </Button>
      }
    >
      <MenuForm />
      <MenuPermissions />
    </CommonModal>
  );
};

export default CreateMenuAuth;
