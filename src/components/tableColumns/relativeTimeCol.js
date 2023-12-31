import React, { useEffect } from "react";
import dayjs from "dayjs";

const RelativeTimeCol = ({ timeStr, now, unix }) => {
  if (!timeStr || timeStr === "-") return "-";

  const time = unix ? dayjs.unix(timeStr) : dayjs(timeStr);

  return (
    <p className="my-0">
      {time.format("YYYY-MM-DD (dddd) HH:mm:ss")}
      <span className="text-xs text-gray-500"> - {time.from(now)}</span>
    </p>
  );
};

export default RelativeTimeCol;
