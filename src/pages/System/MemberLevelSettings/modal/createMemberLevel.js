import { Button } from "antd";
import CommonModal from "../../../../components/modal/commonModal";
import MemberLevelForm from "../form/memberLevelForm";
import { CrownFilled } from "@ant-design/icons";

const CreateMemberLevel = () => {
  return (
    <CommonModal
      modalProps={{ title: "創建會員等級標籤", width: 700 }}
      useButton={
        <Button icon={<CrownFilled />} type="primary">
          創建標籤
        </Button>
      }
    >
      <MemberLevelForm />
    </CommonModal>
  );
};

export default CreateMemberLevel;
