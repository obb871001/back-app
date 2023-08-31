const StoreHomePageReport = (state = {}, action) => {
  switch (action.type) {
    case "storeHomePageReport":
      return action.payload;
    default:
      return state;
  }
};
export default StoreHomePageReport;
