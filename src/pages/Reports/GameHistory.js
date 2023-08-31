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
import { useSelector } from "react-redux";
import ReportDetail from "./modal/reportDetail";
import dayjs from "dayjs";

const GameHistory = () => {
  const [searchParams, setSearchParams] = UseMergeableSearchParams();
  const { create_ts } = searchParams;

  const { gameId } = useParams();

  const [reportData, setReportData] = useState([]);

  const trigger = useSelector((state) => state.trigger);
  const reportDetailPop = useSelector((state) => state.reportDetailPop);

  useEffect(() => {
    betLogReport({
      paramsData: {
        platform: gameId,
        ...searchParams,
      },
    })
      .then((data) => {
        setReportData(data.data.list);
      })
      .catch((err) => {
        const data = err.response.data;
      })
      .finally(() => {});
  }, [create_ts, trigger]);

  return (
    <Wrapper>
      <SearchTool columns={FilterColumns(gameId)} />
      <TableWrapper>
        <CommonTable
          csvApi={betLogReport}
          csvParams={{ platform: gameId }}
          columns={FilterColumns(gameId)}
          dataSource={reportData}
        />
      </TableWrapper>
      {reportDetailPop && <ReportDetail />}
    </Wrapper>
  );
};

export default GameHistory;
