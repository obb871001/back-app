import { ProFormGroup, ProFormText } from "@ant-design/pro-components";
import { Divider } from "antd";
import React from "react";
import CommonTitle from "../../../../components/form/commonTitle";
import CustomForm from "../../../../components/form/customForm";
import { useSelector } from "react-redux";

const ReferalForm = () => {
  const formDetail = useSelector((state) => state.formReducers);
  const CURRENCY = useSelector((state) => state.CURRENCY);

  const basicForm = [
    [
      {
        label: "推薦碼名稱",
        name: "title",
        type: "text",
        rules: [{ required: true, message: "請輸入標籤名稱" }],
      },
    ],
    [
      {
        label: "贈送点数",
        name: "giftPoints",
        type: "number",
        rules: [{ required: true, message: "請輸入贈送点数" }],
        fieldProps: { addonAfter: CURRENCY },
      },
      {
        label: "锁定倍数",
        name: "lockMultiple",
        type: "number",
        rules: [{ required: true, message: "請輸入锁定倍数" }],
        fieldProps: { addonAfter: "倍", min: 0 },
      },
    ],
    [
      {
        label: "開始日期",
        name: "std",
        type: "date",
        rules: [{ required: true, message: "請輸入開始日期" }],
        width: 200,
      },
      {
        label: "結束日期",
        name: "etd",
        type: "date",
        rules: [{ required: true, message: "請輸入結束日期" }],
        width: 200,
      },
    ],
  ];
  const conditionForm = [
    [
      {
        label: "介紹人數",
        name: "introducePeople",
        type: "number",
        rules: [{ required: true, message: "請輸入介紹人數" }],
        fieldProps: { addonAfter: "人" },
      },
      {
        label: "被介紹者需充值金額",
        name: "introduceDeposit",
        type: "number",
        rules: [{ required: true, message: "請輸入充值金額" }],
        fieldProps: { addonAfter: CURRENCY },
      },
    ],
    [
      {
        label: "開啟推薦碼最大領取次數",
        name: "openReferralTimes",
        type: "switch",
        fieldProps: { checked: formDetail.referralTimes > 0 },
      },

      {
        label: "推薦碼最大領取次數",
        name: "referralTimes",
        type: "number",
        fieldProps: { addonAfter: "次" },
        allowEmpty: true,
      },
    ],
  ];
  return (
    <>
      <CommonTitle title="基本設定" />
      {basicForm.map((group) => {
        return (
          <ProFormGroup>
            {group.map((item) => {
              return <CustomForm {...item} />;
            })}
          </ProFormGroup>
        );
      })}
      <CommonTitle title="條件設定" />
      {conditionForm.map((group) => {
        return (
          <ProFormGroup>
            {group.map((item) => {
              return <CustomForm {...item} />;
            })}
          </ProFormGroup>
        );
      })}
    </>
  );
};

export default ReferalForm;
