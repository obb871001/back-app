import Cookies from "js-cookie";
import { storeBasicConfig } from "../redux/action/agent/action";
import { storeBetLimit, storeGame } from "../redux/action/game/action";

export const BasicApi = (dispatch) => async () => {
  try {
    dispatch(storeGame(window.getgamelist));
    localStorage.setItem("gameList", JSON.stringify(window.getgamelist));
    Cookies.set("currency", window.getbaseconfig.default_currency);
    dispatch(storeBetLimit(window.getbetlimit));
    dispatch(
      storeBasicConfig({
        ...window.getbaseconfig,
        currency: window.getcurrency,
        statusCode: window.statusCode || [],
        actionCode: window.actionCode || [],
      })
    );
    document.title = window.getbaseconfig?.web_name;
  } catch (error) {
    console.error(error);
  } finally {
  }
};
