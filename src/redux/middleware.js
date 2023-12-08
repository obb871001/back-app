import Cookies from "js-cookie";
import i18next from "i18next";
import { globalEndLoading, globalStartLoading } from "./action/common/action";
import {
  agentInfo,
  getAgentNameList,
  getHomeReports,
  getVipList,
} from "../api/methods/getApi";
import { storeAgentInfo, storeAgentNameList } from "./action/agent/action";
import { storeHomePageReport } from "./action/reports/action";
import { notification } from "antd";
import { storeVipList } from "./action/member/action";

export const apiErrorMessage = (store) => (next) => (action) => {
  if (action.type === "API_ERROR" && action.error) {
    const errorMessage = action.error.response.data.message;
    const errorParams = action.error.response.data.errData;
    notification.error({
      message: i18next.t(`backend_response.${errorMessage}`, errorParams),
    });
  }
  return next(action);
};

export const userLogout = (store) => (next) => (action) => {
  next(action);
  if (action.type === "USER_LOGOUT") {
    const { dispatch } = store;
    sessionStorage.removeItem("token");
    Cookies.remove("token");
    setTimeout(() => {
      window.location.href = "/signin";
    }, 1500);
  }
};

export const initializeApi = (store) => (next) => (action) => {
  next(action);
  if (action.type === "INITIALIZE_API") {
    const { dispatch } = store;
    const { navigate } = action;

    const initializeData = async () => {
      try {
        dispatch(globalStartLoading());
        if (Cookies.get("token") !== undefined) {
          const [agentInfoData, agentNameListData, vipListData] =
            await Promise.all([agentInfo(), getAgentNameList(), getVipList()]);
          if (agentInfoData) {
            dispatch(storeAgentInfo(agentInfoData));
          }
          if (agentNameListData) {
            dispatch(storeAgentNameList(agentNameListData));
          }
          dispatch(storeVipList(vipListData?.vipinfo));
        }
      } catch (error) {
      } finally {
        setTimeout(() => {
          dispatch(globalEndLoading());
        }, 1000);
      }
    };

    initializeData();
  }
};

export const periodicDataUpdater = (store) => (next) => (action) => {
  next(action);
  if (action.type === "UPDATE_DATA_PERIODICALLY") {
    const { dispatch } = store;
    const { navigate } = action;

    const updaterData = async () => {
      try {
        //以上無需驗證oauth

        if (Cookies.get("token") !== undefined) {
          const [agentInfoData, homeReport] = await Promise.all([
            agentInfo(),
            getHomeReports(),
          ]);
          if (agentInfoData) dispatch(storeAgentInfo(agentInfoData));
          if (homeReport) dispatch(storeHomePageReport(homeReport));
        }
      } catch (error) {}
    };
    updaterData();
  }
};
