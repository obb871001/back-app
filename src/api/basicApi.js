import { storeBasicConfig } from "../redux/action/agent/action";
import { storeBetLimit, storeGame } from "../redux/action/game/action";

export const BasicApi = (dispatch) => async () => {
  try {
    dispatch(storeGame(window.getgamelist));
    localStorage.setItem("gameList", JSON.stringify(window.getgamelist));
    dispatch(storeBetLimit(window.getbetlimit));
    dispatch(storeBasicConfig(window.getbaseconfig));
    document.title = window.getbaseconfig?.web_name;
  } catch (error) {
    console.error(error);
  } finally {
  }
};
