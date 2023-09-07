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
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const CreatePlayerForm = () => {
  const { t } = useTranslation();
  const i18n = (key) => t(`page.admin.playersearch.modal.${key}`);
  const i18n_express = (key) => t(`expressHint.${key}`);

  const agentNameList = useSelector((state) => state.agentNameList);

  const requiredForm = [
    [
      {
        label: i18n("playerAccount"),
        name: "memId",
        type: "text",
        required: true,
      },
    ],
    [
      {
        label: i18n("playerAgent"),
        name: "cagent",
        type: "autoComplete",
        required: true,
        options: agentNameList?.map((item) => {
          return { value: item };
        }),
      },
    ],
  ];

  const optionalForm = [
    [
      {
        label: i18n("truename"),
        name: "true_name",
        type: "text",
      },
    ],
    [
      {
        label: i18n("mobile"),
        name: "mobile",
        type: "text",
        rules: [
          { pattern: PHONE_EXPRESSION, message: i18n_express("mobileHint") },
        ],
      },
    ],
    [
      {
        label: i18n("email"),
        name: "email",
        type: "text",
      },
    ],
    [
      {
        label: i18n("birthday"),
        name: "birthday",
        type: "text",
        rules: [
          {
            pattern: BIRTHDAY_EXPRESSION,
            message: i18n_express("birthdayHint"),
          },
        ],
        ex: "1998-10-01",
      },
    ],
  ];
  return (
    <>
      <Alert message={`${i18n("passwordHint")}123456`} type="info" showIcon />
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
