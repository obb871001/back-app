import { Button } from "antd";
import CommonModal from "../../../../components/modal/commonModal";
import { ContactsOutlined } from "@ant-design/icons";
import TaskForm from "../form/taskForm";

const CreateTask = () => {
  return (
    <CommonModal
      modalProps={{ title: "創建每日簽到", width: 700 }}
      useButton={
        <Button icon={<ContactsOutlined />} type="primary">
          創建任務
        </Button>
      }
    >
      <TaskForm />
    </CommonModal>
  );
};

export default CreateTask;
