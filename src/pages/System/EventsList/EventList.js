import CheckIn from "./checkIn";
import EventTabs from "./components/eventTabs";

import {
  CalendarOutlined,
  ContactsOutlined,
  TrademarkOutlined,
} from "@ant-design/icons";

const iconStyle = "text-[50px]";

const EVENT_LIST = [
  {
    label: "每日簽到",
    path: "checkin",
    icon: <CalendarOutlined className={iconStyle} />,
    component: <CheckIn />,
  },
  {
    label: "任務",
    path: "task",
    icon: <ContactsOutlined className={iconStyle} />,
  },
  {
    label: "輪盤",
    path: "roulette",
    icon: <TrademarkOutlined className={iconStyle} />,
  },
];

const EventList = () => {
  return (
    <>
      <EventTabs EVENT_LIST={EVENT_LIST} />
    </>
  );
};

export default EventList;
