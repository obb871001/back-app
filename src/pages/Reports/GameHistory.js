import { Divider } from "antd";
import SearchTool from "../../components/searchTool/searchTool";
import CommonTable from "../../components/table/commonTable";
import { useParams } from "react-router";
import { FilterColumns } from "./GameHistory/utils/filterColumns";
import { useEffect, useState } from "react";
import { betLogReport } from "../../api/methods/getApi";
import UseMergeableSearchParams from "../../hooks/useMergeableSearchParams";
import Wrapper from "../../components/layout/Wrapper";
import TableWrapper from "../../components/layout/TableWrapper";
import { useDispatch, useSelector } from "react-redux";
import ReportDetail from "./modal/reportDetail";
import dayjs from "dayjs";
import CommonPageTitle from "../../components/layout/CommonPageTitle";
import { storeTotalRecords } from "../../redux/action/common/action";

const GameHistory = () => {
  const [searchParams, setSearchParams] = UseMergeableSearchParams();
  const { create_ts, current_page, per_page } = searchParams;

  const { gameId } = useParams();

  const [reportData, setReportData] = useState([]);

  const trigger = useSelector((state) => state.trigger);
  const reportDetailPop = useSelector((state) => state.reportDetailPop);
  const dispatch = useDispatch();

  const [tableLoading, setTableLoading] = useState(false);

  useEffect(() => {
    setTableLoading(true);
    betLogReport({
      paramsData: {
        platform: gameId,
        ...searchParams,
      },
    })
      .then((data) => {
        setReportData(data.data.list);
        dispatch(storeTotalRecords(data.data.pagination));
      })
      .catch((err) => {
        const data = err.response.data;
      })
      .finally(() => {
        setTableLoading(false);
      });
  }, [create_ts, trigger, current_page, per_page]);

  return (
    <>
      <CommonPageTitle pagePath={gameId} />

      <Wrapper>
        <SearchTool columns={FilterColumns(gameId)} />
        <TableWrapper>
          <CommonTable
            tableLoading={tableLoading}
            csvApi={betLogReport}
            csvParams={{ platform: gameId }}
            columns={FilterColumns(gameId)}
            dataSource={reportData}
          />
        </TableWrapper>
        {reportDetailPop && <ReportDetail />}
      </Wrapper>
    </>
  );
};

export default GameHistory;
