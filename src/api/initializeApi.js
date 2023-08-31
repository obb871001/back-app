import { notification } from "antd";
import { storeAgentInfo } from "../redux/action/agent/action";
import {
  globalEndLoading,
  globalStartLoading,
} from "../redux/action/common/action";
import { storeGame } from "../redux/action/game/action";
import { agentInfo } from "./methods/getApi";

export const InitializeApi = (dispatch, navigate) => async () => {
  try {
    dispatch(globalStartLoading());
    const [agentInfoData] = await Promise.all([agentInfo()]);
    if (agentInfoData) {
      dispatch(storeAgentInfo(agentInfoData));
    }
  } catch (error) {
    console.error(error);
    window.sessionStorage.removeItem("token");
    notification.error({
      message: "登入逾時，請重新登入",
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
