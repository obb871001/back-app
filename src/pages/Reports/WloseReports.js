import { useEffect, useState } from "react";
import SearchTool from "../../components/searchTool/searchTool";
import CommonTable from "../../components/table/commonTable";
import { getWinLoseReports } from "../../api/methods/getApi";
import UseMergeableSearchParams from "../../hooks/useMergeableSearchParams";
import { getToday } from "../../utils/getDay";
import { useSelector } from "react-redux";
import Wrapper from "../../components/layout/Wrapper";
import TableWrapper from "../../components/layout/TableWrapper";
import { useTranslation } from "react-i18next";
import { formatNumber } from "../../utils/formatNumber";
import NumberColumns from "../../components/table/numberColumns";
import CommonPageTitle from "../../components/layout/CommonPageTitle";

const WloseReports = () => {
  const { t } = useTranslation();
  const i18n = (key) => t(`page.reports.winlossReports.${key}`);

  const [searchParams, setSearchParams] = UseMergeableSearchParams();
  const { create_ts } = searchParams;

  const [reportsData, setReportsData] = useState([]);

  const trigger = useSelector((state) => state.trigger);

  useEffect(() => {
    getWinLoseReports({
      paramsData: {
        create_ts,
      },
    })
      .then((res) => {
        console.log(res);
        setReportsData(res.list);
      })
      .catch((err) => {
        const data = err.response.data;
      })
      .finally(() => {});
  }, [trigger, create_ts]);

  const columns = [
    {
      title: i18n("col.gamePlatform"),
      dataIndex: "platform",
      key: "platform",
    },
    {
      title: i18n("col.turnover"),
      align: "right",
      dataIndex: "turnover",
      key: "turnover",
      render: (value) => <NumberColumns number={value} notStyle />,
    },
    {
      title: i18n("col.winloss"),
      align: "right",
      dataIndex: "winAmount",
      key: "winAmount",
      render: (value) => <NumberColumns number={value} />,
    },
    {
      title: i18n("col.jackpotBet"),
      align: "right",
      dataIndex: "jpbet",
      key: "jpbet",
      render: (value) => <NumberColumns number={value} notStyle />,
    },
    {
      title: i18n("col.jackpotWinloss"),
      align: "right",
      dataIndex: "jpwin",
      key: "jpwin",
      render: (value) => <NumberColumns number={value} />,
    },
  ];
  return (
    <>
      <CommonPageTitle pagePath="winlossreport" />

      <Wrapper>
        <SearchTool />
        <TableWrapper>
          <CommonTable
            dataSource={reportsData}
            columns={columns}
            tableProps={{ title: i18n("col.title") }}
          />
        </TableWrapper>
      </Wrapper>
    </>
  );
};

export default WloseReports;
