const StoreVipList = (state = [], action) => {
  switch (action.type) {
    case "storeVipList":
      return action.payload;
    default:
      return state;
  }
};
export default StoreVipList;
