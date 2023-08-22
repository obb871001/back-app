const StoreBetLimitReducers = (state = {}, action) => {
  switch (action.type) {
    case "storeBetLimit":
      return action.payload;
    default:
      return state;
  }
};
export default StoreBetLimitReducers;
