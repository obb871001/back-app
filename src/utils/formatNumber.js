const numeral = require("numeral");

export const formatNumber = (NUMBER) => {
  return numeral(NUMBER).format("0,0.00");
};
