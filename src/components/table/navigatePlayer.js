import React from "react";
import { allowClick } from "../../assets/style/styleConfig";
import { useNavigate } from "react-router";

const NavigatePlayer = ({ uid, player }) => {
  const navigate = useNavigate();
  return (
    <p
      onClick={() => {
        navigate(`memberdetail/${uid}`);
      }}
      className={`${allowClick} my-0`}
    >
      {player}
    </p>
  );
};

export default NavigatePlayer;
