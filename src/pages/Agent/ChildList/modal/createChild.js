import { Button, notification } from "antd";
import CryptoJS from "crypto-js";
import { MehOutlined } from "@ant-design/icons";

import CommonModal from "../../../../components/modal/commonModal";
import { createAgent } from "../../../../api/methods/postApi";
import CreateChildForm from "../form/createChildForm";

const CreateChild = () => {
  const handleSubmit = async (formData) => {
    try {
      await createAgent({
        //創建子代理
        data: {
          ...formData,
          passwd: CryptoJS.MD5(formData.password).toString(),
          type: "child",
        },
      });
      notification.open({
        message: "Success Message",
        description: `創建成功`,
        icon: <MehOutlined className="text-green-500" />,
      });
    } catch (err) {
      throw err;
    }
  };

  return (
    <CommonModal
      modalProps={{ title: "創建子帳號", width: 700 }}
      useButton={
        <Button className="mb-[20px]" type="primary">
          創建子帳號
        </Button>
      }
      submitFunction={handleSubmit}
    >
      <CreateChildForm />
    </CommonModal>
  );
};

export default CreateChild;
