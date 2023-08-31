const PageTotalRecordsReducers = (
  state = {
    current_page: 1,
    last_page: 1,
    per_page: 30,
    total_records: 0,
  },
  action
) => {
  switch (action.type) {
    case "storeTotalRecords":
      return action.payload;
    case "clearTotalRecords":
      return {
        current_page: 1,
        last_page: 1,
        per_page: 30,
        total_records: 0,
      };
    default:
      return state;
  }
};
export default PageTotalRecordsReducers;
