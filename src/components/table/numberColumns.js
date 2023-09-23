import { useMemo } from "react";
import { formatNumber } from "../../utils/formatNumber";
import { useSelector } from "react-redux";

const NumberColumns = ({ number, notStyle, revert }) => {
  const CURRENCY = useSelector((state) => state?.CURRENCY);
  let numericValue = parseFloat(number);
  if (revert) {
    numericValue = -numericValue;
  }

  const style = useMemo(() => {
    return numericValue >= 0;
  }, [numericValue]);
  return (
    <p
      className={`my-0 font-semibold ${
        style ? "text-green-700" : "text-red-700"
      } ${notStyle || numericValue === 0 ? "!text-black" : ""}`}
    >
      {CURRENCY}
      {formatNumber(numericValue)}
    </p>
  );
};

export default NumberColumns;
