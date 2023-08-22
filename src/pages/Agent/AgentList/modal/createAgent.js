import { Button, notification } from "antd";
import CryptoJS from "crypto-js";
import { MehOutlined, SmileOutlined } from "@ant-design/icons";

import CommonModal from "../../../../components/modal/commonModal";
import CreateAgentForm from "../form/createAgentForm";
import { createAgent } from "../../../../api/methods/postApi";
import { useSelector } from "react-redux";

const CreateAgent = ({ setTrigger }) => {
  const popType = useSelector((state) => state.popType);
  const agentDetail = useSelector((state) => state.commonDetail);
  const handleSubmit = async (formData) => {
    try {
      await createAgent({
        data: {
          ...formData,
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
        title: popType === "edit" ? "編輯代理" : "創建代理",
        width: 900,
      }}
      // useButton={
      //   <Button className="mb-[20px]" type="primary">
      //     創建代理
      //   </Button>
      // }
      modalTrigger={true}
      submitFunction={handleSubmit}
      antdModalProps={{ okText: popType === "edit" ? "編輯代理" : "創建代理" }}
    >
      <CreateAgentForm />
    </CommonModal>
  );
};

export default CreateAgent;
