import { useEffect } from "react";
import { useNavigate } from "react-router";

import { GodMod } from "./GodMod";

const Permission = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("token") && !GodMod) {
      navigate("/signin");
    }
  }, []);
  return <div>{children}</div>;
};

export default Permission;
