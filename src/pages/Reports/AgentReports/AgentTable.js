import React, { memo, useMemo } from "react";
import CommonTable from "../../../components/table/commonTable";
import { ProTable } from "@ant-design/pro-components";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import UseMergeableSearchParams from "../../../hooks/useMergeableSearchParams";
import { allowClick } from "../../../assets/style/styleConfig";
import { useSelector } from "react-redux";
import { fakeGameArray } from "../../../constant";

const AgentTable = ({ agentList, agentTotal, setApiCalling, apiCalling }) => {
  const { t } = useTranslation();
  const i18n = (key) => t(`page.reports.playerreport.${key}`);

  const [searchParams, setSearchParams] = UseMergeableSearchParams();

  const gamePlatform = useSelector(
    (state) => state.gameList.gamePlatform || fakeGameArray
  );

  const agentColumns = [
    {
      title: i18n("col.agent"),
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
    },
    {
      title: i18n("col.orderNumber"),
      dataIndex: "order_count",
      key: "order_count",
      align: "order_count",
    },

    {
      title: i18n("col.validTurnover"),
      dataIndex: "validTurnover",
      key: "validTurnover",
      align: "right",
    },
    {
      title: i18n("col.winloss"),
      dataIndex: "self",
      key: "self",
      align: "right",
    },
  ];

  return (
    <CommonTable
      dataSource={agentList}
      rowKey="uid"
      columns={agentColumns}
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
                  dataIndex: "order_number",
                  key: "order_number",
                },
                {
                  title: i18n("col.validTurnover"),
                  dataIndex: "validTurnover",
                  key: "validTurnover",
                  align: "right",
                },
                {
                  title: i18n("col.winloss"),
                  dataIndex: "self",
                  key: "self",
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
                  validTurnover: record?.[`validTurnover_${item}`] || 0,
                  self: record?.[`self_${item}`] || 0,
                };
              })}
              pagination={false}
            />
          );
        },
      }}
      tableProps={{ title: i18n("tabs.agentDetailData") }}
    />
  );
};

export default AgentTable;
