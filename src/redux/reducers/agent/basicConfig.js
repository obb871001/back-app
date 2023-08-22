const BasicConfigReducers = (state = {}, action) => {
  switch (action.type) {
    case "storeBasicConfig":
      return action.payload;
    default:
      return state;
  }
};
export default BasicConfigReducers;
