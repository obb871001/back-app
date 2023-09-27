import { ModalForm } from "@ant-design/pro-components";
import { Form, message, notification } from "antd";
import { useDispatch } from "react-redux";
import { clearForm, storeForm } from "../../redux/action/form/action";
import { MehOutlined, SmileOutlined } from "@ant-design/icons";
import React, { Children } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePreviousPagePath } from "../../hooks/usePreviousPagePath";
import {
  clearDetail,
  clearPopType,
  trigger,
} from "../../redux/action/common/action";
import { useTranslation } from "react-i18next";

const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const CommonModal = ({
  children,
  modalProps,
  modalTrigger,
  setModalTrigger,
  useButton,
  initialValues,
  submitFunction,
  antdModalProps,
}) => {
  const { t } = useTranslation();
  const i18n = (key) => t(`commonModal.${key}`);

  const { width = 600, title } = modalProps || {};

  const dispatch = useDispatch();

  const location = useLocation();
  const navigate = useNavigate();
  const previousPath = usePreviousPagePath();

  const [form] = Form.useForm();

  const clearFormAndDetail = () => {
    dispatch(clearForm());
    dispatch(clearDetail());
    dispatch(clearPopType());
    navigate(-1);
  };

  const propsChildren = Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        form,
      });
    }
    return child;
  });

  return (
    <ModalForm
      form={form}
      submitTimeout={2000}
      title={title}
      width={width}
      trigger={useButton ?? false}
      open={modalTrigger}
      onOpenChange={setModalTrigger}
      autoFocusFirstInput
      onFinish={async (values) => {
        await waitTime(2000);
        try {
          const successMessage = await submitFunction(values);
          notification.open({
            message: i18n("submitSuccess"),
            description: successMessage,
            icon: <SmileOutlined className="text-green-500" />,
          });
          if (useButton) {
            if (modalTrigger) {
              setModalTrigger(false);
            } //卡在這裡 ModalForm的bug
          }
          dispatch(trigger());
          clearFormAndDetail();
          return true;
        } catch (error) {
          const data = error?.response?.data?.message || error; //可以客製化error訊息喔
          if (typeof data === "string") {
            notification.error({
              message: i18n("submitFail"),
              description: data,
              icon: <MehOutlined className="text-red-500" />,
            });
          } else if (typeof data === "object") {
            const errorData = Object.values(data).flat();
            notification.error({
              message: i18n("submitFail"),
              description: errorData.map((item, index) => (
                <div>
                  {index + 1}：{item}
                </div>
              )),
              icon: <MehOutlined className="text-red-500" />,
            });
          } else {
            notification.error({
              message: i18n("submitFail"),
              description: data,
              icon: <MehOutlined className="text-red-500" />,
            });
          }
        }
      }}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => {
          clearFormAndDetail();
        },
        cancelText: i18n("cancelText"),
        ...antdModalProps,
      }}
      initialValues={initialValues}
      onValuesChange={(changedValues, allValues) => {
        dispatch(storeForm(allValues));
      }}
    >
      {propsChildren}
    </ModalForm>
  );
};

export default CommonModal;
