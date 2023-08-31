import { Button, notification } from "antd";
import CryptoJS from "crypto-js";
import { MehOutlined } from "@ant-design/icons";

import CommonModal from "../../../../components/modal/commonModal";
import { createAgent } from "../../../../api/methods/postApi";
import CreateChildForm from "../form/createChildForm";
import { useSelector } from "react-redux";

const CreateChild = () => {
  const popType = useSelector((state) => state.popType);
  const childDetail = useSelector((state) => state.commonDetail);
  console.log(childDetail);
  const handleSubmit = async (formData) => {
    try {
      await createAgent({
        //創建子代理
        data: {
          ...formData,
          menu_editable: formData.menu_permission || [],
          menu_permission: formData.menu_permission || [],
          uid: popType === "edit" ? childDetail.uid : null,
          passwd: CryptoJS.MD5(formData.password).toString(),
          type: "child",
        },
      });
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
