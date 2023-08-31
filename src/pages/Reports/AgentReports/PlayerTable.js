import React from "react";
import CommonTable from "../../../components/table/commonTable";

const PlayerTable = ({ directPlayer }) => {
  const playerColumns = [
    {
      title: "編號",
      dataIndex: "uid",
    },
    {
      title: "玩家名稱",
      dataIndex: "memId",
    },
    {
      title: "單量",
      dataIndex: "order_count",
      key: "order_count",
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
      dataSource={directPlayer}
      columns={playerColumns}
      tableProps={{ title: "代理玩家報表" }}
    />
  );
};

export default PlayerTable;
