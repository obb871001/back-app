import { Button, Col, Modal, Row, Typography } from "antd";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeReportDetail } from "../../../redux/action/reports/action";
import { useTranslation } from "react-i18next";
import StatisticWrapper from "../../Home/components/StatisticWrapper";
import { DownloadOutlined } from "@ant-design/icons";
import html2canvas from "html2canvas";
import RelativeTimeCol from "../../../components/tableColumns/relativeTimeCol";
import NumberColumns from "../../../components/table/numberColumns";

const DetailModal = () => {
  const { t } = useTranslation();
  const i18n = (key) => t(`page.agentinfomation.agentlog.${key}`);
  const i18n_modal = (key) => t(`commonModal.${key}`);
  const i18n_actionCode = (key) => t(`action_code.${key}`);

  const reportDetailPop = useSelector((state) => state.reportDetailPop);
  const reportDetail = useSelector((state) => state.reportDetail);
  const moreDetail = JSON.parse(reportDetail?.detail);
  const nowTime = useSelector((state) => state.nowTime);
  const dispatch = useDispatch();

  const refDetail = useRef(null);

  const handleDownload = () => {
    html2canvas(refDetail.current).then((canvas) => {
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `${i18n("col.transactionDetail")}-${
        reportDetail.member
      }.png`;
      link.href = dataUrl;
      link.click();
    });
  };
  console.log(moreDetail);

  const handleOk = () => {
    dispatch(closeReportDetail());
  };

  const data = [
    {
      label: i18n("col.actionAgent"),
      value: reportDetail.cagent,
    },
    {
      label: i18n("col.agentTarget"),
      value: moreDetail?.cagent || moreDetail?.member,
    },
    {
      label: i18n("col.time"),
      value: (
        <RelativeTimeCol now={nowTime} timeStr={reportDetail.create_time} />
      ),
    },
    {
      label: i18n("col.orderNumber"),
      value: moreDetail?.order_number || "-",
    },
    {
      label: i18n("col.actionType"),
      value: i18n_actionCode(reportDetail.action_code),
    },
    {
      label: i18n("col.from"),
      value: reportDetail.cagent || "-",
    },
    {
      label: i18n("col.to"),
      value: moreDetail?.cagent || moreDetail?.member,
    },
    {
      label: i18n("col.beforeBalance"),
      value: (
        <NumberColumns
          number={moreDetail?.sub_before || moreDetail?.mem_before}
          notStyle
        />
      ),
    },
    {
      label: i18n("col.afterBalance"),
      value: (
        <NumberColumns
          number={moreDetail?.sub_after || moreDetail?.mem_after}
          notStyle
        />
      ),
    },
    {
      label: i18n("col.amounts"),
      value: (
        <NumberColumns
          number={moreDetail?.sub_trans || moreDetail?.mem_trans}
        />
      ),
    },
  ];

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
            {i18n("col.transactionDetail")}{" "}
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
          </Row>
        </section>
      </StatisticWrapper>
    </Modal>
  );
};

export default DetailModal;
