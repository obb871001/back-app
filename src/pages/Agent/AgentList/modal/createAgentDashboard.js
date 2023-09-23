import { Button, Form, Space, notification } from "antd";
import CryptoJS from "crypto-js";
import { MehOutlined, SmileOutlined } from "@ant-design/icons";

import CommonModal from "../../../../components/modal/commonModal";
import CreateAgentForm from "../form/createAgentForm";
import { createAgent } from "../../../../api/methods/postApi";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { updateAgentBasic } from "../../../../api/methods/patchApi";
import { ProForm } from "@ant-design/pro-components";
import { useForm } from "antd/es/form/Form";
import CommonForm from "../../../../components/modal/commonForm";
import { useNavigate } from "react-router";
import { hasSearched } from "../../../../redux/action/form/action";
import CommonPageTitle from "../../../../components/layout/CommonPageTitle";

const CreateAgentDashBoard = ({ setTrigger }) => {
  const { t } = useTranslation();
  const i18n = (key) => t(`page.agentinfomation.agentlist.modal.${key}`);
  const i18n_commonModal = (key) => t(`commonModal.${key}`);

  const navigate = useNavigate();

  const popType = useSelector((state) => state.popType);
  const agentDetail = useSelector((state) => state.commonDetail);
  const dispatch = useDispatch();
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
      navigate(`/admin/agentlist?search_cagent=${formData.cagent}`);
      dispatch(hasSearched());
    } catch (err) {
      throw err;
    }
  };

  return (
    <>
      <CommonPageTitle pagePath="createagent" />
      <CommonForm
        submitFunction={handleSubmit}
        proFormProps={{
          buttonProps: {
            cancelText: "backToAgentList",
          },
        }}
      >
        <CreateAgentForm />
      </CommonForm>
    </>
  );
};

export default CreateAgentDashBoard;
