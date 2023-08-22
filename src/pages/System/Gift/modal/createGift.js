import React from "react";
import CommonModal from "../../../../components/modal/commonModal";
import { Button } from "antd";
import { GiftOutlined } from "@ant-design/icons";
import GiftForm from "../form/giftForm";

const CreateGift = () => {
  return (
    <CommonModal
      modalProps={{
        title: (
          <p>
            <GiftOutlined />
            新增禮包
          </p>
        ),
      }}
      useButton={
        <Button icon={<GiftOutlined />} type="primary">
          新增禮包
        </Button>
      }
    >
      <GiftForm />
    </CommonModal>
  );
};

export default CreateGift;
