import { useState, useEffect } from "react";

const isMobileUserAgent = () => {
  const userAgent =
    typeof window.navigator === "undefined" ? "" : navigator.userAgent;
  return (
    /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent
    ) && !/iPad|Tablet/i.test(userAgent)
  );
};

const isTabletUserAgent = () => {
  const userAgent =
    typeof window.navigator === "undefined" ? "" : navigator.userAgent;
  return /iPad|Tablet/i.test(userAgent);
};

const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState("");

  useEffect(() => {
    if (isTabletUserAgent()) {
      setDeviceType("PC");
    } else if (isMobileUserAgent()) {
      setDeviceType("Mobile");
    } else {
      setDeviceType("PC");
    }
  }, []);

  return deviceType;
};

export default useDeviceType;
