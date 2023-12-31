import axios from "axios";
import {
  agentApi,
  api,
  cagentTagApi,
  memberApi,
  promotionFormDataApi,
  vipApi,
} from "./baseApi";

export const actionSignIn = ({ account, passwd } = {}) => {
  return api.post("/login", {
    account: account,
    passwd: passwd,
  });
};

export const createAgent = ({ data } = {}) => {
  return agentApi.post("", {
    ...data,
  });
};

export const agentDeposit = ({ paramsData } = {}) => {
  return agentApi.post("/deposit", {
    ...paramsData,
  });
};
export const agentWithdraw = ({ paramsData } = {}) => {
  return agentApi.post("/withdraw", {
    ...paramsData,
  });
};

export const switchAgentStatus = ({ uid } = {}) => {
  return agentApi.post("/switch", {
    uid: uid,
  });
};

export const setFirstLoginName = ({ data } = {}) => {
  return agentApi.post("/first", {
    ...data,
  });
};

export const depositToPlayer = ({ paramsData } = {}) => {
  return memberApi.post("/deposit", {
    ...paramsData,
  });
};
export const withdrawToPlayer = ({ paramsData } = {}) => {
  return memberApi.post("/withdraw", {
    ...paramsData,
  });
};

export const resetPlayerPassword = ({ uid, passwd }) => {
  return memberApi.post("/password", {
    uid: uid,
    passwd: passwd,
  });
};

export const createPlayer = ({ postData } = {}) => {
  return memberApi.post("", {
    ...postData,
  });
};

export const updatePlayerConfig = ({ uid, email, mobile }) => {
  return memberApi.post("/", {
    uid: uid,
    email: email,
    mobile: mobile,
  });
};

export const updatePlayerBetLimit = ({ uid, bet_limit } = {}) => {
  return memberApi.post("/limit", {
    uid: uid,
    bet_limit: bet_limit,
  });
};

export const createTag = ({ paramsData } = {}) => {
  return cagentTagApi.post("", {
    ...paramsData,
  });
};

export const createPromotion = ({ formData } = {}) => {
  return promotionFormDataApi.post("", formData);
};

export const createVipLevel = ({ formData } = {}) => {
  return vipApi.post("", formData);
};
