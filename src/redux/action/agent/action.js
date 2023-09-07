export const storeAgentInfo = (info) => {
  return {
    type: "storeAgentInfo",
    payload: info,
  };
};
export const storeBasicConfig = (info) => {
  return {
    type: "storeBasicConfig",
    payload: info,
  };
};
export const storeAgentNameList = (list) => {
  return {
    type: "storeAgentNameList",
    payload: list,
  };
};
