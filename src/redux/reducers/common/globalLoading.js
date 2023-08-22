const GlobalLoadingReducers = (state = false, action) => {
  switch (action.type) {
    case "globalStartLoading":
      return true;
    case "globalEndLoading":
      return false;
    default:
      return state;
  }
};
export default GlobalLoadingReducers;
