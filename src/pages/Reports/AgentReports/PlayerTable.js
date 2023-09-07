import React from "react";
import CommonTable from "../../../components/table/commonTable";
import { useTranslation } from "react-i18next";
import NavigatePlayer from "../../../components/table/navigatePlayer";
import UseMergeableSearchParams from "../../../hooks/useMergeableSearchParams";
import { useSelector } from "react-redux";
import { fakeGameArray } from "../../../constant";
import { ProTable } from "@ant-design/pro-components";

const PlayerTable = ({ directPlayer, customPagination }) => {
  const { t } = useTranslation();
  const i18n = (key) => t(`page.reports.playerreport.${key}`);

  const [searchParams, setSearchParams] = UseMergeableSearchParams();
  const { current_page = 1, per_page, total_records = 0 } = customPagination;

  const gamePlatform = useSelector(
    (state) => state.gameList.gamePlatform || fakeGameArray
  );

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
      title: i18n("col.orderNumber"),
      dataIndex: "order_count",
      key: "order_count",
    },

    {
      title: i18n("col.validTurnover"),
      dataIndex: "valid_bet",
      key: "valid_bet",
      align: "right",
    },
    {
      title: i18n("col.winloss"),
      dataIndex: "win_loss",
      key: "win_loss",
      align: "right",
    },
  ];

  return (
    <CommonTable
      dataSource={directPlayer}
      columns={playerColumns}
      rowKey="uid"
      tableProps={{ title: i18n("tabs.playerDetailData") }}
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
                {
                  title: i18n("col.orderNumber"),
                  dataIndex: "order_count",
                  key: "order_count",
                },
                {
                  title: i18n("col.validTurnover"),
                  dataIndex: "valid_bet",
                  key: "valid_bet",
                  align: "right",
                },
                {
                  title: i18n("col.winloss"),
                  dataIndex: "win_loss",
                  key: "win_loss",
                  align: "right",
                },
              ]}
              headerTitle={false}
              search={false}
              className="custom-expand-table"
              size="small"
              options={false}
              dataSource={gamePlatform?.map((item) => {
                return {
                  platform: item,
                  order_number: 0,
                  valid_bet: record?.[`valid_bet${item}`] || 0,
                  win_loss: record?.[`win_loss${item}`] || 0,
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
