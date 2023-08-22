import { useEffect, useState } from "react";
import SearchTool from "../../components/searchTool/searchTool";
import CommonTable from "../../components/table/commonTable";
import { getAgentLog } from "../../api/methods/getApi";
import UseMergeableSearchParams from "../../hooks/useMergeableSearchParams";
import { dateParamFormat } from "../../utils/paramsUtils/dateToArray";
import { filterAgentLevel } from "../../utils/oldUtils/filterAgentLevel";
import { useSelector } from "react-redux";

const AgentLog = () => {
  const [searchParams, setSearchParams] = UseMergeableSearchParams();
  const { createTs } = searchParams;

  const trigger = useSelector((state) => state.trigger);

  const [agentLogData, setAgentLogData] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);

  useEffect(() => {
    setTableLoading(true);
    getAgentLog({
      paramsData: {
        createTs: dateParamFormat(createTs),
      },
    })
      .then((data) => {
        console.log(data);
        setAgentLogData(data);
      })
      .catch((err) => {
        const data = err.response.data;
      })
      .finally(() => {
        setTableLoading(false);
      });
  }, [trigger, createTs]);

  const columns = [
    {
      title: "編號",
      dataIndex: "uid",
      key: "uid",
    },
    {
      title: "代理",
      key: "agent",
      render: (row) => {
        return filterAgentLevel(row);
      },
    },
    {
      title: "暱稱",
      dataIndex: "nickname",
      key: "nickname",
    },
    {
      title: "時間",
      dataIndex: "createDate",
      key: "createDate",
    },
    {
      title: "等級",
      dataIndex: "level",
      key: "level",
    },
    {
      title: "手機",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "IP",
      dataIndex: "ip",
      key: "ip",
    },
    {
      title: "操作類型",
      dataIndex: "action",
      key: "action",
    },
    {
      title: "備忘錄",
      dataIndex: "memo",
      key: "memo",
    },
  ];
  return (
    <>
      <SearchTool />
      <CommonTable
        tableLoading={tableLoading}
        columns={columns}
        dataSource={agentLogData}
      />
    </>
  );
};

export default AgentLog;
