import { useEffect, useState } from "react";
import Wrapper from "../../components/layout/Wrapper";
import SearchTool from "../../components/searchTool/searchTool";
import CommonTable from "../../components/table/commonTable";
import { getMemberLog } from "../../api/methods/getApi";
import UseMergeableSearchParams from "../../hooks/useMergeableSearchParams";
import { dateParamFormat } from "../../utils/paramsUtils/dateToArray";
import TableWrapper from "../../components/layout/TableWrapper";
import { useDispatch, useSelector } from "react-redux";
import {
  apiCalled,
  apiCalling,
  storeTotalRecords,
} from "../../redux/action/common/action";
import { useTranslation } from "react-i18next";

const PlayerLog = () => {
  const { t } = useTranslation();
  const i18n = (key) => t(`page.admin.memberlog.${key}`);
  const i18n_unit = (key) => t(`unit.${key}`);

  const [searchParams, setSearchParams] = UseMergeableSearchParams();
  const { create_ts, current_page, per_page } = searchParams;

  const dispatch = useDispatch();
  const trigger = useSelector((state) => state.trigger);

  const [tableLoading, setTableLoading] = useState(false);
  const [playerLogData, setPlayerLogData] = useState([]);
  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    setTableLoading(true);
    if (initialRender) {
      dispatch(apiCalling());
    }
    getMemberLog({
      paramsData: {
        ...searchParams,
      },
    })
      .then((data) => {
        setPlayerLogData(data.data.list);
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
  }, [create_ts, current_page, per_page, trigger]);

  const columns = [
    {
      title: i18n("col.number"),
      dataIndex: "uid",
      key: "uid",
    },
    {
      title: i18n("col.playerId"),
      dataIndex: "memId",
      key: "memId",
      search: true,
      type: "text",
      ex: "player001",
    },
    {
      title: i18n("col.belongAgent"),
      dataIndex: "cagent_belong",
      key: "cagent_belong",
      search: true,
      type: "text",
      ex: "agent01",
    },
    {
      title: i18n("col.agentLevel"),
      dataIndex: "cagent_level",
      key: "cagent_level",
      search: true,
      type: "number",
      ex: "1",
      addonAfter: i18n_unit("level"),
    },
    {
      title: i18n("col.country"),
      dataIndex: "country",
      key: "country",
      search: true,
      type: "text",
      ex: "Philippines",
    },

    {
      title: i18n("col.device"),
      dataIndex: "device",
      key: "device",
      search: true,
      type: "text",
      ex: "Mobile",
    },
    {
      title: i18n("col.domain"),
      dataIndex: "domain",
      key: "domain",
      search: true,
      type: "text",
      ex: "https://www.google.com",
    },
    {
      title: i18n("col.ip"),
      dataIndex: "ip",
      key: "ip",
      search: true,
      type: "text",
      ex: "127.0.0.1",
    },

    {
      title: i18n("col.createTime"),
      dataIndex: "create_time",
      key: "create_time",
      search: true,
      type: "date",
    },
  ];
  return (
    <Wrapper>
      <SearchTool columns={columns} />
      <TableWrapper>
        <CommonTable
          csvApi={getMemberLog}
          tableLoading={tableLoading}
          columns={columns}
          dataSource={playerLogData}
        />
      </TableWrapper>
    </Wrapper>
  );
};

export default PlayerLog;
