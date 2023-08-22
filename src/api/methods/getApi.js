import { COMMON_PAGE } from "../../constant";
import { agentApi, api, memberApi, reportApi } from "./baseApi";

export const getMemberList = ({ sort, order, searchData } = {}) => {
  return memberApi.get("", {
    params: {
      sort: sort,
      order: order,
      limit: COMMON_PAGE,
      ...searchData, //搜尋條件
    },
  });
};

export const getAgentList = () => {
  return agentApi.get("");
};

export const getChildList = () => {
  return agentApi.get("/child");
};

export const agentInfo = ({ agentUid } = {}) => {
  return agentApi.get("/info", {
    params: {
      uid: agentUid,
    },
  });
};

export const getAgentLog = ({ paramsData } = {}) => {
  return agentApi.get("/log", {
    params: {
      ...paramsData,
    },
  });
};

export const getWinLoseReports = ({ std, etd } = {}) => {
  return reportApi.get("/dataland", {
    params: { std: std, etd: etd, limit: COMMON_PAGE },
  });
};

export const getAgentReport = ({ std, etd } = {}) => {
  return reportApi.get("/dataland/cagent", {
    params: { std: std, etd: etd, limit: COMMON_PAGE },
  });
};

export const getPlayerFromAgentReport = ({ std, etd } = {}) => {
  return reportApi.get("/dataland/direct", {
    params: { std: std, etd: etd, limit: COMMON_PAGE },
  });
};
