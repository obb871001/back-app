import React, { useState } from "react";
import AdjustBalance from "../../../../Agent/AgentList/modal/adjustBalance";
import { useDispatch, useSelector } from "react-redux";
import { ProFormDigit } from "@ant-design/pro-components";
import { useTranslation } from "react-i18next";
import { Col, Row, Typography } from "antd";
import {
  allowClick,
  notAllowClick,
} from "../../../../../assets/style/styleConfig";
import useEditStatus from "../../../../../utils/EditStatus";

const BalancePop = () => {
  const { t } = useTranslation();
  const i18n = (key) => t(`page.admin.playersearch.col.${key}`);

  const [openBalanceModal, setOpenBalanceModal] = useState(false);

  const playerDetail = useSelector((state) => state.commonDetail);
  const agentInfo = useSelector((state) => state.agentInfo);
  const CURRENCY = useSelector((state) => state.CURRENCY);
  const isCredit = useSelector((state) => state.basicConfig.is_credit === 1);
  const dispatch = useDispatch();

  const canEdit = useEditStatus();

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={5} className="flex justify-end">
          <Typography.Text>{i18n("accountBalance")}:</Typography.Text>
        </Col>
        <Col span={19}>
          <Typography.Text
            className={`${canEdit ? `${allowClick} underline` : ""} `}
            onClick={() => {
              if (!canEdit) {
                return;
              }
              setOpenBalanceModal(true);
            }}
          >
            {playerDetail.balance || 0}
            {CURRENCY}
          </Typography.Text>
        </Col>
      </Row>
      {openBalanceModal && (
        <AdjustBalance
          openBalanceModal={openBalanceModal}
          setOpenBalanceModal={setOpenBalanceModal}
          agentData={playerDetail}
          isPlayer
        />
      )}
    </>
  );
};

export default BalancePop;
