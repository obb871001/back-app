const HasSearchedReducers = (state = false, action) => {
  switch (action.type) {
    case "hasSearched":
      return (state = true);
    case "initHasSearched":
      return (state = false);
    default:
      return state;
  }
};
export default HasSearchedReducers;
