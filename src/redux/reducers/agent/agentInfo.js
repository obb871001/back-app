const StoreAgentInfoReducers = (state = {}, action) => {
  switch (action.type) {
    case "storeAgentInfo":
      return action.payload;
    default:
      return state;
  }
};
export default StoreAgentInfoReducers;
