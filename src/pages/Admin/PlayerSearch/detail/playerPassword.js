import { ProForm, ProFormGroup, ProFormText } from "@ant-design/pro-components";
import { Button, Form, notification } from "antd";
import CryptoJS from "crypto-js";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";

import UseMergeableSearchParams from "../../../../hooks/useMergeableSearchParams";
import { resetPlayerPassword } from "../../../../api/methods/postApi";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const PlayerPassword = () => {
  const { t } = useTranslation();
  const i18n = (key) => t(`page.admin.playersearch.col.${key}`);
  const i18n_commonModal = (key) => t(`commonModal.${key}`);

  const [form] = useForm();

  const [searchParams, setSearchParams] = UseMergeableSearchParams();
  const { commonUid, tabKey } = searchParams;

  const playerDetail = useSelector((state) => state.commonDetail);
  const basicConfig = useSelector((state) => state.basicConfig);

  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    //切換頁籤重置欄位
    form.resetFields();
  }, [tabKey]);

  const onFinish = (values) => {
    setButtonLoading(true);
    resetPlayerPassword({
      uid: commonUid,
      passwd: CryptoJS.MD5(basicConfig?.default_passwd).toString(),
    })
      .then((res) => {
        notification.success({
          message: i18n_commonModal("submitSuccess"),
        });
      })
      .catch((err) => {
        const data = err.response.data;
        notification.error({
          message: i18n_commonModal("submitFail"),
        });
      })
      .finally(() => {
        setButtonLoading(false);
      });
  };

  return (
    <ProForm
      form={form}
      onFinish={async (values) => {
        onFinish(values);
      }}
      layout="horizontal"
      labelCol={{
        span: 5,
      }}
      wrapperCol={{
        span: 19,
      }}
      submitter={{
        render: (props, doms) => {
          return [
            <Form.Item label={i18n("action")}>
              <Button
                key="submit"
                type="primary"
                loading={buttonLoading}
                onClick={() => {
                  form.submit();
                }}
              >
                {i18n("resetPassword")}
              </Button>
            </Form.Item>,
          ];
        },
      }}
    >
      <ProForm.Item label={i18n("playerId")}>
        <ProFormText value={playerDetail?.memId} readonly />
      </ProForm.Item>
      <ProForm.Item label={i18n("defaultPassword")}>
        <ProFormText value={basicConfig?.default_passwd} readonly />
      </ProForm.Item>
    </ProForm>
  );
};

export default PlayerPassword;
