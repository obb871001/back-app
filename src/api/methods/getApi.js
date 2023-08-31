import { COMMON_PAGE } from "../../constant";
import { agentApi, api, memberApi, reportApi } from "./baseApi";

//README 找api請搜尋以下TAG(需全大寫)
//MEMBER 會員 , AGENT 代理 , REPORT 報表

//MEMBER//
//MEMBER//
//MEMBER//

export const getMemberList = ({ sort, order, paramsData } = {}) => {
  return memberApi.get("", {
    params: {
      sort: sort,
      order: order,
      limit: COMMON_PAGE,
      ...paramsData, //搜尋條件
    },
  });
};

export const getMemberLog = ({ paramsData } = {}) => {
  return memberApi.get("/log", {
    params: {
      ...paramsData,
    },
  });
};

//MEMBER//
//MEMBER//
//MEMBER//

//AGENT//
//AGENT//
//AGENT//
export const getAgentList = ({ paramsData } = {}) => {
  return agentApi.get("", {
    params: {
      ...paramsData,
    },
  });
};

export const getChildList = ({ paramsData } = {}) => {
  return agentApi.get("/child", {
    params: {
      ...paramsData,
    },
  });
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
//AGENT//
//AGENT//
//AGENT//

//REPORT//
//REPORT//
//REPORT//

export const getWinLoseReports = ({ std, etd } = {}) => {
  return reportApi.get("/dataland", {
    params: { std: std, etd: etd, limit: COMMON_PAGE },
  });
};

export const getHomeReports = ({} = {}) => {
  return reportApi.get("/homePage");
};

export const getAgentReport = ({ paramsData } = {}) => {
  return reportApi.get("/dataland/cagent", {
    params: { ...paramsData },
  });
};

export const getPlayerFromAgentReport = ({ paramsData } = {}) => {
  return reportApi.get("/dataland/direct", {
    params: { ...paramsData },
  });
};

export const betLogReport = ({ paramsData } = {}) => {
  return reportApi.get("/betLog", {
    params: { ...paramsData },
  });
};
//REPORT//
//REPORT//
//REPORT//
