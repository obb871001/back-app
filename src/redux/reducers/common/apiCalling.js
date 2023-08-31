const ApiCallingReducers = (state = false, action) => {
  switch (action.type) {
    case "apiCalling":
      return true;
    case "apiCalled":
      return false;
    default:
      return state;
  }
};
export default ApiCallingReducers;
