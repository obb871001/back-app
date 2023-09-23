import React from "react";
import { allowClick } from "../../assets/style/styleConfig";
import { useLocation, useNavigate } from "react-router";

const NavigatePlayer = ({ uid, player }) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <p
      onClick={() => {
        navigate(`memberdetail/${uid}${location.search}`);
      }}
      className={`${allowClick} my-0`}
    >
      {player}
    </p>
  );
};

export default NavigatePlayer;
