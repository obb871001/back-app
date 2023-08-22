const PopTypeReducers = (state = "", action) => {
  switch (action.type) {
    case "setPopType":
      return action.payload;
    case "clearPopType":
      return "";
    default:
      return state;
  }
};
export default PopTypeReducers;
