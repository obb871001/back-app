import { notification } from "antd";
import { agentInfo, getHomeReports } from "./methods/getApi";
import { storeAgentInfo } from "../redux/action/agent/action";
import { storeHomePageReport } from "../redux/action/reports/action";

export const updateDataPeriodically = (dispatch, navigate) => async () => {
  try {
    //以上無需驗證oauth

    if (window.sessionStorage.getItem("token") !== null) {
      const [agentInfoData, homeReport] = await Promise.all([
        agentInfo(),
        getHomeReports(),
      ]);
      if (agentInfoData) dispatch(storeAgentInfo(agentInfoData));
      if (homeReport) dispatch(storeHomePageReport(homeReport));
    }
  } catch (error) {
    console.error(error);
    window.sessionStorage.removeItem("token");
    notification.error({
      message: "登入逾時，請重新登入",
    });
    setTimeout(() => {
      navigate("/signin");
    }, 1500);
  }
};
