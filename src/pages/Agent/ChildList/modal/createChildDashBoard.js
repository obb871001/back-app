import { Button, Form, Space, notification } from "antd";
import CryptoJS from "crypto-js";
import { MehOutlined } from "@ant-design/icons";

import CommonModal from "../../../../components/modal/commonModal";
import { createAgent } from "../../../../api/methods/postApi";
import CreateChildForm from "../form/createChildForm";
import { useDispatch, useSelector } from "react-redux";
import { updateAgentBasic } from "../../../../api/methods/patchApi";
import { ProForm } from "@ant-design/pro-components";
import { useForm } from "antd/es/form/Form";
import { useTranslation } from "react-i18next";
import CommonForm from "../../../../components/modal/commonForm";
import { useNavigate } from "react-router";
import { hasSearched } from "../../../../redux/action/form/action";
import CommonPageTitle from "../../../../components/layout/CommonPageTitle";

const CreateChildDashBoard = () => {
  const { t } = useTranslation();
  const i18n_commonModal = (key) => t(`commonModal.${key}`);

  const popType = useSelector((state) => state.popType);
  const childDetail = useSelector((state) => state.commonDetail);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [form] = useForm();

  const handleSubmit = async (formData) => {
    try {
      if (popType === "edit") {
        await updateAgentBasic({
          uid: childDetail.uid,
          patchData: {
            ...formData,
            menu_editable: formData.menu_editable || [],
            menu_permission: formData.menu_permission || [],
            type: "child",
          },
        });
      } else {
        await createAgent({
          //創建子代理
          data: {
            ...formData,
            menu_editable: formData.menu_editable || [],
            menu_permission: formData.menu_permission || [],
            passwd: CryptoJS.MD5(formData.passwd).toString(),
            type: "child",
          },
        });
      }
      navigate(`/systemsetting/sublist?search_cagent=${formData.cagent}`);
      dispatch(hasSearched());
    } catch (err) {
      throw err;
    }
  };

  return (
    <>
      <CommonPageTitle pagePath="createchild" />

      <CommonForm
        submitFunction={handleSubmit}
        customPath="/systemsetting/sublist"
        proFormProps={{
          buttonProps: {
            cancelText: "backToSubList",
          },
        }}
      >
        <CreateChildForm form={form} />
      </CommonForm>
    </>
  );
};

export default CreateChildDashBoard;
