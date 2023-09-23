import {
  QuestionCircleFilled,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Tooltip, Typography } from "antd";

const QuestionHint = ({ title, iconClassName }) => {
  return (
    <Tooltip title={title}>
      <Typography.Text className={iconClassName} type="warning">
        <QuestionCircleFilled />
      </Typography.Text>
    </Tooltip>
  );
};

export default QuestionHint;
