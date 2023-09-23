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
import TableWrapper from "../../components/layout/TableWrapper";
import { Popover, Tooltip } from "antd";
import { allowClick } from "../../assets/style/styleConfig";
import DetailModal from "./modal/detailModal";
import NavigateDetail from "../../components/table/navigateDetail";
import CommonPageTitle from "../../components/layout/CommonPageTitle";

const AgentLog = () => {
  const { t } = useTranslation();
  const i18n = (key) => t(`page.agentinfomation.agentlog.${key}`);
  const i18n_unit = (key) => t(`unit.${key}`);
  const i18n_actionCode = (key) => t(`action_code.${key}`);

  const [searchParams, setSearchParams] = UseMergeableSearchParams();
  const { create_ts, current_page, per_page } = searchParams;

  const dispatch = useDispatch();
  const trigger = useSelector((state) => state.trigger);
  const basicConfig = useSelector((state) => state.basicConfig);
  const reportDetailPop = useSelector((state) => state.reportDetailPop);

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
      dataIndex: "cagent",
      key: "cagent",
      search: true,
      type: "text",
      ex: "agent01",
    },
    {
      title: i18n("col.time"),
      dataIndex: "create_time",
      key: "create_ts",
      render: (row) => relativeFromTime(row),
      search: false,
      type: "date",
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
      dataIndex: "action_code",
      key: "action_code",
      render: (row) => {
        return i18n_actionCode(row);
      },
      search: true,
      selectProps: {
        options: basicConfig?.actionCode?.map((action) => {
          return {
            label: i18n_actionCode(`${action}`),
            value: action,
          };
        }),
      },

      type: "select",
    },
    {
      title: i18n("col.memo"),
      dataIndex: "cagent_memo",
      key: "cagent_memo",
      search: true,
      type: "textarea",
    },
    {
      title: "",
      key: "detail",
      render: (row) => {
        return <NavigateDetail props={row} />;
      },
    },
  ];
  return (
    <>
      <CommonPageTitle pagePath="agentlog" />
      <Wrapper>
        <SearchTool columns={columns} />
        <TableWrapper>
          <CommonTable
            tableLoading={tableLoading}
            columns={columns}
            dataSource={agentLogData}
          />
        </TableWrapper>
        {reportDetailPop && <DetailModal />}
      </Wrapper>
    </>
  );
};

export default AgentLog;
