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
export const storeTotalRecords = (paginationData) => {
  return {
    type: "storeTotalRecords",
    payload: paginationData,
  };
};
export const clearTotalRecords = () => {
  return {
    type: "clearTotalRecords",
  };
};
export const apiCalling = () => {
  return {
    type: "apiCalling",
  };
};

export const apiCalled = () => {
  return {
    type: "apiCalled",
  };
};

export const storeNowTime = (time) => {
  return {
    type: "storeNowTime",
    payload: time,
  };
};
export const setCurrency = (currency) => {
  return {
    type: "setCurrency",
    payload: currency,
  };
};
