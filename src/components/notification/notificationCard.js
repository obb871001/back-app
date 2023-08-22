import { notification } from "antd";

const NotificationCard = () => {
  const [api, contextHolder] = notification.useNotification();

  return <div>{contextHolder}</div>;
};

export default NotificationCard;
