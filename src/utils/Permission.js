import { useEffect } from "react";
import { useNavigate } from "react-router";

import { GodMod } from "./GodMod";
import Cookies from "js-cookie";

const Permission = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!Cookies.get("token") && !GodMod) {
      navigate("/signin");
    }
  }, []);
  return <div>{children}</div>;
};

export default Permission;
