import dayjs from "dayjs";

const NowTimeReducers = (
  state = dayjs().format("YYYY-MM-DD (dddd) HH:mm:ss"),
  action
) => {
  switch (action.type) {
    case "storeNowTime":
      return action.payload;
    case "clearNowTime":
      return dayjs().format("YYYY-MM-DD (dddd) HH:mm:ss");
    default:
      return state;
  }
};
export default NowTimeReducers;
