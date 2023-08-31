import React from "react";
import CommonTable from "../../../components/table/commonTable";
import { ProTable } from "@ant-design/pro-components";

const AgentTable = ({ agentList, agentTotal }) => {
  const agentColumns = [
    {
      title: "代理名稱/暱稱",
      render: (row) => {
        return `${row.cagent}/${row.nick_name}`;
      },
    },
    {
      title: "線上會員",
      dataIndex: "member_count",
      key: "member_count",
    },
    {
      title: "單量",
      dataIndex: "order_count",
      key: "order_count",
      align: "order_count",
    },

    {
      title: "有效投注額",
      dataIndex: "validTurnover",
      key: "validTurnover",
      align: "right",
    },
    {
      title: "損益",
      dataIndex: "winloss",
      key: "winloss",
      align: "right",
    },
  ];

  return (
    <CommonTable
      dataSource={agentList}
      columns={agentColumns}
      tableProps={{ title: "代理詳細資料" }}
    />
  );
};

export default AgentTable;
