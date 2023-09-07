import React from "react";
import CommonTable from "../../../components/table/commonTable";
import { useTranslation } from "react-i18next";
import { ProTable } from "@ant-design/pro-components";

const columnClass = "";

const TotalTable = ({ agentTotal }) => {
  const { t } = useTranslation();
  const i18n = (key) => t(`page.reports.playerreport.${key}`);

  const totalColumns = [
    {
      title: i18n("col.onlinePlayer"),
      dataIndex: "mem_count",
      className: columnClass,
      key: "mem_count",
    },
    {
      title: i18n("col.orderNumber"),
      dataIndex: "order_count",
      className: columnClass,
      key: "order_count",
    },
    {
      title: i18n("col.turnover"),
      dataIndex: "validTurnover",
      className: columnClass,
      key: "validTurnover",
    },
    {
      title: i18n("col.validTurnover"),
      dataIndex: "validTurnover",
      className: columnClass,
      key: "validTurnover",
    },
    {
      title: i18n("col.winloss"),
      dataIndex: "self",
      className: columnClass,
      key: "self",
    },
  ];
  return (
    <ProTable
      dataSource={[agentTotal]}
      bordered
      size="small"
      className="w-full custom-table"
      toolBarRender={false}
      search={false}
      columns={totalColumns}
      pagination={false}
    ></ProTable>
  );
};

export default TotalTable;
