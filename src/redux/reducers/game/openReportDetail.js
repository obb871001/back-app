const ReportDetailPopReducers = (state = false, action) => {
  switch (action.type) {
    case "openReportDetail":
      return true;
    case "closeReportDetail":
      return false;
    default:
      return state;
  }
};
export default ReportDetailPopReducers;
