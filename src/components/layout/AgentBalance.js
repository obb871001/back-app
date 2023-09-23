import { Typography } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { formatNumber } from "../../utils/formatNumber";

const AgentBalance = () => {
  const { t } = useTranslation();
  const i18n_header = (key) => t(`layout.header.${key}`);

  const CURRENCY = useSelector((state) => state.CURRENCY);
  const isCredit = useSelector((state) => state.basicConfig?.is_credit === 1);
  const agentInfo = useSelector((state) => state.agentInfo);

  return (
    <>
      <Typography.Text>{i18n_header("balance")}：</Typography.Text>
      <Typography.Text>
        {formatNumber(agentInfo?.[isCredit ? "credit" : "vpoint"])}
        {CURRENCY}
      </Typography.Text>
    </>
  );
};

export default AgentBalance;
