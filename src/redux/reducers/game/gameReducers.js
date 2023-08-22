const StoreGameReducers = (state = {}, action) => {
  switch (action.type) {
    case "storeGame":
      return action.payload;
    default:
      return state;
  }
};
export default StoreGameReducers;
