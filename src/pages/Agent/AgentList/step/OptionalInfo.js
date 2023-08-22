import { ProFormGroup, ProFormText } from "@ant-design/pro-components";
import React from "react";
import CustomForm from "../../../../components/form/customForm";
import { BIRTHDAY_EXPRESSION, PHONE_EXPRESSION } from "../../../../regex";

const OptionalInfo = () => {
  const basicForm = [
    [
      {
        label: "真實姓名",
        name: "true_name",
        type: "text",
        ex: "派奇",
      },
    ],
    [
      {
        label: "手機",
        name: "mobile",
        type: "text",
        ex: "0912345678",
        rules: [
          {
            pattern: PHONE_EXPRESSION,
            message: "請輸入正確的手機號碼",
          },
        ],
      },
    ],
    [
      {
        label: "Email",
        name: "email",
        type: "text",
        ex: "abc@gmail.com",
      },
    ],
    [
      {
        label: "生日",
        name: "birthday",
        type: "text",
        ex: "1998-10-01",
        rules: [
          {
            pattern: BIRTHDAY_EXPRESSION,
            message: "請輸入正確的生日格式，例：YYYY-MM-DD",
          },
        ],
      },
    ],
  ];

  return (
    <>
      {basicForm.map((group) => {
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

export default OptionalInfo;
