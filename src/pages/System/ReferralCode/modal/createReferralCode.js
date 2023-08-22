import React from "react";
import CommonModal from "../../../../components/modal/commonModal";
import { Button } from "antd";
import { ShareAltOutlined } from "@ant-design/icons";
import ReferalForm from "../form/ReferalForm";

const CreateReferralCode = () => {
  return (
    <CommonModal
      modalProps={{
        title: (
          <p>
            <ShareAltOutlined />
            新增推廣碼
          </p>
        ),
      }}
      useButton={
        <Button icon={<ShareAltOutlined />} type="primary">
          新增推廣碼
        </Button>
      }
    >
      <ReferalForm />
    </CommonModal>
  );
};

export default CreateReferralCode;
