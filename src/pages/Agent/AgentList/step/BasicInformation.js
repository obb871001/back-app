import {
  ProFormGroup,
  ProFormRadio,
  ProFormSwitch,
  ProFormText,
} from "@ant-design/pro-components";
import { Divider, Space } from "antd";
import React from "react";
import CustomForm from "../../../../components/form/customForm";
import { PASSWORD_EXPRESSION, USERNAME_EXPRESSION } from "../../../../regex";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import FilterLevelName from "../../../../utils/filterLevelName";

const BasicInformation = ({ form, type }) => {
  const { t } = useTranslation();
  const i18n = (key) => t(`page.agentinfomation.agentlist.modal.${key}`);
  const i18n_switch = (key) => t(`switch.${key}`);
  const i18n_statusCode = (key) => t(`status_code.${key}`);
  const i18n_expressHint = (key) => t(`expressHint.${key}`);

  const popType = useSelector((state) => state.popType);
  const basicConfig = useSelector((state) => state.basicConfig);
  const agentInfo = useSelector((state) => state.agentInfo);
  const { statusCode = [] } = basicConfig;

  const basicInfoForm = [
    [
      {
        name: "lastAgent",
        label: i18n("agentLine"),
        type: "text",
        readonly: true,
      },
      {
        label: i18n("type"),
        type: "text",
        readonly: true,
        value: FilterLevelName(type, agentInfo.level + 1),
      },
    ],
    [
      {
        name: "cagent",
        label: type === "child" ? i18n("child") : i18n("agentAccount"),
        type: "text",
        required: true,
        disabled: popType === "edit",
        ex: "agent01",
        rules: [
          {
            pattern: USERNAME_EXPRESSION,
            message: i18n_expressHint("accountHint"),
          },
        ],
      },
      {
        name: "nick_name",
        label: i18n("nickname"),
        type: "text",
        tooltip: i18n_expressHint("nicknameHint"),
        required: true,
        ex: "豐哥",
      },
    ],
    [
      {
        name: "passwd",
        label: i18n("password"),
        type: "password",
        required: true,
        disabled: popType === "edit",
        value: popType === "edit" ? "********" : "",
        rules: [
          {
            pattern: PASSWORD_EXPRESSION,
            message: i18n_expressHint("passwordHint"),
          },
        ],
      },
    ],
  ];

  return (
    <>
      {basicInfoForm.map((group) => {
        return (
          <ProFormGroup>
            {group.map((item) => {
              return <CustomForm {...item} />;
            })}
          </ProFormGroup>
        );
      })}
      <ProFormRadio.Group
        name="status"
        layout="vertical"
        label={i18n("accountStatus")}
        rules={[
          {
            required: true,
            message: i18n_expressHint("accountStatusHint"),
          },
        ]}
        options={statusCode.map((code) => {
          return {
            label: `${i18n_statusCode(`${code}`)}${i18n_statusCode(
              `${code}hint`
            )}`,
            value: code,
          };
        })}
      />
    </>
  );
};

export default BasicInformation;
