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

const CustomForm = ({ type, ...props }) => {
  const { selectProps = {} } = props;
  const baseRules = props?.rules || [];
  const requiredRule = props?.required
    ? [
        {
          required: true,
          message: `請輸入${props?.label}`,
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
              ? "留空為不限制"
              : props.ex
              ? `例：${props.ex}`
              : props.placeholder
          }
          rules={[...baseRules, ...requiredRule]}
        />
      );
    case "number":
      return (
        <ProFormDigit
          {...props}
          placeholder={
            props.allowEmpty
              ? "留空為不限制"
              : props.ex
              ? `例：${props.ex}`
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
              ? "開始為00:00:00"
              : props.name === "etd"
              ? "結束為23:59:59"
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
      return <ProFormSelect showSearch width={200} {...props} />;
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
              ? "留空為不限制"
              : props.ex
              ? `例：${props.ex}`
              : props.placeholder
          }
          rules={[...baseRules, ...requiredRule]}
        />
      );
  }
};

export default CustomForm;
