import { Button, Divider } from "antd";
import CommonModal from "../../../../components/modal/commonModal";
import { CrownFilled } from "@ant-design/icons";
import CommissionForm from "../form/commissionForm";
import CommissionPermission from "../../../../components/permissionComponents/commissionPermission";

const CreateCommissionTag = () => {
  return (
    <CommonModal
      modalProps={{ title: "創建代理佣金標籤", width: 700 }}
      useButton={
        <Button icon={<CrownFilled />} type="primary">
          創建標籤
        </Button>
      }
    >
      <CommissionForm />
      <CommissionPermission />
    </CommonModal>
  );
};

export default CreateCommissionTag;
