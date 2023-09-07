import {
  Col,
  Divider,
  InputNumber,
  Modal,
  Row,
  Space,
  Typography,
  notification,
} from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const AdjustBalance = ({
  openBalanceModal,
  setOpenBalanceModal,
  agentData,
}) => {
  const { t } = useTranslation();
  const i18n = (key, credit) =>
    t(`page.agentinfomation.agentlist.modal.creditPop.${key}`, {
      credit: credit,
    });

  const isCredit = useSelector((state) => state.basicConfig?.is_credit === 1);
  const CURRENCY = useSelector((state) => state.CURRENCY);
  const agentInfo = useSelector((state) => state.agentInfo);

  const [quota, setQuota] = useState(0);

  const handleSubmit = () => {
    if (quota > agentInfo?.[isCredit ? "credit" : "vpoint"]) {
      notification.warning({
        message: i18n("quotaNotEnough"),
      });
      return;
    }
  };

  return (
    <Modal
      width={500}
      title={`${i18n("title", isCredit ? i18n("credit") : "")}`}
      open={openBalanceModal}
      onOk={handleSubmit}
      onCancel={() => {
        setOpenBalanceModal(false);
      }}
      okText={i18n("submit")}
      destroyOnClose
    >
      <Divider />
      <Space direction="vertical" size="middle">
        <Row align="middle" gutter={[16, 16]}>
          <Col span={8}>
            <Typography.Text className="!font-bold">
              {i18n("myCredit", isCredit ? i18n("credit") : "")}：
            </Typography.Text>
          </Col>
          <Col span={16}>
            <Typography.Text className="!font-bold">
              {agentInfo?.[isCredit ? "credit" : "vpoint"]}
              {CURRENCY}
            </Typography.Text>
          </Col>
          {quota >= 100 && (
            <>
              <Col span={8}>
                <Typography.Text className="!font-bold !text-red-500">
                  {i18n("yourCreditAfter", isCredit ? i18n("credit") : "")}：
                </Typography.Text>
              </Col>
              <Col span={16}>
                <Typography.Text className="!font-bold !text-red-500">
                  {agentInfo?.[isCredit ? "credit" : "vpoint"] - quota}
                  {CURRENCY}
                </Typography.Text>
              </Col>
            </>
          )}
          <Col span={8}>
            <Typography.Text>{i18n("agent")}：</Typography.Text>
          </Col>
          <Col span={16}>{agentData.cagent}</Col>
          <Col span={8}>
            <Typography.Text>
              {i18n("agentCreditNow", isCredit ? i18n("credit") : "")}：
            </Typography.Text>
          </Col>
          <Col span={16}>
            <Typography.Text className="!font-bold">
              {agentData?.[isCredit ? "credit" : "vpoint"]}
              {CURRENCY}
            </Typography.Text>
          </Col>
          <Col span={8}>
            <Typography.Text>{i18n("quota")}：</Typography.Text>
          </Col>
          <Col span={16}>
            <InputNumber
              onChange={(v) => {
                setQuota(v);
              }}
              value={quota}
              min={100}
              placeholder={i18n("limitHint")}
              addonAfter={CURRENCY}
            />
          </Col>
          <Divider className="!my-[10px]" />
          <Col span={8}>
            <Typography.Text>
              {i18n("agentCreditAfter", isCredit ? i18n("credit") : "")}：
            </Typography.Text>
          </Col>
          <Col span={16}>
            {agentData?.[isCredit ? "credit" : "vpoint"] + quota}
            {CURRENCY}
          </Col>
        </Row>
      </Space>
    </Modal>
  );
};

export default AdjustBalance;
