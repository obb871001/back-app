import { notification } from "antd";
import {
  storeAgentInfo,
  storeAgentNameList,
} from "../redux/action/agent/action";
import {
  globalEndLoading,
  globalStartLoading,
} from "../redux/action/common/action";
import { storeGame } from "../redux/action/game/action";
import { agentInfo, getAgentNameList } from "./methods/getApi";
import i18next from "i18next";

export const InitializeApi = (dispatch, navigate) => async () => {
  try {
    dispatch(globalStartLoading());
    const [agentInfoData, agentNameListData] = await Promise.all([
      agentInfo(),
      getAgentNameList(),
    ]);
    if (agentInfoData) {
      dispatch(storeAgentInfo(agentInfoData));
    }
    if (agentNameListData) {
      dispatch(storeAgentNameList(agentNameListData));
    }
  } catch (error) {
    console.error(error);
    window.sessionStorage.removeItem("token");
    notification.error({
      message: i18next.t("layout.menu.loginExpired"),
    });
    if (navigate) {
      setTimeout(() => {
        navigate("/signin");
      }, 1500);
    }
  } finally {
    setTimeout(() => {
      dispatch(globalEndLoading());
    }, 1000);
  }
};
