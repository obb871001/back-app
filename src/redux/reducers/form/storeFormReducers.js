const StoreFormReducers = (state = {}, action) => {
  switch (action.type) {
    case "storeForm":
      return action.payload;
    case "clearForm":
      return (state = {});
    default:
      return state;
  }
};
export default StoreFormReducers;
