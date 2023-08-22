import { useEffect, useState } from "react";

import SearchTool from "../../components/searchTool/searchTool";
import CommonTable from "../../components/table/commonTable";
import UseMergeableSearchParams from "../../hooks/useMergeableSearchParams";
import { getToday } from "../../utils/getDay";
import {
  getAgentReport,
  getPlayerFromAgentReport,
} from "../../api/methods/getApi";
import { Divider } from "antd";
import { ProTable } from "@ant-design/pro-components";

const AgentReport = () => {
  const [searchParams, setSearchParams] = UseMergeableSearchParams();
  const { std = getToday(), etd = getToday() } = searchParams;

  const [agentList, setAgentList] = useState([]); //api回傳的data第二項為代理列表 ex:cagentReportTotal[1]
  const [agentTotal, setAgentTotal] = useState({}); //此代理的總計算(第一個為總計) ex:cagentReportTotal[0]
  const [directPlayer, setDirectPlayer] = useState([]);

  useEffect(() => {
    getAgentReport({
      std: std,
      etd: etd,
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
      std: std,
      etd: etd,
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

  const agentColumns = [
    {
      title: "編號",
      dataIndex: "uid",
    },
    {
      title: "代理名稱/暱稱",
      render: (row) => {
        return `${row.cagent}/${row.nickname}`;
      },
    },
    {
      title: "登入名稱",
      dataIndex: "loginname",
    },
    {
      title: "有效投注額",
      dataIndex: "validTurnover",
      align: "right",
    },
    {
      title: "玩家輸贏",
      dataIndex: "member",
      align: "right",
    },
    {
      title: "下線代理輸贏",
      dataIndex: "downline",
      align: "right",
    },
    {
      title: "自身輸贏",
      dataIndex: "self",
      align: "right",
    },
    {
      title: "公司抽成",
      dataIndex: "company",
      align: "right",
    },
  ];

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
      title: "有效投注額",
      dataIndex: "validTurnover",
      align: "right",
    },
    {
      title: "玩家輸贏",
      dataIndex: "member",
      align: "right",
    },
    {
      title: "Jackpot輸贏",
      dataIndex: "jackpot",
      align: "right",
    },
  ];

  return (
    <>
      <SearchTool />
      <CommonTable
        dataSource={agentList}
        columns={agentColumns}
        tableProps={{ title: "代理報表" }}
        summary={(pageData) => {
          const { validTurnover, member, downline, self, company } = agentTotal;
          return (
            <>
              <ProTable.Summary.Row>
                <ProTable.Summary.Cell index={0}>總計</ProTable.Summary.Cell>
                <ProTable.Summary.Cell index={1}></ProTable.Summary.Cell>
                <ProTable.Summary.Cell index={2}></ProTable.Summary.Cell>
                <ProTable.Summary.Cell align="right" index={3}>
                  {validTurnover}
                </ProTable.Summary.Cell>
                <ProTable.Summary.Cell align="right" index={4}>
                  {member}
                </ProTable.Summary.Cell>
                <ProTable.Summary.Cell align="right" index={5}>
                  {downline}
                </ProTable.Summary.Cell>
                <ProTable.Summary.Cell align="right" index={6}>
                  {self}
                </ProTable.Summary.Cell>
                <ProTable.Summary.Cell align="right" index={7}>
                  {company}
                </ProTable.Summary.Cell>
              </ProTable.Summary.Row>
            </>
          );
        }}
      />
      <Divider />
      <CommonTable
        dataSource={directPlayer}
        columns={playerColumns}
        tableProps={{ title: "代理玩家報表" }}
      />
    </>
  );
};

export default AgentReport;
