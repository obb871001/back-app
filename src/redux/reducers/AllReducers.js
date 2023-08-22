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
});

export default AllReducers;
