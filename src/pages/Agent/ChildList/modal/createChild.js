import { Button, notification } from "antd";
import CryptoJS from "crypto-js";
import { MehOutlined } from "@ant-design/icons";

import CommonModal from "../../../../components/modal/commonModal";
import { createAgent } from "../../../../api/methods/postApi";
import CreateChildForm from "../form/createChildForm";
import { useSelector } from "react-redux";
import { updateAgentBasic } from "../../../../api/methods/patchApi";

const CreateChild = () => {
  const popType = useSelector((state) => state.popType);
  const childDetail = useSelector((state) => state.commonDetail);
  const handleSubmit = async (formData) => {
    try {
      if (popType === "edit") {
        await updateAgentBasic({
          uid: childDetail.uid,
          patchData: {
            ...formData,
            menu_editable: formData.menu_editable || [],
            menu_permission: formData.menu_permission || [],
            passwd: CryptoJS.MD5(formData.passwd).toString(),
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
    } catch (err) {
      throw err;
    }
  };

  return (
    <CommonModal
      modalProps={{
        title: popType === "edit" ? "編輯子帳號" : "創建子帳號",
        width: 700,
      }}
      modalTrigger={true}
      submitFunction={handleSubmit}
      antdModalProps={{
        okText: popType === "edit" ? "編輯子帳號" : "創建子帳號",
      }}
    >
      <CreateChildForm />
    </CommonModal>
  );
};

export default CreateChild;
