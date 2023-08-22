import { useSelector } from "react-redux";
import { Button, Divider, Form, Space, notification } from "antd";

import CustomForm from "../../../../components/form/customForm";
import UseMergeableSearchParams from "../../../../hooks/useMergeableSearchParams";
import Balance from "./settings/balance";
import { useEffect, useState } from "react";
import { ProForm } from "@ant-design/pro-components";
import { useForm } from "antd/es/form/Form";
import { updatePlayerConfig } from "../../../../api/methods/postApi";

const PlayerBasic = () => {
  const [searchParams, setSearchParams] = UseMergeableSearchParams();
  const { playeruid } = searchParams;

  const playerDetail = useSelector((state) => state.commonDetail);

  const [form] = useForm();

  const [editPlayer, setEditPlayer] = useState(false);
  const [updateButton, setUpdateButton] = useState(false);

  const basicDetail = [
    {
      label: "玩家名稱",
      name: "memId",
      value: playerDetail.memId,
      type: "text",
      readonly: true,
    },
    {
      label: "上級代理",
      value: playerDetail.cagent0,
      type: "text",
      readonly: true,
    },
    {
      label: "真實姓名",
      value: playerDetail.actual_name,
      type: "text",
      readonly: !editPlayer,
    },
    {
      label: "虛擬貨幣錢包地址",
      value: playerDetail.crypto_address,
      type: "text",
      readonly: !editPlayer,
    },
    {
      label: "電子郵件",
      name: "email",
      type: "text",
      readonly: !editPlayer,
    },
    {
      label: "手機號碼",
      name: "mobile",
      type: "text",
      readonly: !editPlayer,
    },
    {
      label: "註冊日期",
      value: playerDetail.createDate,
      type: "text",
      readonly: true,
    },
  ];

  const onUpdatePlayer = (values) => {
    setUpdateButton(true);
    console.log(values);
    updatePlayerConfig({
      uid: playeruid,
      email: values.email,
      mobile: values.mobile,
      bank_name: values.bank_name, //真實名稱
    })
      .then((res) => {
        console.log(res);
        notification.success({
          message: "提交成功",
        });
        form.resetFields();
      })
      .catch((err) => {
        const data = err.response.data;
        notification.error({
          message: "提交失敗",
        });
      })
      .finally(() => {
        setUpdateButton(false);
      });
  };

  return (
    <>
      <ProForm
        form={form}
        onFinish={(values) => {
          onUpdatePlayer(values);
        }}
        initialValues={{
          email: playerDetail.email,
          mobile: playerDetail.mobile,
        }}
        onValuesChange={(changedValues, allValues) => {
          console.log(changedValues, allValues);
        }}
        submitter={{
          render: (props, doms) => {
            return editPlayer
              ? [
                  <Button
                    loading={updateButton}
                    key="cancel"
                    danger
                    type="primary"
                    onClick={() => {
                      setEditPlayer(false);
                      form.resetFields();
                    }}
                  >
                    取消
                  </Button>,
                  <Button
                    loading={updateButton}
                    key="submit"
                    onClick={() => {
                      form.submit();
                    }}
                  >
                    提交
                  </Button>,
                ]
              : [
                  <Button
                    key="editPlayer"
                    onClick={() => {
                      setEditPlayer(true);
                    }}
                  >
                    編輯玩家基本資料
                  </Button>,
                ];
          },
        }}
      >
        {basicDetail.map((item) => {
          return (
            <>
              <CustomForm {...item} />
              {item.border && <Divider />}
            </>
          );
        })}
      </ProForm>
      <Divider />
      <Balance />
    </>
  );
};

export default PlayerBasic;
