import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

const weekday = require("dayjs/plugin/weekday");
dayjs.extend(weekday);
dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault("Asia/Manila");

export const dateFormat = "YYYY-MM-DD";

export const getWeek = (weekStart, weekEnd) => {
  const start = dayjs().weekday(weekStart).format("YYYY-MM-DD");
  const end = dayjs().weekday(weekEnd).format("YYYY-MM-DD");
  return { start, end };
};
export const getMonth = (month) => {
  const start = dayjs()
    .subtract(month, "month")
    .startOf("month")
    .format("YYYY-MM-DD");
  const end = dayjs()
    .subtract(month, "month")
    .endOf("month")
    .format("YYYY-MM-DD");
  return { start, end };
};
export const getToday = () => {
  const today = dayjs().format("YYYY-MM-DD");
  return today;
};
export const getTomorrow = () => {
  const tommorow = dayjs().add(1, "day").format("YYYY-MM-DD");
  return tommorow;
};
export const getYesterday = () => {
  const yesterday = dayjs().add(-1, "day").format("YYYY-MM-DD");
  return yesterday;
};
