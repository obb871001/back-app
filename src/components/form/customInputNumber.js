import { InputNumber } from "antd";

const CustomInputNumber = ({ ...props }) => {
  return (
    <InputNumber
      {...props}
      min={0}
      placeholder={props.allowEmpty && `留空為不限制`}
    />
  );
};

export default CustomInputNumber;
