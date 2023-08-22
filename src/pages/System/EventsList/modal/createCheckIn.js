import { Button } from "antd";
import CommonModal from "../../../../components/modal/commonModal";
import { CalendarOutlined } from "@ant-design/icons";
import CheckInForm from "../form/checkInForm";
import { useSelector } from "react-redux";

const CreateCheckIn = () => {
  return (
    <CommonModal
      modalProps={{ title: "創建每日簽到", width: 700 }}
      useButton={
        <Button icon={<CalendarOutlined />} type="primary">
          創建每日簽到
        </Button>
      }
    >
      <CheckInForm />
    </CommonModal>
  );
};

export default CreateCheckIn;
