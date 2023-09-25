import { MehOutlined, SmileOutlined } from "@ant-design/icons";
import { ProForm } from "@ant-design/pro-components";
import { Button, Form, Space, notification } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { Children, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const CommonForm = ({ submitFunction, children, proFormProps, customPath }) => {
  const { t } = useTranslation();
  const i18n = (key) => t(`commonModal.${key}`);

  const [form] = useForm();

  const [buttonLoading, setButtonLoading] = useState(false);

  const navigate = useNavigate();

  const propsChildren = Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        form,
      });
    }
    return child;
  });

  return (
    <ProForm
      form={form}
      {...proFormProps}
      onFinish={async (values) => {
        setButtonLoading(true);
        await waitTime(2000);
        try {
          const successMessage = await submitFunction(values);
          notification.open({
            message: successMessage,
            description: i18n("submitSuccess"),
            icon: <SmileOutlined className="text-green-500" />,
          });
          setButtonLoading(false);
          return true;
        } catch (error) {
          const data = error?.response?.data?.message || error; //可以客製化error訊息喔
          if (typeof data === "string") {
            notification.error({
              message: data,
              description: i18n("submitFail"),
              icon: <MehOutlined className="text-red-500" />,
            });
          } else if (typeof data === "object") {
            const errorData = Object.values(data).flat();
            notification.error({
              message: errorData.map((item, index) => (
                <div>
                  {index + 1}：{item}
                </div>
              )),
              description: i18n("submitFail"),
              icon: <MehOutlined className="text-red-500" />,
            });
          } else {
            notification.error({
              message: data,
              description: i18n("submitFail"),
              icon: <MehOutlined className="text-red-500" />,
            });
          }
          setButtonLoading(false);
        }
      }}
      submitter={{
        render: (props, dom) => {
          return (
            <Form.Item label={i18n("action")}>
              <Space>
                <Button
                  loading={buttonLoading}
                  htmlType="submit"
                  type="primary"
                >
                  {i18n("submit")}
                </Button>
                <Button
                  loading={buttonLoading}
                  onClick={() => {
                    navigate(customPath || -1);
                  }}
                  htmlType="button"
                >
                  {i18n(proFormProps?.buttonProps?.cancelText || "cancel")}
                </Button>
              </Space>
            </Form.Item>
          );
        },
      }}
    >
      {" "}
      {propsChildren}
    </ProForm>
  );
};

export default CommonForm;
