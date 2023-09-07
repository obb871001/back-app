import { useEffect, useMemo, useState } from "react";

import SearchTool from "../../components/searchTool/searchTool";
import CommonTable from "../../components/table/commonTable";
import UseMergeableSearchParams from "../../hooks/useMergeableSearchParams";
import { getToday } from "../../utils/getDay";
import {
  getAgentReport,
  getPlayerFromAgentReport,
} from "../../api/methods/getApi";
import { Divider, Space, Tabs, message } from "antd";
import { ProTable } from "@ant-design/pro-components";
import Wrapper from "../../components/layout/Wrapper";
import TableWrapper from "../../components/layout/TableWrapper";
import Typography from "antd/es/typography/Typography";
import StatisticWrapper from "../Home/components/StatisticWrapper";
import AgentTable from "./AgentReports/AgentTable";
import TotalTable from "./AgentReports/TotalTable";
import PlayerTable from "./AgentReports/PlayerTable";
import { CheckCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { allowClick } from "../../assets/style/styleConfig";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { storeTotalRecords } from "../../redux/action/common/action";

const AgentReport = () => {
  const { t } = useTranslation();
  const i18n = (key) => t(`page.reports.playerreport.${key}`);
  const i18n_common = (key) => t(`common.${key}`);

  const [searchParams, setSearchParams] = UseMergeableSearchParams();
  const { create_ts, agentUid } = searchParams;

  const trigger = useSelector((state) => state.trigger);
  const dispatch = useDispatch();

  const [agentList, setAgentList] = useState([]); //api回傳的data第二項為代理列表 ex:cagentReportTotal[1]
  const [agentTotal, setAgentTotal] = useState({}); //此代理的總計算(第一個為總計) ex:cagentReportTotal[0]
  const [directPlayer, setDirectPlayer] = useState([]);
  const [agentTree, setAgentTree] = useState([]);
  const [apiCalling, setApiCalling] = useState(false);
  const [customPagination, setCustomPagination] = useState({
    agent: {},
    player: {},
  });

  useEffect(() => {
    if (apiCalling) {
      message.loading({ content: i18n_common("loading") });
    }
    getAgentReport({
      paramsData: {
        create_ts,
        ...searchParams,
        uid: agentUid,
      },
    })
      .then((res) => {
        setAgentList(res.list[1]);
        setAgentTotal(res.list[0]);
        setAgentTree(res.tree);
      })
      .catch((err) => {
        const data = err.response.data;
      })
      .finally(() => {});

    getPlayerFromAgentReport({
      paramsData: {
        create_ts,
        uid: agentUid,
      },
    })
      .then((res) => {
        setDirectPlayer(res.data.list);
        setCustomPagination({
          ...customPagination,
          player: res.data.pagination,
        });
        // dispatch(storeTotalRecords(res.data.pagination));
      })
      .catch((err) => {
        const data = err.response.data;
      })
      .finally(() => {
        message.destroy();
        setApiCalling(false);
      });
  }, [trigger, agentUid]);

  const tabs = [
    {
      label: i18n("tabs.agentDetailData"),
      key: "1",
      children: (
        <AgentTable
          setApiCalling={setApiCalling}
          apiCalling={apiCalling}
          agentList={agentList}
          agentTotal={agentTotal}
        />
      ),
    },
    // {
    //   label: i18n("tabs.playerDetailData"),
    //   key: "2",
    //   children: (
    //     <PlayerTable
    //       customPagination={customPagination}
    //       directPlayer={directPlayer}
    //     />
    //   ),
    // },
  ];

  const searchDate = useMemo(() => {
    if (!create_ts) return "";
    return create_ts.split(",").map((item, index) => {
      return `${dayjs.unix(item).format("YYYY-MM-DD")} ${
        index === 0 ? "-" : ""
      }`;
    });
  }, [create_ts]);

  return (
    <Wrapper>
      <SearchTool
        columns={[
          {
            title: i18n("col.agent"),
            dataIndex: "cagent",
            key: "cagent",
            search: true,
            ex: "agent01",
          },
          {
            title: i18n("col.nickname"),
            dataIndex: "nick_name",
            key: "nick_name",
            search: true,
            ex: "派對",
          },
          {
            title: i18n("col.playerId"),
            dataIndex: "memId",
            key: "memId",
            search: true,
            ex: "player01",
          },
        ]}
      />
      <TableWrapper>
        <Space direction="vertical">
          <Space>
            <Typography.Title level={3}>{i18n("col.agent")}</Typography.Title>
            <Typography.Title className="!text-blue-500" underline level={4}>
              {agentTotal?.cagent || "-"}
            </Typography.Title>
            <Typography.Title level={5} type="secondary">
              <Space>({searchDate})</Space>
            </Typography.Title>
          </Space>
          <Space>
            <Typography.Text>{i18n("treeText")}：</Typography.Text>
            {agentTree.length > 0 &&
              agentTree.map((agent, index) => {
                return (
                  <>
                    <Typography.Text
                      onClick={() => {
                        setSearchParams({ agentUid: agent.uid });
                      }}
                      className="!text-blue-500 cursor-pointer"
                      underline
                    >
                      {agent.cagent}
                    </Typography.Text>
                    <Typography.Text>
                      {agentTree.length === index + 1 || " > "}
                    </Typography.Text>
                  </>
                );
              })}
          </Space>
        </Space>
        <Divider />
        <StatisticWrapper
          textClassName="!text-blue-900"
          wrapperClassName="!pt-0"
          title={
            <Space>
              <CheckCircleOutlined />
              {i18n("col.statisticalData")}
            </Space>
          }
        >
          <section className="flex justify-end">
            {agentTree.length > 1 && (
              <p
                className={`${allowClick} underline`}
                onClick={() => {
                  const previousUid = agentTree[agentTree.length - 2]?.uid;
                  setSearchParams({ agentUid: previousUid });
                }}
                level={5}
              >
                {i18n("col.backTop")}
              </p>
            )}
          </section>
          <TotalTable agentTotal={agentTotal} />
        </StatisticWrapper>
        <Divider />
        <StatisticWrapper
          textClassName="!text-blue-900"
          wrapperClassName="!pt-0"
          title={
            <Space>
              <CheckCircleOutlined />
              {i18n("col.detailData")}
            </Space>
          }
        >
          <Tabs defaultActiveKey="1" type="card" size={`small`} items={tabs} />
        </StatisticWrapper>
      </TableWrapper>
    </Wrapper>
  );
};

export default AgentReport;
