import React from "react";
import CommonTable from "../../../components/table/commonTable";

const columnClass = "!bg-[#B7E3C8]";

const TotalTable = () => {
  const totalColumns = [
    {
      title: "統計類型",
      dataIndex: "type",
      className: columnClass,
      key: "type",
    },
    {
      title: "線上會員",
      dataIndex: "member_count",
      className: columnClass,
      key: "member_count",
    },
    {
      title: "單量",
      dataIndex: "order_count",
      className: columnClass,
      key: "order_count",
    },
    {
      title: "投注額",
      dataIndex: "bet",
      className: columnClass,
      key: "bet",
    },
    {
      title: "有效投注額",
      dataIndex: "valid_turnover",
      className: columnClass,
      key: "valid_turnover",
    },
    {
      title: "損益",
      dataIndex: "winloss",
      className: columnClass,
      key: "winloss",
    },
  ];
  return (
    <CommonTable
      dataSource={[]}
      bordered
      columns={totalColumns}
      tableProps={{ title: "" }}
      customPagination={{
        pageSize: false,
        total: false,
        showSizeChanger: false,
      }}
    ></CommonTable>
  );
};

export default TotalTable;
