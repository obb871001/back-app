import { useEffect, useMemo, useState } from "react";

import SearchTool from "../../components/searchTool/searchTool";
import CommonTable from "../../components/table/commonTable";
import UseMergeableSearchParams from "../../hooks/useMergeableSearchParams";
import { getToday } from "../../utils/getDay";
import {
  getAgentReport,
  getPlayerFromAgentReport,
} from "../../api/methods/getApi";
import { Alert, Divider, Space, Tabs, message } from "antd";
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
import AgentTree from "../Agent/components/agentTree";
import PriorityTip from "../../components/searchTool/priorityTip";
import QuestionHint from "../../components/hint/QuestionHint";
import CommonPageTitle from "../../components/layout/CommonPageTitle";

const AgentReport = () => {
  const { t } = useTranslation();
  const i18n = (key) => t(`page.reports.playerreport.${key}`);
  const i18n_common = (key) => t(`common.${key}`);
  const i18n_cagent_level = (key) => t(`cagent_level.${key}`);

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
  const [totalStatistics, setTotalStatistics] = useState({
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
        ...(agentUid && { tree_uid: agentUid }),
      },
    })
      .then((res) => {
        setAgentList(res.cagent.list[1]);
        setAgentTotal(res.cagent.list[0]);
        setAgentTree(res.tree);

        setDirectPlayer(res.direct.list);
        setCustomPagination({
          ...customPagination,
          player: res.direct.pagination,
        });
        setTotalStatistics({
          agent: res.cagent.total,
          player: res.direct.total,
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        message.destroy();
        setApiCalling(false);
      });
  }, [trigger, agentUid, create_ts]);

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
          totalStatistics={totalStatistics}
        />
      ),
    },
    {
      label: i18n("tabs.playerDetailData"),
      key: "2",
      children: (
        <PlayerTable
          customPagination={customPagination}
          directPlayer={directPlayer}
          totalStatistics={totalStatistics}
        />
      ),
    },
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
    <>
      <CommonPageTitle pagePath="playerreport" />

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
          priorityList={[
            i18n("treeText"),
            i18n("col.playerId"),
            i18n("col.agent"),
          ]}
        />

        <TableWrapper className="m-[10px]">
          <Space direction="vertical">
            <Space>
              <Typography.Title className="!mt-[0px]" level={3}>
                {i18n_cagent_level(agentTotal.level || "0")}{" "}
                <QuestionHint
                  iconClassName="!text-xl"
                  title={i18n("col.updateHint")}
                />
              </Typography.Title>

              <Typography.Title
                className="!text-blue-500 !mt-[0px]"
                underline
                level={4}
              >
                {agentTotal?.cagent || "-"}
              </Typography.Title>
              <Typography.Title
                className="!mt-[0px]"
                level={5}
                type="secondary"
              >
                <Space>({searchDate})</Space>
              </Typography.Title>
            </Space>
          </Space>
          <section className="flex justify-between items-center">
            <AgentTree agentTree={agentTree} />
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
          <Divider />
          <StatisticWrapper
            textClassName="!text-blue-900"
            wrapperClassName="md:p-[30px] p-[5px]"
            title={
              <Space>
                <CheckCircleOutlined />
                {i18n("col.statisticalData")}
              </Space>
            }
          >
            <TotalTable agentTotal={agentTotal} />
          </StatisticWrapper>
          <Divider />
          <StatisticWrapper
            textClassName="!text-blue-900"
            wrapperClassName="md:p-[30px] p-[5px]"
            title={
              <Space>
                <CheckCircleOutlined />
                {i18n("col.detailData")}
              </Space>
            }
          >
            <Tabs
              defaultActiveKey="1"
              type="card"
              size={`small`}
              items={tabs}
            />
          </StatisticWrapper>
        </TableWrapper>
      </Wrapper>
    </>
  );
};

export default AgentReport;
