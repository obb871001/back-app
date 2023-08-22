export const storeDetail = (data) => {
  return {
    type: "storeDetail",
    payload: data,
  };
};

export const clearDetail = () => {
  return {
    type: "clearDetail",
  };
};

export const setPopType = (type) => {
  return {
    type: "setPopType",
    payload: type,
  };
};
export const clearPopType = () => {
  return {
    type: "clearPopType",
  };
};
export const trigger = () => {
  return {
    type: "trigger",
  };
};
export const globalStartLoading = () => {
  return {
    type: "globalStartLoading",
  };
};
export const globalEndLoading = () => {
  return {
    type: "globalEndLoading",
  };
};
