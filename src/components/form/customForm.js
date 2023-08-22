import {
  ProFormDatePicker,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components";

const CustomForm = ({ type, ...props }) => {
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
        <ProFormDatePicker
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
      return <ProFormSelect {...props} />;
    case "radio":
      return <ProFormRadio.Group {...props} />;
    case "textarea":
      return <ProFormTextArea {...props} />;
    case "password":
      return <ProFormText.Password {...props} />;
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
