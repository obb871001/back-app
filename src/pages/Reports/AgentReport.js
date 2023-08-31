import { useEffect, useMemo, useState } from "react";

import SearchTool from "../../components/searchTool/searchTool";
import CommonTable from "../../components/table/commonTable";
import UseMergeableSearchParams from "../../hooks/useMergeableSearchParams";
import { getToday } from "../../utils/getDay";
import {
  getAgentReport,
  getPlayerFromAgentReport,
} from "../../api/methods/getApi";
import { Divider, Space, Tabs } from "antd";
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

const AgentReport = () => {
  const [searchParams, setSearchParams] = UseMergeableSearchParams();
  const { create_ts } = searchParams;

  const [agentList, setAgentList] = useState([]); //api回傳的data第二項為代理列表 ex:cagentReportTotal[1]
  const [agentTotal, setAgentTotal] = useState({}); //此代理的總計算(第一個為總計) ex:cagentReportTotal[0]
  const [directPlayer, setDirectPlayer] = useState([]);

  useEffect(() => {
    getAgentReport({
      paramsData: {
        create_ts,
      },
    })
      .then((res) => {
        console.log(res);
        setAgentList(res.cagentReportList[1]);
        setAgentTotal(res.cagentReportList[0]);
      })
      .catch((err) => {
        const data = err.response.data;
      })
      .finally(() => {});

    getPlayerFromAgentReport({
      paramsData: {
        create_ts,
      },
    })
      .then((res) => {
        console.log(res);
        setDirectPlayer(res.data.list);
      })
      .catch((err) => {
        const data = err.response.data;
      })
      .finally(() => {});
  }, []);

  const tabs = [
    {
      label: "代理詳細資料",
      key: "1",
      children: <AgentTable agentList={agentList} agentTotal={agentTotal} />,
    },
    {
      label: "玩家詳細資料",
      key: "2",
      children: <PlayerTable directPlayer={directPlayer} />,
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
    <Wrapper>
      <SearchTool />
      <TableWrapper>
        <Space>
          <Typography.Title level={3}>代理</Typography.Title>
          <Typography.Title className="!text-blue-500" underline level={4}>
            gi_admin
          </Typography.Title>
          <Typography.Title level={5} type="secondary">
            <Space>({searchDate})</Space>
          </Typography.Title>
        </Space>
        <Divider />
        <StatisticWrapper
          textClassName="!text-blue-900"
          title={
            <Space>
              <CheckCircleOutlined />
              統計資料
            </Space>
          }
        >
          <section className="flex justify-end">
            <p className={`${allowClick} underline  `} level={5}>
              返回上層
            </p>
          </section>
          <TotalTable />
        </StatisticWrapper>
        <Divider />
        <StatisticWrapper
          textClassName="!text-blue-900"
          title={
            <Space>
              <CheckCircleOutlined />
              詳細資料
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
