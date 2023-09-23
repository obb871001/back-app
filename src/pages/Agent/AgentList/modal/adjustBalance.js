import {
  Col,
  Divider,
  Input,
  InputNumber,
  Modal,
  Radio,
  Row,
  Space,
  Typography,
  message,
  notification,
} from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  agentDeposit,
  agentWithdraw,
  depositToPlayer,
  withdrawToPlayer,
} from "../../../../api/methods/postApi";
import { trigger } from "../../../../redux/action/common/action";
import CommonTooltip from "../../../../components/hint/commonTooltip";
import QuestionHint from "../../../../components/hint/QuestionHint";

const AdjustBalance = ({
  openBalanceModal,
  setOpenBalanceModal,
  agentData, //isPlayer為true時 agentData為玩家資料
  isPlayer,
}) => {
  const { t } = useTranslation();
  const i18n = (key, credit) =>
    t(`page.agentinfomation.agentlist.modal.creditPop.${key}`, {
      credit: credit,
    });
  const i18n_props = (key, props) =>
    t(`page.agentinfomation.agentlist.modal.creditPop.${key}`, {
      ...props,
    });
  const i18n_cagent_level = (key) => t(`cagent_level.${key}`);

  const isCredit = useSelector((state) => state.basicConfig?.is_credit === 1);
  const CURRENCY = useSelector((state) => state.CURRENCY);
  const agentInfo = useSelector((state) => state.agentInfo);
  const playerDetail = useSelector((state) => state.commonDetail);
  const dispatch = useDispatch();

  const [quota, setQuota] = useState();
  const [creditQuota, setCreditQuota] = useState(); //信用額度
  const [cagentMemo, setCagentMemo] = useState("");
  const [playerMemo, setPlayerMemo] = useState("");
  const [actionType, setActionType] = useState(0); //1:deposit, 2:withdraw
  const [washPoint, setWashpoint] = useState();
  const [buttonLoading, setButtonLoading] = useState(false);

  const targetBalance = isPlayer
    ? agentData?.balance
    : agentData?.[isCredit ? "credit" : "vpoint"];

  const handleAction = (actionFunc, message, moreProps) => {
    actionFunc({
      paramsData: {
        uid: agentData.uid,
        change_point: quota,
        cagent_memo: cagentMemo || "",
        member_memo: playerMemo || "",
        ...moreProps,
      },
    })
      .then((data) => {
        dispatch(trigger());
        notification.success({ message: i18n(message) });
      })
      .catch((err) => {})
      .finally(() => {
        setOpenBalanceModal(false);
        setTimeout(() => {
          setButtonLoading(false);
        }, 2000);
      });
  };

  const handleSubmit = () => {
    setButtonLoading(true);
    if (isPlayer) {
      if (actionType === 1) {
        if (quota > agentInfo?.[isCredit ? "credit" : "vpoint"]) {
          notification.warning({ message: i18n("quotaNotEnough") });
          setButtonLoading(false);
          return;
        }
        handleAction(depositToPlayer, "depositSuccess", {
          wash_point: washPoint,
        });
      } else if (actionType === 2) {
        if (quota > targetBalance || targetBalance === 0) {
          notification.warning({ message: i18n("targetQuotaNotEnough") });
          setButtonLoading(false);
          return;
        }
        handleAction(withdrawToPlayer, "withdrawSuccess", {
          wash_point: washPoint,
        });
      }
    } else {
      if (actionType === 1) {
        if (quota > agentInfo?.[isCredit ? "credit" : "vpoint"]) {
          notification.warning({ message: i18n("quotaNotEnough") });
          setButtonLoading(false);
          return;
        }
        handleAction(agentDeposit, "depositSuccess");
      } else if (actionType === 2) {
        if (quota > targetBalance || targetBalance === 0) {
          notification.warning({ message: i18n("targetQuotaNotEnough") });
          setButtonLoading(false);
          return;
        }
        handleAction(agentWithdraw, "withdrawSuccess");
      }
    }
  };

  return (
    <Modal
      width={500}
      title={`${i18n("title", isCredit ? i18n("credit") : "")}`}
      open={openBalanceModal}
      onOk={handleSubmit}
      okButtonProps={{
        loading: buttonLoading,
      }}
      onCancel={() => {
        setOpenBalanceModal(false);
      }}
      okText={i18n("submit")}
      destroyOnClose
    >
      <Divider />
      <Space direction="vertical" size="middle">
        <Row align="middle" gutter={[16, 16]}>
          <Col span={9}>
            <Typography.Text className="!font-bold">
              {i18n("myCredit", isCredit ? i18n("credit") : "")}：
            </Typography.Text>
          </Col>
          <Col span={15}>
            <Typography.Text className="!font-bold">
              {agentInfo?.[isCredit ? "credit" : "vpoint"]}
              {CURRENCY}
            </Typography.Text>
          </Col>
          {quota >= 100 && actionType === 1 ? (
            <>
              <Col span={9}>
                <Typography.Text className="!font-bold !text-red-500">
                  {i18n("yourCreditAfter", isCredit ? i18n("credit") : "")}：
                </Typography.Text>
              </Col>
              <Col span={15}>
                <Typography.Text className="!font-bold !text-red-500">
                  {agentInfo?.[isCredit ? "credit" : "vpoint"] - quota}
                  {CURRENCY}
                </Typography.Text>
              </Col>
            </>
          ) : null}
          <Divider className="!my-[5px]" />
          <Col span={9}>
            <Typography.Text>
              {isPlayer ? i18n("player") : i18n("agent")}：
            </Typography.Text>
          </Col>
          <Col span={15}>{isPlayer ? agentData.memId : agentData.cagent}</Col>
          {!isPlayer && (
            <>
              <Col span={9}>
                <Typography.Text>{i18n("agentLevel")}：</Typography.Text>
              </Col>
              <Col span={15}>{i18n_cagent_level(agentData.level)}</Col>
            </>
          )}

          <Col span={9}>
            <Typography.Text>
              {isPlayer
                ? i18n("playerCreditNow", isCredit ? i18n("credit") : "")
                : i18n("agentCreditNow", isCredit ? i18n("credit") : "")}
              ：
            </Typography.Text>
          </Col>
          <Col span={15}>
            <Typography.Text className="!font-bold">
              {targetBalance}
              {CURRENCY}
            </Typography.Text>
          </Col>

          {/* <Col span={9}>
            <Typography.Text>
              {isPlayer
                ? i18n("playerCredit", isCredit ? i18n("credit") : "")
                : i18n("agentCredit", isCredit ? i18n("credit") : "")}
              <QuestionHint
                iconClassName={`ml-[5px]`}
                title={i18n("quotaResetHint")}
              />
              ：
            </Typography.Text>
          </Col>
          <Col span={15}>
            <Typography.Text className="!font-bold">
              {targetBalance}
              {CURRENCY}
            </Typography.Text>
          </Col> */}

          <Col span={9}>
            <Typography.Text>{i18n("action")}：</Typography.Text>
          </Col>
          <Col span={15}>
            <Radio.Group
              onChange={(e) => {
                setActionType(e.target.value);
                setWashpoint();
              }}
              value={actionType}
              options={[
                {
                  label: i18n("deposit"),
                  value: 1,
                },
                {
                  label: i18n("withdraw"),
                  value: 2,
                },
                // ...(isCredit
                //   ? [
                //       {
                //         label: i18n("adjustQuota"),
                //         value: 3,
                //       },
                //     ]
                //   : []),
              ]}
            />
          </Col>
          {actionType === 1 || actionType === 2 ? (
            <>
              <Col span={9}>
                <Typography.Text>{i18n("quota")}：</Typography.Text>
              </Col>
              <Col span={15}>
                <InputNumber
                  onChange={(v) => {
                    setQuota(v);
                  }}
                  disabled={actionType === 0}
                  value={quota}
                  min={actionType === 1 ? 100 : 0}
                  max={
                    actionType === 2
                      ? isPlayer
                        ? agentData?.balance
                        : agentInfo?.[isCredit ? "credit" : "vpoint"]
                      : Infinity
                  }
                  placeholder={
                    actionType === 2
                      ? i18n_props("maxHint", {
                          max: agentInfo?.[isCredit ? "credit" : "vpoint"],
                        })
                      : i18n("limitHint")
                  }
                  addonAfter={CURRENCY}
                />
              </Col>
            </>
          ) : null}
          {isCredit && actionType === 3 ? (
            <>
              <Col span={9}>
                <CommonTooltip
                  tooltip={i18n("creditQuotaHint")}
                  title={
                    <Typography.Text>{i18n("creditQuota")}：</Typography.Text>
                  }
                />
              </Col>
              <Col span={15}>
                <InputNumber
                  onChange={(v) => {
                    setCreditQuota(v);
                  }}
                  disabled={actionType === 0}
                  value={creditQuota}
                  min={100}
                  max={
                    actionType === 2
                      ? isPlayer
                        ? agentData?.balance
                        : agentInfo?.[isCredit ? "credit" : "vpoint"]
                      : Infinity
                  }
                  placeholder={
                    actionType === 2
                      ? i18n_props("maxHint", {
                          max: agentInfo?.[isCredit ? "credit" : "vpoint"],
                        })
                      : i18n("limitHint")
                  }
                  addonAfter={CURRENCY}
                />
              </Col>
            </>
          ) : null}
          {!isCredit && isPlayer && actionType === 1 ? (
            <>
              <Col span={9}>
                <Typography.Text>{i18n("depositWashpoints")}：</Typography.Text>
              </Col>
              <Col span={15}>
                <InputNumber
                  onChange={(v) => {
                    setWashpoint(v);
                  }}
                  value={washPoint}
                  min={0}
                  addonAfter={CURRENCY}
                />
              </Col>
            </>
          ) : null}

          <Col span={9}>
            <Typography.Text>{i18n("cagentMemo")}：</Typography.Text>
          </Col>
          <Col span={15}>
            <Input
              placeholder={i18n("memoEx")}
              onChange={(e) => {
                setCagentMemo(e.target.value);
              }}
              disabled={actionType === 0}
            />
          </Col>
          {isPlayer && (
            <>
              <Col span={9}>
                <Typography.Text>{i18n("playerMemo")}：</Typography.Text>
              </Col>
              <Col span={15}>
                <Input
                  placeholder={i18n("playerEx")}
                  onChange={(e) => {
                    setPlayerMemo(e.target.value);
                  }}
                  disabled={actionType === 0}
                />
              </Col>
            </>
          )}

          <Divider className="!my-[10px]" />
          <Col span={9}>
            <Typography.Text>
              {isPlayer
                ? i18n("playerCreditAfter", isCredit ? i18n("credit") : "")
                : i18n("agentCreditAfter", isCredit ? i18n("credit") : "")}
              ：
            </Typography.Text>
          </Col>
          <Col span={15}>
            {actionType === 1
              ? targetBalance + quota || 0
              : targetBalance - quota || 0}
            {CURRENCY}
          </Col>
          {/* <Col span={9}>
            <Typography.Text>
              {isPlayer
                ? i18n("playerCreditQuotaAfter", isCredit ? i18n("credit") : "")
                : i18n("agentCreditQuotaAfter", isCredit ? i18n("credit") : "")}
              ：
            </Typography.Text>
          </Col>
          <Col span={15}>
            {actionType === 1
              ? targetBalance + quota || 0
              : targetBalance - quota || 0}
            {CURRENCY}
          </Col> */}
        </Row>
      </Space>
    </Modal>
  );
};

export default AdjustBalance;
