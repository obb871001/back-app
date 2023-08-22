import dayjs from "dayjs";

export const toTimeStamp = (date) => {
  return dayjs(date).unix();
};
