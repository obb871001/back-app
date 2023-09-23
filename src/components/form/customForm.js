import {
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components";
import { AutoComplete } from "antd";
import { useTranslation } from "react-i18next";

const CustomForm = ({ type, ...props }) => {
  const { t } = useTranslation();
  const i18n = (key) => t(`ex.${key}`);
  const { selectProps = {}, autoCompleteProps } = props;
  const baseRules = props?.rules || [];
  const requiredRule = props?.required
    ? [
        {
          required: true,
          message: `${i18n("pleaseInput")}${props?.label}`,
        },
      ]
    : [];
  switch (type) {
    case "text":
      return (
        <ProFormText
          {...props}
          placeholder={
            props.allowEmpty
              ? i18n("allowEmpty")
              : props.ex
              ? `${i18n("ex")}${props.ex}`
              : props.placeholder
          }
          rules={[...baseRules, ...requiredRule]}
        />
      );
    case "number":
      return (
        <ProFormDigit
          {...props}
          width={200}
          placeholder={
            props.allowEmpty
              ? i18n("allowEmpty")
              : props.ex
              ? `${i18n("ex")}${props.ex}`
              : props.placeholder
          }
          rules={[...baseRules, ...requiredRule]}
        />
      );
    case "date":
      return (
        <ProFormDateRangePicker
          tooltip={
            props.name === "std"
              ? i18n("timeStart")
              : props.name === "etd"
              ? i18n("timeEnd")
              : false
          }
          {...props}
          rules={[...baseRules, ...requiredRule]}
        />
      );
    case "switch":
      return <ProFormSwitch {...props} />;
    case "select":
      return <ProFormSelect {...selectProps} {...props} />;
    case "radio":
      return <ProFormRadio.Group {...props} />;
    case "autoComplete":
      return (
        <ProFormSelect
          showSearch
          width={200}
          {...autoCompleteProps}
          {...props}
        />
      );
    case "textarea":
      return <ProFormTextArea {...props} />;
    case "password":
      return (
        <ProFormText.Password
          rules={[...baseRules, ...requiredRule]}
          {...props}
        />
      );
    default:
      return (
        <ProFormText
          {...props}
          placeholder={
            props.allowEmpty
              ? i18n("allowEmpty")
              : props.ex
              ? `${i18n("ex")}${props.ex}`
              : props.placeholder
          }
          rules={[...baseRules, ...requiredRule]}
        />
      );
  }
};

export default CustomForm;
