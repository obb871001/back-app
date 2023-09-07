const AgentNameListReducers = (state = [], action) => {
  switch (action.type) {
    case "storeAgentNameList":
      return action.payload;
    default:
      return state;
  }
};
export default AgentNameListReducers;
