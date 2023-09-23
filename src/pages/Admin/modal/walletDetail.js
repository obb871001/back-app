import { Button, Col, Modal, Row, Typography } from "antd";
import React, { useRef, useState } from "react";
import StatisticWrapper from "../../Home/components/StatisticWrapper";
import { useDispatch, useSelector } from "react-redux";
import { closeReportDetail } from "../../../redux/action/reports/action";
import { DownloadOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import RelativeTimeCol from "../../../components/tableColumns/relativeTimeCol";
import NumberColumns from "../../../components/table/numberColumns";
import html2canvas from "html2canvas";

const WalletDetail = () => {
  const { t } = useTranslation();
  const i18n_actionCode = (key) => t(`action_code.${key}`);
  const i18n = (key) => t(`page.admin.memberwalletlog.${key}`);
  const i18n_modal = (key) => t(`commonModal.${key}`);

  const reportDetail = useSelector((state) => state.reportDetail);
  const reportDetailPop = useSelector((state) => state.reportDetailPop);
  const nowTime = useSelector((state) => state.nowTime);
  const basicConfig = useSelector((state) => state.basicConfig);
  const dispatch = useDispatch();

  const [openMore, setOpenMore] = useState(false);

  const refDetail = useRef(null);

  const handleDownload = () => {
    html2canvas(refDetail.current).then((canvas) => {
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `${reportDetail.memId}-${i18n(
        "col.transactionDetail"
      )}.png`;
      link.href = dataUrl;
      link.click();
    });
  };

  const handleOk = () => {
    dispatch(closeReportDetail());
  };

  const data = [
    {
      label: i18n("col.playerId"),
      value: reportDetail.memId,
    },
    {
      label: i18n("col.transactionTime"),
      value: (
        <RelativeTimeCol now={nowTime} timeStr={reportDetail.create_time} />
      ),
    },
    {
      label: i18n("col.orderNumber"),
      value: reportDetail.order_number,
    },

    {
      label: i18n("col.game"),
      value: reportDetail.wallet_name,
    },
    {
      label: i18n("col.type"),
      value: i18n_actionCode(`${reportDetail.action_code}`),
    },

    {
      label: i18n("col.exportFrom"),
      value: i18n(`col.${reportDetail.vfrom}`),
    },
    {
      label: i18n("col.exportTo"),
      value: i18n(`col.${reportDetail.vto}`),
    },
    {
      label: i18n("col.beforeTransactionBalance"),
      value: (
        <NumberColumns
          notStyle
          number={
            reportDetail?.[`mem_${basicConfig.wallet_type}_wallet_before`]
          }
        />
      ),
    },
    {
      label: i18n("col.afterTransactionBalance"),
      value: (
        <NumberColumns
          notStyle
          number={reportDetail?.[`mem_${basicConfig.wallet_type}_wallet_after`]}
        />
      ),
    },
    {
      label: i18n("col.amounts"),
      value: (
        <NumberColumns
          number={reportDetail?.[`mem_${basicConfig.wallet_type}_wallet_trans`]}
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

export default WalletDetail;
