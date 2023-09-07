import { combineReducers } from "redux";
import StoreFormReducers from "./form/storeFormReducers";
import StoreGameReducers from "./game/gameReducers";
import StoreDetail from "./member/detail";
import StoreBetLimitReducers from "./game/betLimit";
import StoreAgentInfoReducers from "./agent/agentInfo";
import BasicConfigReducers from "./agent/basicConfig";
import CommonDetailReducers from "./common/commonDetail";
import PopTypeReducers from "./common/popType";
import triggerReducers from "./common/trigger";
import GlobalLoadingReducers from "./common/globalLoading";
import PageTotalRecordsReducers from "./common/tableTotalRecords";
import ApiCallingReducers from "./common/apiCalling";
import StoreHomePageReport from "./reports/homepageReports";
import ReportDetailReducers from "./game/reportDetail";
import ReportDetailPopReducers from "./game/openReportDetail";
import NowTimeReducers from "./common/nowTime";
import CurrencyReducers from "./common/currency";
import AgentNameListReducers from "./agent/agentNameList";

const AllReducers = combineReducers({
  formReducers: StoreFormReducers,
  gameList: StoreGameReducers,
  commonDetail: StoreDetail,
  betLimitDetail: StoreBetLimitReducers,
  agentInfo: StoreAgentInfoReducers,
  basicConfig: BasicConfigReducers,
  commonDetail: CommonDetailReducers,
  popType: PopTypeReducers,
  trigger: triggerReducers,
  globalLoading: GlobalLoadingReducers,
  totalDataRecords: PageTotalRecordsReducers,
  apiCalling: ApiCallingReducers,
  homepageReports: StoreHomePageReport,
  reportDetail: ReportDetailReducers,
  reportDetailPop: ReportDetailPopReducers,
  nowTime: NowTimeReducers,
  CURRENCY: CurrencyReducers,
  agentNameList: AgentNameListReducers,
});

export default AllReducers;
