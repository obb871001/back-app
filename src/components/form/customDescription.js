import { Descriptions } from "antd";
import "./formStyles.css";
import CommonTooltip from "../hint/commonTooltip";

const CustomDescription = ({ label, className, children }) => {
  return (
    <Descriptions.Item label={label} className={className}>
      {children}
    </Descriptions.Item>
  );
};

export default CustomDescription;
