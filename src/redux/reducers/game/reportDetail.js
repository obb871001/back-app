const ReportDetailReducers = (state = {}, action) => {
  switch (action.type) {
    case "storeReportDetail":
      return action.payload;
    default:
      return state;
  }
};
export default ReportDetailReducers;
