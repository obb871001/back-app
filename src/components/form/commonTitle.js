import { Typography } from "antd";

const CommonTitle = ({ title, className }) => {
  return (
    <Typography.Title className={className} level={4} italic>
      {title}
    </Typography.Title>
  );
};

export default CommonTitle;
