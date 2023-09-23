import { Button, notification } from "antd";
import CryptoJS from "crypto-js";
import { MehOutlined, SmileOutlined } from "@ant-design/icons";

import CommonModal from "../../../../components/modal/commonModal";
import CreateAgentForm from "../form/createAgentForm";
import { createAgent } from "../../../../api/methods/postApi";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { updateAgentBasic } from "../../../../api/methods/patchApi";

const CreateAgent = ({ setTrigger }) => {
  const { t } = useTranslation();
  const i18n = (key) => t(`page.agentinfomation.agentlist.modal.${key}`);

  const popType = useSelector((state) => state.popType);
  const agentDetail = useSelector((state) => state.commonDetail);
  const handleSubmit = async (formData) => {
    try {
      if (popType === "edit") {
        await updateAgentBasic({
          uid: agentDetail.uid,
          patchData: {
            ...formData,
            menu_editable: formData.menu_editable || [],
            menu_permission: formData.menu_permission || [],
            type: "cagent",
          },
        });
      } else {
        await createAgent({
          data: {
            ...formData,
            menu_editable: formData.menu_editable || [],
            menu_permission: formData.menu_permission || [],
            passwd: CryptoJS.MD5(formData.passwd).toString(),
            type: "cagent",
          },
        });
      }
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
      modalTrigger={true}
      submitFunction={handleSubmit}
      antdModalProps={{
        okText: popType === "edit" ? i18n("editAgent") : i18n("createAgent"),
      }}
    >
      <CreateAgentForm />
    </CommonModal>
  );
};

export default CreateAgent;
