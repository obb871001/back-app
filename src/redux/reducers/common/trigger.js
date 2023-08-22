const triggerReducers = (state = "", action) => {
  switch (action.type) {
    case "trigger":
      return !state;
    default:
      return state;
  }
};
export default triggerReducers;
