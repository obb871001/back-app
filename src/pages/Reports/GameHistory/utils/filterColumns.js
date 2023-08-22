import PaiGowColumns from "../columns/PaiGow_col";

export const FilterColumns = (GAMEID) => {
  switch (GAMEID) {
    case "PAIGOW":
      return PaiGowColumns();
    default:
      return PaiGowColumns();
  }
};
