import { ProFormGroup, ProFormText } from "@ant-design/pro-components";
import React from "react";
import CustomForm from "../../../../components/form/customForm";
import { BIRTHDAY_EXPRESSION, PHONE_EXPRESSION } from "../../../../regex";
import { useTranslation } from "react-i18next";

const OptionalInfo = () => {
  const { t } = useTranslation();
  const i18n = (key) => t(`page.agentinfomation.agentlist.modal.${key}`);
  const i18n_expressHint = (key) => t(`expressHint.${key}`);

  const basicForm = [
    [
      {
        label: i18n("truename"),
        name: "true_name",
        type: "text",
        ex: "派奇",
      },
    ],
    [
      {
        label: i18n("mobile"),
        name: "mobile",
        type: "text",
        ex: "0912345678",
        rules: [
          {
            pattern: PHONE_EXPRESSION,
            message: i18n_expressHint("mobileHint"),
          },
        ],
      },
    ],
    [
      {
        label: i18n("email"),
        name: "email",
        type: "text",
        ex: "abc@gmail.com",
      },
    ],
    [
      {
        label: i18n("birthday"),
        name: "birthday",
        type: "text",
        ex: "1998-10-01",
        rules: [
          {
            pattern: BIRTHDAY_EXPRESSION,
            message: i18n_expressHint("birthdayHint"),
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
