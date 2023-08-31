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

const ReportDetail = () => {
  const reportDetail = useSelector((state) => state.reportDetail);
  const reportDetailPop = useSelector((state) => state.reportDetailPop);
  const dispatch = useDispatch();

  const [openMore, setOpenMore] = useState(false);

  const refDetail = useRef(null);

  const handleDownload = () => {
    if (!openMore) {
      message.warning("請展開遊戲詳情");
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
      label: "注單號碼",
      value: reportDetail.hash,
    },
    {
      label: "局號",
      value: reportDetail.round_id,
    },
    {
      label: "玩家",
      value: reportDetail.memId,
    },

    {
      label: "交易時間",
      value: relativeFromTime(reportDetail.create_time),
    },

    {
      label: "有效投注",
      value: <NumberColumns notStyle number={reportDetail.bet} />,
    },
    {
      label: "派彩",
      value: <NumberColumns number={reportDetail.win} />,
    },
    {
      label: "投注時間",
      value: relativeFromTime(reportDetail.bet_ts),
    },
    {
      label: "派彩時間",
      value: relativeFromTime(reportDetail.win_ts),
    },
    {
      label: "交易後餘額",
      value: <NumberColumns notStyle number={reportDetail.after_balance} />,
    },
    {
      label: "結果",
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
      okText="關閉"
      cancelButtonProps={{ style: { display: "none" } }}
      destroyOnClose
    >
      <StatisticWrapper
        wrapperClassName="!p-[0px]"
        title={
          <>
            交易明細紀錄
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
              <Typography.Text strong>遊戲詳情</Typography.Text>
            </Col>
            <Col span={18}>
              <Typography.Text
                onClick={() => {
                  setOpenMore((prev) => !prev);
                }}
                className={`${allowClick}`}
                underline
              >
                {openMore ? "收起" : "展開"}
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
