import {
  ProFormGroup,
  ProFormSwitch,
  ProFormText,
} from "@ant-design/pro-components";
import { Divider } from "antd";
import React from "react";
import CustomForm from "../../../../components/form/customForm";
import { PASSWORD_EXPRESSION, USERNAME_EXPRESSION } from "../../../../regex";
import { useSelector } from "react-redux";

const BasicInformation = ({ form, type }) => {
  const popType = useSelector((state) => state.popType);
  const basicInfoForm = [
    [
      {
        name: "lastAgent",
        label: "上層代理",
        type: "text",
        readonly: true,
      },
      {
        name: "type",
        label: "類型",
        type: "text",
        readonly: true,
        value: type === "child" ? "子帳號" : "代理商",
      },
    ],
    [
      {
        name: "cagent",
        label: type === "child" ? "子帳號" : "代理帳號",
        type: "text",
        required: true,
        disabled: popType === "edit",
        ex: "agent01",
        rules: [
          {
            pattern: USERNAME_EXPRESSION,
            message:
              "開頭必須以英文字母开头，后续字符可以是英文字母、数字或下划线",
          },
        ],
      },
      {
        name: "nick_name",
        label: "暱稱",
        type: "text",
        tooltip: "設定辨識名稱",
        required: true,
        ex: "豐哥",
      },
    ],
    [
      {
        name: "passwd",
        label: "密碼",
        type: "password",
        required: true,
        disabled: popType === "edit",
        value: popType === "edit" ? "********" : "",
        rules: [
          {
            pattern: PASSWORD_EXPRESSION,
            message: "不可包含特殊符號，例：@#$%^&*(",
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
      <ProFormSwitch
        name="status"
        label="帳號狀態"
        tooltip="開啟時代理可登入後台"
        checkedChildren="啟用"
        unCheckedChildren="停用"
        checked={form.getFieldValue("status") == 1}
      />
    </>
  );
};

export default BasicInformation;
