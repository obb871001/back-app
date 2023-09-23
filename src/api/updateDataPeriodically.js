import { notification } from "antd";
import { agentInfo, getHomeReports } from "./methods/getApi";
import { storeAgentInfo } from "../redux/action/agent/action";
import { storeHomePageReport } from "../redux/action/reports/action";
import Cookies from "js-cookie";
import i18next from "i18next";

export const updateDataPeriodically = (dispatch, navigate) => async () => {
  try {
    //以上無需驗證oauth

    if (Cookies.get("token") !== null) {
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
      message: i18next.t("layout.menu.loginExpired"),
    });
    setTimeout(() => {
      navigate("/signin");
    }, 1500);
  }
};
