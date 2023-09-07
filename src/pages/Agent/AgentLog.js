import { useEffect, useState } from "react";
import SearchTool from "../../components/searchTool/searchTool";
import CommonTable from "../../components/table/commonTable";
import { getAgentLog } from "../../api/methods/getApi";
import UseMergeableSearchParams from "../../hooks/useMergeableSearchParams";
import { dateParamFormat } from "../../utils/paramsUtils/dateToArray";
import { filterAgentLevel } from "../../utils/oldUtils/filterAgentLevel";
import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../../components/layout/Wrapper";
import AdvanceComponents from "../../components/searchTool/advanceComponents";
import { relativeFromTime } from "../../utils/getDay";
import {
  apiCalled,
  apiCalling,
  storeTotalRecords,
} from "../../redux/action/common/action";
import { useTranslation } from "react-i18next";

const AgentLog = () => {
  const { t } = useTranslation();
  const i18n = (key) => t(`page.agentinfomation.agentlog.${key}`);
  const i18n_unit = (key) => t(`unit.${key}`);

  const [searchParams, setSearchParams] = UseMergeableSearchParams();
  const { create_ts, current_page, per_page } = searchParams;

  const dispatch = useDispatch();
  const trigger = useSelector((state) => state.trigger);

  const [agentLogData, setAgentLogData] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);
  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    setTableLoading(true);
    if (initialRender) {
      dispatch(apiCalling());
    }

    getAgentLog({
      paramsData: {
        ...searchParams,
      },
    })
      .then((data) => {
        setAgentLogData(data.data.list);
        dispatch(storeTotalRecords(data.data.pagination));
      })
      .catch((err) => {
        const data = err.response.data;
      })
      .finally(() => {
        setTableLoading(false);
        dispatch(apiCalled());
        setInitialRender(false);
      });
  }, [trigger, create_ts, current_page, per_page]);

  const columns = [
    {
      title: i18n("col.number"),
      dataIndex: "uid",
      key: "uid",
    },
    {
      title: i18n("col.agent"),
      key: "agent",
      render: (row) => {
        return filterAgentLevel(row);
      },
      search: true,
      type: "text",
      ex: "agent01",
    },
    {
      title: i18n("col.nickname"),
      dataIndex: "nick_name",
      key: "nick_name",
      search: true,
      type: "text",
      ex: "Godtone",
    },
    {
      title: i18n("col.time"),
      dataIndex: "create_time",
      key: "create_time",
      render: (row) => relativeFromTime(row),
      search: true,
      type: "date",
    },
    {
      title: i18n("col.level"),
      dataIndex: "level",
      key: "level",
      search: true,
      type: "number",
      inputProps: {
        addonAfter: i18n_unit("level"),
      },
      ex: "1",
    },
    {
      title: i18n("col.mobile"),
      dataIndex: "mobile",
      key: "mobile",
      search: true,
      type: "text",
      ex: "0912345678",
    },
    {
      title: i18n("col.email"),
      dataIndex: "email",
      key: "email",
      search: true,
      type: "text",
      ex: "abc@gmail.com",
    },
    {
      title: i18n("col.ip"),
      dataIndex: "ip",
      key: "ip",
      search: true,
      type: "text",
    },
    {
      title: i18n("col.actionType"),
      dataIndex: "action",
      key: "action",
      search: true,
      type: "select",
    },
    {
      title: i18n("col.memo"),
      dataIndex: "memo",
      key: "memo",
      search: true,
      type: "textarea",
    },
  ];
  return (
    <Wrapper>
      <SearchTool columns={columns} />
      <CommonTable
        tableLoading={tableLoading}
        columns={columns}
        dataSource={agentLogData}
      />
    </Wrapper>
  );
};

export default AgentLog;
