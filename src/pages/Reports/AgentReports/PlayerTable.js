import React, { useMemo } from "react";
import CommonTable from "../../../components/table/commonTable";
import { useTranslation } from "react-i18next";
import NavigatePlayer from "../../../components/table/navigatePlayer";
import UseMergeableSearchParams from "../../../hooks/useMergeableSearchParams";
import { useSelector } from "react-redux";
import { fakeGameArray } from "../../../constant";
import { ProTable } from "@ant-design/pro-components";
import { formatNumber } from "../../../utils/formatNumber";
import NumberColumns from "../../../components/table/numberColumns";
import { Table } from "antd";

const PlayerTable = ({ directPlayer, customPagination, totalStatistics }) => {
  const { t } = useTranslation();
  const i18n = (key) => t(`page.reports.playerreport.${key}`);

  const [searchParams, setSearchParams] = UseMergeableSearchParams();
  const { current_page = 1, per_page, total_records = 0 } = customPagination;

  const gamePlatform = useSelector(
    (state) => state.gameList.gamePlatform || fakeGameArray
  );
  const CURRENCY = useSelector((state) => state.CURRENCY);

  const playerColumns = [
    {
      title: i18n("col.number"),
      dataIndex: "uid",
      key: "uid",
    },
    {
      title: i18n("col.playerId"),
      dataIndex: "memId",
      key: "memId",
      render: (value, row) => {
        return <NavigatePlayer uid={row.uid} player={value} />;
      },
    },
    {
      title: i18n("col.trueName"),
      dataIndex: "true_name",
      key: "true_name",
    },

    // {
    //   title: i18n("col.orderNumber"),
    //   dataIndex: "order_count",
    //   key: "order_count",
    // },

    {
      title: i18n("col.validTurnover"),
      dataIndex: "bet",
      key: "bet",
      align: "right",
      summary: true,
      render: (row) => <NumberColumns notStyle number={row} />,
    },
    {
      title: i18n("col.winloss"),
      dataIndex: "win",
      key: "win",
      align: "right",
      summary: true,
      render: (row) => <NumberColumns number={row} />,
    },
  ];
  const summaryArray = useMemo(() => {
    return playerColumns.filter((item) => item.summary).map((item) => item.key);
  }, [playerColumns]);

  return (
    <CommonTable
      dataSource={directPlayer}
      columns={playerColumns}
      rowKey="uid"
      tableProps={{ title: i18n("tabs.playerDetailData") }}
      summary={(pageData) => {
        return (
          <Table.Summary.Row className="bg-[#FAFAFA]">
            <Table.Summary.Cell className="font-bold" colSpan={4}>
              {i18n("total")}
            </Table.Summary.Cell>
            {summaryArray.map((sum) => {
              return (
                <Table.Summary.Cell align="right" colSpan={1}>
                  <NumberColumns
                    notStyle={sum === "bet"}
                    number={totalStatistics.player?.[sum]}
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
                //   dataIndex: "order_count",
                //   key: "order_count",
                // },
                {
                  title: i18n("col.validTurnover"),
                  dataIndex: "bet",
                  key: "bet",
                  align: "right",
                  render: (row) => <NumberColumns notStyle number={row} />,
                },
                {
                  title: i18n("col.winloss"),
                  dataIndex: "win",
                  key: "win",
                  align: "right",
                  render: (row) => <NumberColumns number={row} />,
                },
              ]}
              headerTitle={false}
              search={false}
              bordered
              className="custom-expand-table"
              size="small"
              options={false}
              dataSource={gamePlatform?.map((item) => {
                return {
                  platform: item,
                  order_number: 0,
                  bet: record?.[`bet_${item}`] || 0,
                  win: record?.[`win_${item}`] || 0,
                };
              })}
              pagination={false}
            />
          );
        },
      }}
      customPagination={{
        pageSize: per_page,
        onChange: (page, pageSize) => {
          setSearchParams({ current_page: page, per_page: pageSize });
        },
        total: total_records,
        showSizeChanger: true,
        current: Number(current_page),
      }}
    />
  );
};

export default PlayerTable;
