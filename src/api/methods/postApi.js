import { agentApi, api, memberApi } from "./baseApi";

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

export const setFirstLoginName = ({ data } = {}) => {
  return agentApi.post("/first", {
    ...data,
  });
};

export const depositToPlayer = ({ vpoint, washCheck, uid, useBank }) => {
  return memberApi.post("/deposit", {
    vpoint: vpoint,
    washCheck: washCheck,
    uid: uid,
    useBank: useBank,
  });
};
export const withdrawToPlayer = ({ vpoint, uid, useBank }) => {
  return memberApi.post("/withdraw", {
    vpoint: vpoint,
    uid: uid,
    useBank: useBank,
  });
};

export const resetPlayerPassword = ({ uid, passwd }) => {
  return memberApi.post("/password", {
    uid: uid,
    passwd: passwd,
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