import { Button, notification } from "antd";
import CryptoJS from "crypto-js";
import { MehOutlined, SmileOutlined } from "@ant-design/icons";

import CommonModal from "../../../../components/modal/commonModal";
import CreateAgentForm from "../form/createAgentForm";
import { createAgent } from "../../../../api/methods/postApi";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const CreateAgent = ({ setTrigger }) => {
  const { t } = useTranslation();
  const i18n = (key) => t(`page.agentinfomation.agentlist.modal.${key}`);

  const popType = useSelector((state) => state.popType);
  const agentDetail = useSelector((state) => state.commonDetail);
  const handleSubmit = async (formData) => {
    try {
      await createAgent({
        data: {
          ...formData,
          menu_editable: formData.menu_permission || [],
          menu_permission: formData.menu_permission || [],
          uid: popType === "edit" ? agentDetail.uid : null,
          passwd: CryptoJS.MD5(formData.password).toString(),
          type: "cagent",
        },
      });
    } catch (err) {
      throw err;
    }
  };

  return (
    <CommonModal
      modalProps={{
        title: popType === "edit" ? i18n("editAgent") : i18n("createAgent"),
        width: 900,
      }}
      // useButton={
      //   <Button className="mb-[20px]" type="primary">
      //     創建代理
      //   </Button>
      // }
      modalTrigger={true}
      submitFunction={handleSubmit}
      antdModalProps={{
        okText: popType === "edit" ? i18n("editAgent") : i18n("createAgent  "),
      }}
    >
      <CreateAgentForm />
    </CommonModal>
  );
};

export default CreateAgent;
