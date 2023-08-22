import { storeAgentInfo } from "../redux/action/agent/action";
import {
  globalEndLoading,
  globalStartLoading,
} from "../redux/action/common/action";
import { storeGame } from "../redux/action/game/action";
import { agentInfo } from "./methods/getApi";

export const InitializeApi = (dispatch) => async () => {
  try {
    dispatch(globalStartLoading());
    const [agentInfoData] = await Promise.all([agentInfo()]);
    if (agentInfoData) {
      dispatch(storeAgentInfo(agentInfoData));
    }
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(globalEndLoading());
  }
};
