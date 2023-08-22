import React from "react";
import CommonTitle from "../../../../components/form/commonTitle";
import { ProFormGroup } from "@ant-design/pro-components";
import CustomForm from "../../../../components/form/customForm";
import { Divider } from "antd";
import { useSelector } from "react-redux";
import { CURRENCY } from "../../../../constant";

const GiftForm = () => {
  const formDetail = useSelector((state) => state.formReducers);

  const basicForm = [
    [
      {
        label: "礼包名称",
        name: "giftName",
        type: "text",
        placeholder: "例：登入禮包",
        rules: [{ required: true, message: "請輸入礼包名称" }],
      },
    ],
    [
      {
        label: "開始日期",
        name: "std",
        type: "date",
        rules: [{ required: true, message: "請輸入開始日期" }],
      },
      {
        label: "結束日期",
        name: "etd",
        type: "date",
        rules: [{ required: true, message: "請輸入結束日期" }],
      },
    ],
    [
      {
        label: "開啟狀態",
        name: "status",
        type: "switch",
      },
    ],
  ];

  const conditionForm = [
    [
      {
        label: "礼包類型",
        name: "giftType",
        type: "radio",
        placeholder: "例：註冊金",
        rules: [{ required: true, message: "請輸入礼包點數" }],
        options: [
          { label: "註冊金", value: "註冊金" },
          { label: "首存金", value: "首存金" },
          { label: "單次充值", value: "單次充值" },
        ],
      },
    ],
    [
      {
        label: "礼包點數",
        name: "giftPoints",
        type: "number",
        placeholder: "例：100",
        required: true,
        fieldProps: {
          addonAfter: CURRENCY,
        },
      },
      {
        label: "洗碼倍數",
        name: "giftMultiple",
        type: "number",
        placeholder: "例：2倍",
        required: true,
        fieldProps: {
          addonAfter: "倍",
        },
      },
    ],
    [
      {
        label: "开启使用次數限制",
        name: "openGiftTimes",
        type: "switch",
        fieldProps: { checked: formDetail.giftMaxTimes > 0 },
      },
      {
        label: "獎勵最大領取次數",
        tooltip:
          "例：設定100次，即為禮包被領取100次後狀態將自動關閉，留空則不限次數。",
        name: "giftMaxTimes",
        type: "number",
        fieldProps: { addonAfter: "次" },
        allowEmpty: true,
      },
    ],
    [
      ...(formDetail.giftType === "首存金"
        ? [
            {
              label: "最低存款金額",
              placeholder: "例：100",
              name: "depositLimit",
              type: "number",
              fieldProps: { addonAfter: CURRENCY },
              required: true,
              allowEmpty: true,
            },
          ]
        : []),
    ],
    [
      ...(formDetail.giftType === "單次充值"
        ? [
            {
              label: "最低存款金額",
              placeholder: "例：100",
              name: "depositLimit",
              type: "number",
              fieldProps: { addonAfter: CURRENCY },
              required: true,
              allowEmpty: true,
            },
            {
              label: "返現比例",
              placeholder: "例：10%",
              name: "rebateRatio",
              type: "number",
              fieldProps: { addonAfter: "%" },
            },
            {
              label: "最高返现金额",
              placeholder: `例：1000${CURRENCY}`,
              name: "rebateMax",
              type: "number",
              fieldProps: { addonAfter: CURRENCY },
              allowEmpty: true,
            },
          ]
        : []),
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
      <Divider dashed />
      <CommonTitle title="條件設置" />{" "}
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

export default GiftForm;
