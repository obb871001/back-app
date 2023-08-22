const StoreDetail = (state = {}, action) => {
  switch (action.type) {
    case "storeDetail":
      return action.payload;
    default:
      return state;
  }
};
export default StoreDetail;
