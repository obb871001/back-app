import { useEffect, useState } from "react";
import SearchTool from "../../components/searchTool/searchTool";
import CommonTable from "../../components/table/commonTable";
import { getWinLoseReports } from "../../api/methods/getApi";
import UseMergeableSearchParams from "../../hooks/useMergeableSearchParams";
import { getToday } from "../../utils/getDay";

const WloseReports = () => {
  const [searchParams, setSearchParams] = UseMergeableSearchParams();
  const { std = getToday(), etd = getToday() } = searchParams;

  const [reportsData, setReportsData] = useState([]);

  useEffect(() => {
    getWinLoseReports({
      std: std,
      etd: etd,
    })
      .then((res) => {
        console.log(res);
        setReportsData(res.list);
      })
      .catch((err) => {
        const data = err.response.data;
      })
      .finally(() => {});
  }, []);

  const columns = [
    {
      title: "原廠",
      dataIndex: "platform",
      key: "platform",
    },
    {
      title: "投注量",
      align: "right",
      dataIndex: "turnover",
      key: "turnover",
    },
    {
      title: "輸/贏",
      align: "right",
      dataIndex: "winAmount",
      key: "winAmount",
    },
    {
      title: "Jackpot 下注",
      align: "right",
      dataIndex: "jpbet",
      key: "jpbet",
    },
    {
      title: "Jackpot 輸贏",
      align: "right",
      dataIndex: "jpwin",
      key: "jpwin",
    },
  ];
  return (
    <>
      <SearchTool />
      <CommonTable
        dataSource={reportsData}
        columns={columns}
        tableProps={{ title: "輸贏報表" }}
      />
    </>
  );
};

export default WloseReports;
