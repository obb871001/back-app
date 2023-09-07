import React from "react";
import CustomModal from "../../modal/customModal";
import { ProForm } from "@ant-design/pro-components";
import { useForm } from "antd/es/form/Form";
import CustomForm from "../../form/customForm";
import { Button, Form, Space } from "antd";

const Password = ({ isModalOpen, setIsModalOpen }) => {
  const [form] = useForm();
  const basicForm = [
    {
      label: "舊密碼",
      name: "old_password",
      type: "password",
      required: true,
    },
    {
      label: "新密碼",
      name: "new_password",
      type: "password",
      required: true,
    },
    {
      label: "確認新密碼",
      name: "confirm_new_password",
      type: "password",
      required: true,
    },
  ];
  return (
    <CustomModal
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      modalProps={{ title: `重設密碼`, width: 550 }}
    >
      <ProForm
        form={form}
        layout="horizontal"
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 19,
        }}
        submitter={{
          render: (props, dom) => {
            return (
              <Form.Item label="操作">
                <Space>
                  <Button htmlType="submit" type="primary">
                    提交
                  </Button>
                </Space>
              </Form.Item>
            );
          },
        }}
        onFinish={() => {}}
      >
        {basicForm.map((item) => {
          return <CustomForm {...item} />;
        })}
      </ProForm>
    </CustomModal>
  );
};

export default Password;
