export const storeHomePageReport = (data) => {
  return {
    type: "storeHomePageReport",
    payload: data,
  };
};
export const openReportDetail = () => {
  return {
    type: "openReportDetail",
  };
};
export const closeReportDetail = () => {
  return {
    type: "closeReportDetail",
  };
};
