import React, { memo, useMemo } from "react";
import CommonTable from "../../../components/table/commonTable";
import { ProTable } from "@ant-design/pro-components";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import UseMergeableSearchParams from "../../../hooks/useMergeableSearchParams";
import { allowClick } from "../../../assets/style/styleConfig";
import { useSelector } from "react-redux";
import { fakeGameArray, specialCommission } from "../../../constant";
import { formatNumber } from "../../../utils/formatNumber";
import NumberColumns from "../../../components/table/numberColumns";
import { Table } from "antd";

const AgentTable = ({
  agentList,
  agentTotal,
  setApiCalling,
  apiCalling,
  totalStatistics,
}) => {
  const { t } = useTranslation();
  const i18n = (key) => t(`page.reports.playerreport.${key}`);
  const i18n_cagent_level = (key) => t(`cagent_level.${key}`);

  const [searchParams, setSearchParams] = UseMergeableSearchParams();

  const gamePlatform = useSelector(
    (state) => state.gameList.gamePlatform || fakeGameArray
  );
  const CURRENCY = useSelector((state) => state.CURRENCY);

  const agentColumns = [
    {
      title: i18n_cagent_level(`${agentTotal.level + 1}`),
      dataIndex: "cagent",
      key: "cagent",
      render: (value, row) => {
        return (
          <p
            onClick={() => {
              if (apiCalling) {
                return;
              }
              setApiCalling(true);
              setSearchParams({ agentUid: row.uid });
            }}
            className={`my-0 ${allowClick} underline ${
              apiCalling && "!cursor-not-allowed"
            }`}
          >
            {value}
          </p>
        );
      },
    },
    {
      title: i18n("col.nickname"),
      dataIndex: "nick_name",
      key: "nick_name",
    },

    {
      title: i18n("col.onlinePlayer"),
      dataIndex: "mem_count",
      key: "mem_count",
      summary: true,
    },
    {
      title: i18n("col.validTurnover"),
      dataIndex: "bet",
      key: "bet",
      summary: true,
      align: "right",
      render: (row) => <NumberColumns notStyle number={row} />,
    },

    {
      title: i18n("col.memberWinloss"),
      dataIndex: "win",
      align: "right",
      key: "win",
      summary: true,
      render: (row) => <NumberColumns number={row} />,
    },
    {
      title: i18n("col.companyCommission"),
      dataIndex: "win_company",
      align: "right",
      key: "win_company",
      summary: true,
      render: (row) => <NumberColumns number={row} />,
    },
    {
      title: i18n("col.selfCommission"),
      dataIndex: "win_self",
      align: "right",
      key: "win_self",
      summary: true,
      render: (row) => <NumberColumns number={row} />,
    },
    {
      title: i18n("col.settledAmount"),
      dataIndex: "total_settlement_amount",
      align: "right",
      key: "total_settlement_amount",
      summary: true,
      render: (row) => <NumberColumns number={row} />,
    },
  ];

  const summaryArray = useMemo(() => {
    return agentColumns.filter((item) => item.summary).map((item) => item.key);
  }, [agentColumns]);
  return (
    <CommonTable
      dataSource={agentList}
      rowKey="uid"
      columns={agentColumns}
      summary={(pageData) => {
        return (
          <Table.Summary.Row className="bg-[#FAFAFA]">
            <Table.Summary.Cell className="font-bold" colSpan={3}>
              {i18n("total")}
            </Table.Summary.Cell>
            {summaryArray.map((sum) => {
              return sum === "mem_count" ? (
                <Table.Summary.Cell colSpan={1}>
                  {totalStatistics.agent?.[sum]}
                </Table.Summary.Cell>
              ) : (
                <Table.Summary.Cell align="right" colSpan={1}>
                  <NumberColumns
                    notStyle={sum === "bet"}
                    number={totalStatistics.agent?.[sum]}
                  />
                </Table.Summary.Cell>
              );
            })}

            <Table.Summary.Cell colSpan={1}></Table.Summary.Cell>
          </Table.Summary.Row>
        );
      }}
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
                  win_self: record?.[`win_self_${item}`] || 0,
                  per: hasCompanyCommission
                    ? (hasCompanyPercent / 100) *
                      (record?.[`per_${item}`] / 100) *
                      100
                    : record?.[`per_${item}`] || 0,
                  win_company: record?.[`win_company_${item}`] || 0,
                  // total_settlement_amount:
                  //   record?.[`total_settlement_amount_${item}`] || 0,
                };
              })}
              pagination={false}
            />
          );
        },
      }}
      tableProps={{ title: i18n("tabs.agentDetailData") }}
      customPagination={{
        pageSize: 30,
        showSizeChanger: false,
      }}
    />
  );
};

export default AgentTable;
