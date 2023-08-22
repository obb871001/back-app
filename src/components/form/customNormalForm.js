import { DatePicker, Input, InputNumber, Radio, Select, Switch } from "antd";

const CustomNormalForm = ({ type, ...props }) => {
  switch (type) {
    case "text":
      return (
        <Input {...props} placeholder={props.allowEmpty && "留空為不限制"} />
      );
    case "number":
      return (
        <InputNumber
          {...props}
          placeholder={props.allowEmpty && "留空為不限制"}
        />
      );
    case "date":
      return <DatePicker {...props} />;
    case "switch":
      return <Switch {...props} />;
    case "select":
      return <Select {...props} />;
    case "radio":
      return <Radio {...props} />;
    default:
      return (
        <Input {...props} placeholder={props.allowEmpty && "留空為不限制"} />
      );
  }
};

export default CustomNormalForm;
