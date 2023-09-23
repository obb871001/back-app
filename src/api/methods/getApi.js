import { COMMON_PAGE } from "../../constant";
import { agentApi, api, cagentTagApi, memberApi, reportApi } from "./baseApi";

//README 找api請搜尋以下TAG(需全大寫)
//MEMBER 會員 , AGENT 代理 , REPORT 報表

//MEMBER//
//MEMBER//
//MEMBER//

export const getActivePlayer = ({ paramsData } = {}) => {
  return memberApi.get("/active", {
    params: {
      ...paramsData, //搜尋條件
    },
  });
};

export const getMemberList = ({ sort, order, paramsData } = {}) => {
  return memberApi.get("", {
    params: {
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

export const getMemberWalletLog = ({ paramsData } = {}) => {
  return reportApi.get("/memberWalletLog", {
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
export const getAgentNameList = () => {
  //獲得代理名單（用於下拉選單）
  return agentApi.get("/nameList");
};

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

export const getWinLoseReports = ({ paramsData } = {}) => {
  return reportApi.get("/dataLand", {
    params: { ...paramsData },
  });
};

export const getHomeReports = ({} = {}) => {
  return reportApi.get("/homePage");
};

export const getAgentReport = ({ paramsData } = {}) => {
  return reportApi.get("/dataLand/cagent", {
    params: { ...paramsData },
  });
};

export const getPlayerFromAgentReport = ({ paramsData } = {}) => {
  return reportApi.get("/dataLand/direct", {
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

//功能標籤//
export const getFunctionTag = ({ paramsData }) => {
  return cagentTagApi.get("", {
    params: { ...paramsData },
  });
};
