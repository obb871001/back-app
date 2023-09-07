import Cookies from "js-cookie";
import { fakeCurrency } from "../../../constant";

const currencyList = window.getcurrency || fakeCurrency;

const CurrencyReducers = (
  state = currencyList.find((item) => item.iso_code === Cookies.get("currency"))
    ?.symbol || "$",
  action
) => {
  switch (action.type) {
    case "setCurrency":
      return action.payload;
    default:
      return state;
  }
};
export default CurrencyReducers;
