import { useMemo } from "react";
import { formatNumber } from "../../utils/formatNumber";
import { useSelector } from "react-redux";

const NumberColumns = ({ number, notStyle }) => {
  const CURRENCY = useSelector((state) => state.CURRENCY);

  const style = useMemo(() => {
    return Number(number) >= 0;
  }, [number]);
  return (
    <p
      className={`my-0 font-semibold ${
        style ? "text-green-700" : "text-red-700"
      } ${notStyle || Number(number) === 0 ? "!text-black" : ""}`}
    >
      {CURRENCY}
      {formatNumber(number)}
    </p>
  );
};

export default NumberColumns;
