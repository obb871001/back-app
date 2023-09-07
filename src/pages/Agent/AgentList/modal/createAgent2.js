import { MehOutlined, PlusOutlined } from "@ant-design/icons";
import { StepsForm } from "@ant-design/pro-components";
import { Button, Form, message, Modal, notification } from "antd";
import { useState } from "react";
import StepOne from "../step/BasicInformation";
import StepTwo from "../step/menuAuth";
import StepThree from "../step/gameAuth";
import StepFour from "../step/gameCommission";
import MenuPermissions from "../../../../components/permissionComponents/menuPermissions";
import { useDispatch, useSelector } from "react-redux";
import { clearForm, storeForm } from "../../../../redux/action/form/action";
import { createAgent } from "../../../../api/methods/postApi";
import CryptoJS from "crypto-js";
import { useTranslation } from "react-i18next";

const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
const CreateAgentTwo = () => {
  const { t } = useTranslation();
  const i18n = (key) => t(`page.agentinfomation.agentlist.modal.${key}`);

  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const formReducers = useSelector((state) => state.formReducers);

  const steps = [
    {
      title: `${i18n("set")}${i18n("basicInfo")}`,
      content: <StepOne form={form} />,
    },
    {
      title: `${i18n("set")}${i18n("menuPermission")}`,
      content: <StepTwo form={form} />,
    },
    {
      title: `${i18n("set")}${i18n("gamePermission")}`,
      content: <StepThree form={form} />,
    },
    {
      title: `${i18n("set")}${i18n("gameCommission")}`,
      content: <StepFour form={form} />,
    },
  ];

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        <PlusOutlined />
        {i18n("create")}
      </Button>
      {visible && (
        <StepsForm
          form={form}
          onFinish={async (values) => {
            console.log(formReducers);
            await createAgent({
              data: {
                ...formReducers,
                passwd: CryptoJS.MD5(formReducers.password).toString(),
                type: "cagent",
              },
            });
            notification.open({
              message: "Success Message",
              description: `創建成功`,
              icon: <MehOutlined className="text-green-500" />,
            });
            await waitTime(1000);
            setVisible(false);
            dispatch(clearForm());
            message.success("提交成功");
          }}
          formProps={{
            validateMessages: {
              required: "此项为必填项",
            },
          }}
          stepsFormRender={(dom, submitter) => {
            return (
              <Modal
                title={i18n("create")}
                width={800}
                onCancel={() => setVisible(false)}
                open={visible}
                footer={submitter}
                destroyOnClose
              >
                {dom}
              </Modal>
            );
          }}
        >
          {steps.map((item) => (
            <StepsForm.StepForm
              name={item.title}
              title={item.title}
              onFinish={async (values) => {
                dispatch(
                  storeForm({ ...formReducers, ...form.getFieldValue() })
                );
                return true;
              }}
            >
              {item.content}
            </StepsForm.StepForm>
          ))}
        </StepsForm>
      )}
    </>
  );
};

export default CreateAgentTwo;
