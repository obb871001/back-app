const CommonDetailReducers = (state = {}, action) => {
  switch (action.type) {
    case "storeDetail":
      return action.payload;
    case "clearDetail":
      return {};
    default:
      return state;
  }
};
export default CommonDetailReducers;
