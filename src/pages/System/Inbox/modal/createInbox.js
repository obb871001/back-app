import React from "react";
import CommonModal from "../../../../components/modal/commonModal";
import { Button } from "antd";
import { MailOutlined } from "@ant-design/icons";
import InboxForm from "../form/inboxForm";

const CreateInbox = () => {
  return (
    <CommonModal
      modalProps={{
        title: (
          <p>
            <MailOutlined />
            新增站內信
          </p>
        ),
      }}
      useButton={
        <Button icon={<MailOutlined />} type="primary">
          新增站內信
        </Button>
      }
    >
      <InboxForm />
    </CommonModal>
  );
};

export default CreateInbox;
