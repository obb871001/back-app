import { useDispatch, useSelector } from "react-redux";
import { useState, useRef } from "react";
import { DownloadOutlined } from "@ant-design/icons";
import html2canvas from "html2canvas";
import {
  Button,
  Col,
  Divider,
  Form,
  Modal,
  Row,
  Typography,
  message,
} from "antd";

import CustomModal from "../../../components/modal/customModal";
import StatisticWrapper from "../../Home/components/StatisticWrapper";
import { relativeFromTime } from "../../../utils/getDay";
import { formatNumber } from "../../../utils/formatNumber";
import { closeReportDetail } from "../../../redux/action/reports/action";
import NumberColumns from "../../../components/table/numberColumns";
import { allowClick } from "../../../assets/style/styleConfig";
import { useTranslation } from "react-i18next";

const ReportDetail = () => {
  const { t } = useTranslation();
  const i18n = (key) => t(`page.reports.gamehistory.${key}`);
  const i18n_modal = (key) => t(`commonModal.${key}`);

  const reportDetail = useSelector((state) => state.reportDetail);
  const reportDetailPop = useSelector((state) => state.reportDetailPop);
  const dispatch = useDispatch();

  const [openMore, setOpenMore] = useState(false);

  const refDetail = useRef(null);

  const handleDownload = () => {
    if (!openMore) {
      message.warning(i18n("hint.pleaseOpenGameDetail"));
      return;
    }
    html2canvas(refDetail.current).then((canvas) => {
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `${reportDetail.memId}-${reportDetail.hash}.png`;
      link.href = dataUrl;
      link.click();
    });
  };

  const data = [
    {
      label: i18n("col.orderNumber"),
      value: reportDetail.hash,
    },
    {
      label: i18n("col.roundId"),
      value: reportDetail.round_id,
    },
    {
      label: i18n("col.playerId"),
      value: reportDetail.memId,
    },

    {
      label: i18n("col.transactionTime"),
      value: relativeFromTime(reportDetail.create_time),
    },

    {
      label: i18n("col.validTurnover"),
      value: <NumberColumns notStyle number={reportDetail.bet} />,
    },
    {
      label: i18n("col.payout"),
      value: <NumberColumns number={reportDetail.win} />,
    },
    {
      label: i18n("col.betTime"),
      value: relativeFromTime(reportDetail.bet_ts),
    },
    {
      label: i18n("col.payoutTime"),
      value: relativeFromTime(reportDetail.win_ts),
    },
    {
      label: i18n("col.beforeTransactionBalance"),
      value: <NumberColumns notStyle number={reportDetail.after_balance} />,
    },

    {
      label: i18n("col.afterTransactionBalance"),
      value: <NumberColumns notStyle number={reportDetail.after_balance} />,
    },
    {
      label: i18n("col.result"),
      value: reportDetail.roundcode,
    },
  ];
  const handleOk = () => {
    dispatch(closeReportDetail());
  };

  return (
    <Modal
      width={700}
      open={reportDetailPop}
      onOk={handleOk}
      onCancel={handleOk}
      okText={i18n_modal("close")}
      cancelButtonProps={{ style: { display: "none" } }}
      destroyOnClose
    >
      <StatisticWrapper
        wrapperClassName="!p-[0px]"
        title={
          <>
            {i18n("hint.transactionDetail")}
            <Button
              type="primary"
              className="ml-[10px]"
              icon={<DownloadOutlined />}
              size="small"
              shape="round"
              onClick={() => {
                handleDownload();
              }}
            ></Button>
          </>
        }
      >
        <section className="px-[30px] py-[10px]" ref={refDetail}>
          <Row gutter={[16, 16]}>
            {data.map((data) => {
              return (
                <>
                  <Col span={6}>
                    <Typography.Text strong>{data.label}</Typography.Text>
                  </Col>
                  <Col span={18}>{data.value}</Col>
                </>
              );
            })}
            <Col span={6}>
              <Typography.Text strong>
                {i18n("hint.gameDetail")}
              </Typography.Text>
            </Col>
            <Col span={18}>
              <Typography.Text
                onClick={() => {
                  setOpenMore((prev) => !prev);
                }}
                className={`${allowClick}`}
                underline
              >
                {openMore ? i18n("hint.collape") : i18n("hint.expand")}
              </Typography.Text>
              {openMore && (
                <Row gutter={[16, 16]}>
                  <Divider dashed />
                  {reportDetail.detail.map((detail) => {
                    return (
                      <>
                        <Col span={6}>
                          <Typography.Text type="secondary" strong>
                            {detail.label}
                          </Typography.Text>
                        </Col>
                        <Col span={18} type="secondary">
                          <Typography.Text>{detail.value}</Typography.Text>
                        </Col>
                      </>
                    );
                  })}
                </Row>
              )}
            </Col>
          </Row>
        </section>
      </StatisticWrapper>
    </Modal>
  );
};

export default ReportDetail;
