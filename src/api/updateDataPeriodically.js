import { notification } from "antd";
import { agentInfo } from "./methods/getApi";
import { storeAgentInfo } from "../redux/action/agent/action";

export const updateDataPeriodically = (dispatch) => async () => {
  try {
    //以上無需驗證oauth

    if (window.sessionStorage.getItem("token") !== null) {
      const [agentInfoData] = await Promise.all([agentInfo()]);

      if (agentInfoData) {
        dispatch(storeAgentInfo(agentInfoData));
      } else {
        window.sessionStorage.removeItem("token");
        notification({
          message: "登入逾時，請重新登入",
        });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    }
  } catch (error) {
    console.error(error);
  }
};
