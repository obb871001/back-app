import { ProForm, ProFormGroup, ProFormText } from "@ant-design/pro-components";
import { Button, notification } from "antd";
import CryptoJS from "crypto-js";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";

import UseMergeableSearchParams from "../../../../hooks/useMergeableSearchParams";
import { resetPlayerPassword } from "../../../../api/methods/postApi";
import { useSelector } from "react-redux";

const PlayerPassword = () => {
  const [form] = useForm();

  const [searchParams, setSearchParams] = UseMergeableSearchParams();
  const { playeruid, tabKey } = searchParams;

  const playerDetail = useSelector((state) => state.commonDetail);

  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    //切換頁籤重置欄位
    form.resetFields();
  }, [tabKey]);

  const onFinish = (values) => {
    setButtonLoading(true);
    console.log(values);
    if (values.password !== values.confirmPassword) {
      notification.error({
        message: "提交失敗",
        description: "兩次密碼輸入不一致",
      });
      setButtonLoading(false);
      return;
    }
    resetPlayerPassword({
      uid: playeruid,
      passwd: CryptoJS.MD5(values.password).toString(),
    })
      .then((res) => {
        console.log(res);
        notification.success({
          message: "提交成功",
        });
      })
      .catch((err) => {
        const data = err.response.data;
        notification.error({
          message: "提交失敗",
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
        console.log(values);
        onFinish(values);
      }}
      submitter={{
        render: (props, doms) => {
          return [
            <Button
              key="submit"
              type="primary"
              loading={buttonLoading}
              onClick={() => {
                form.submit();
              }}
            >
              重置會員密碼
            </Button>,
          ];
        },
      }}
      onValuesChange={(values) => {
        console.log(values);
      }}
    >
      <ProFormGroup>
        <ProForm.Item label="玩家名稱">
          <ProFormText value={playerDetail?.memId} readonly />
        </ProForm.Item>
      </ProFormGroup>{" "}
      <ProFormGroup>
        <ProForm.Item name="password" label="新密碼">
          <ProFormText.Password />
        </ProForm.Item>
      </ProFormGroup>{" "}
      <ProFormGroup>
        <ProForm.Item name="confirmPassword" label="確認新密碼">
          <ProFormText.Password />
        </ProForm.Item>
      </ProFormGroup>
    </ProForm>
  );
};

export default PlayerPassword;
