import { Button } from "antd";
import CommonModal from "../../../../components/modal/commonModal";
import { ContactsOutlined } from "@ant-design/icons";
import PromotionForm from "../form/promotionForm";

const CreatePromotion = () => {
  return (
    <CommonModal
      modalProps={{
        title: (
          <p>
            <ContactsOutlined />
            新增活動
          </p>
        ),
      }}
      useButton={
        <Button icon={<ContactsOutlined />} type="primary">
          新增活動
        </Button>
      }
    >
      <PromotionForm />
    </CommonModal>
  );
};

export default CreatePromotion;
