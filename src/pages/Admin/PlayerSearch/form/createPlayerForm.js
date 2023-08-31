import { ProFormGroup, ProFormText } from "@ant-design/pro-components";
import React from "react";
import {
  BIRTHDAY_EXPRESSION,
  PHONE_EXPRESSION,
  USERNAME_EXPRESSION,
} from "../../../../regex";
import NoticeTitle from "../../../../components/hint/noticeTitle";
import CustomForm from "../../../../components/form/customForm";
import { Alert } from "antd";

const CreatePlayerForm = () => {
  const requiredForm = [
    [
      {
        label: "玩家帳號",
        name: "memId",
        type: "text",
        required: true,
      },
    ],
    [
      {
        label: "代理",
        name: "cagent",
        type: "text",
        required: true,
      },
    ],
  ];

  const optionalForm = [
    [
      {
        label: "真實姓名",
        name: "true_name",
        type: "text",
      },
    ],
    [
      {
        label: "手機",
        name: "mobile",
        type: "text",
        rules: [{ pattern: PHONE_EXPRESSION, message: "請輸入正確的手機號碼" }],
      },
    ],
    [
      {
        label: "Email",
        name: "email",
        type: "text",
      },
    ],
    [
      {
        label: "生日",
        name: "birthday",
        type: "text",
        rules: [
          { pattern: BIRTHDAY_EXPRESSION, message: "請輸入正確的生日格式" },
        ],
        ex: "1998-10-01",
      },
    ],
  ];
  return (
    <>
      <Alert message="登入預設密碼為123456" type="info" showIcon />
      <NoticeTitle required />
      {requiredForm.map((group) => {
        return (
          <ProFormGroup>
            {group.map((item) => {
              return <CustomForm {...item} />;
            })}
          </ProFormGroup>
        );
      })}
      <NoticeTitle optional />
      {optionalForm.map((group) => {
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

export default CreatePlayerForm;
