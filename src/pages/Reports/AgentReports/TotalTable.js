import React from "react";
import CommonTable from "../../../components/table/commonTable";
import { useTranslation } from "react-i18next";
import { ProTable } from "@ant-design/pro-components";
import { useSelector } from "react-redux";
import { formatNumber } from "../../../utils/formatNumber";
import NumberColumns from "../../../components/table/numberColumns";
import { fakeGameArray, specialCommission } from "../../../constant";
import { Table } from "antd";

const columnClass = "";

const TotalTable = ({ agentTotal }) => {
  const { t } = useTranslation();
  const i18n = (key) => t(`page.reports.playerreport.${key}`);

  const CURRENCY = useSelector((state) => state.CURRENCY);

  const gamePlatform = useSelector(
    (state) => state.gameList.gamePlatform || fakeGameArray
  );

  //公式：(總輸贏+抽水)*佔成
  //抽水＝投注量*抽水比例
  const totalColumns = [
    {
      title: i18n("col.onlinePlayer"),
      dataIndex: "mem_count",
      className: columnClass,
      key: "mem_count",
    },
    // {
    //   title: i18n("col.orderNumber"),
    //   dataIndex: "order_count",
    //   className: columnClass,
    //   key: "order_count",
    // },
    {
      title: i18n("col.validTurnover"),
      dataIndex: "bet",
      className: columnClass,
      align: "right",
      key: "bet",
      render: (row) => <NumberColumns notStyle number={row} />,
    },
    {
      title: i18n("col.winloss"), //輸贏
      dataIndex: "win",
      className: columnClass,
      align: "right",
      key: "win",
      render: (row) => <NumberColumns number={row} />,
    },
    // {
    //   title: i18n("col.winlossCommission"),
    //   dataIndex: "member_per",
    //   key: "member_per",
    //   align: "right",
    //   render: (row) => <NumberColumns  number={row} />,
    // },
    {
      title: i18n("col.companyCommission"),
      dataIndex: "win_company",
      className: columnClass,
      align: "right",
      key: "win_company",
      render: (row) => <NumberColumns number={row} />,
    },
    {
      title: i18n("col.selfCommission"),
      dataIndex: "win_self",
      className: columnClass,
      align: "right",
      key: "win_self",
      render: (row) => <NumberColumns number={row} />,
    },

    {
      title: i18n("col.settledAmount"),
      dataIndex: "total_settlement_amount",
      className: columnClass,
      align: "right",
      key: "total_settlement_amount",
      render: (row) => <NumberColumns number={row} />,
    },
  ];
  return (
    <ProTable
      dataSource={[agentTotal]}
      bordered
      size="small"
      scroll={{ x: "max-content" }}
      className="w-full custom-table"
      toolBarRender={false}
      search={false}
      columns={totalColumns}
      expandable={{
        expandedRowRender: (record, key) => {
          return (
            <ProTable
              columns={[
                {
                  title: i18n("col.platform"),
                  dataIndex: "platform",
                  key: "platform",
                },
                // {
                //   title: i18n("col.orderNumber"),
                //   dataIndex: "order_number",
                //   key: "order_number",
                // },
                {
                  title: i18n("col.validTurnover"),
                  dataIndex: "bet",
                  key: "bet",
                  align: "right",
                  render: (row) => <NumberColumns notStyle number={row} />,
                },

                {
                  title: i18n("col.memberWinloss"),
                  dataIndex: "win",
                  align: "right",
                  key: "win",
                  render: (row) => <NumberColumns number={row} />,
                },
                {
                  title: i18n("col.companyCommission"),
                  dataIndex: "win_company",
                  align: "right",
                  key: "win_company",
                  render: (row) => <NumberColumns number={row} />,
                },
                {
                  title: i18n("col.companyOccupy"),
                  dataIndex: "company_per",
                  align: "right",
                  key: "company_per",
                  render: (row) => `${row}%`,
                },
                {
                  title: i18n("col.selfCommission"),
                  dataIndex: "win_self",
                  align: "right",
                  key: "win_self",
                  render: (row) => <NumberColumns number={row} />,
                },
                {
                  title: i18n("col.selfOccupy"),
                  dataIndex: "per",
                  align: "right",
                  key: "per",
                  render: (row) => `${parseInt(row)}%`,
                },

                // {
                //   title: i18n("col.settledAmount"),
                //   dataIndex: "total_settlement_amount",
                //   align: "right",
                //   key: "total_settlement_amount",
                //   render: (row) => <NumberColumns number={row} />,
                // },
              ]}
              headerTitle={false}
              search={false}
              bordered
              className="custom-expand-table"
              size="small"
              options={false}
              dataSource={gamePlatform?.map((item) => {
                const hasCompanyCommission =
                  specialCommission?.[item]?.companyCommission; //特別佔成

                const hasCompanyPercent = specialCommission?.[item]?.percent; //特別佔成

                return {
                  platform: item,
                  // order_number: 0,
                  bet: record?.[`bet_${item}`] || 0,
                  win: record?.[`win_${item}`] || 0,
                  company_per: hasCompanyCommission ? hasCompanyPercent : "-",
                  win_company: record?.[`win_company_${item}`] || 0,
                  win_self: record?.[`win_self_${item}`] || 0,
                  // total_settlement_amount:
                  //   record?.[`total_settlement_amount_${item}`] || 0,
                  per:
                    hasCompanyCommission > 0
                      ? (hasCompanyPercent / 100) *
                        (record?.[`per_${item}`] / 100) *
                        100
                      : record?.[`per_${item}`] || 0,
                };
              })}
              pagination={false}
            />
          );
        },
      }}
      pagination={false}
    ></ProTable>
  );
};

export default TotalTable;
