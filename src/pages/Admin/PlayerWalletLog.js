import React, { useEffect, useState } from "react";
import Wrapper from "../../components/layout/Wrapper";
import SearchTool from "../../components/searchTool/searchTool";
import TableWrapper from "../../components/layout/TableWrapper";
import CommonTable from "../../components/table/commonTable";
import { getMemberWalletLog } from "../../api/methods/getApi";
import UseMergeableSearchParams from "../../hooks/useMergeableSearchParams";
import { useDispatch, useSelector } from "react-redux";
import {
  apiCalled,
  apiCalling,
  storeTotalRecords,
} from "../../redux/action/common/action";
import NavigatePlayer from "../../components/table/navigatePlayer";
import RelativeTimeCol from "../../components/tableColumns/relativeTimeCol";
import { useTranslation } from "react-i18next";
import NumberColumns from "../../components/table/numberColumns";
import NavigateDetail from "../../components/table/navigateDetail";
import WalletDetail from "./modal/walletDetail";
import CommonPageTitle from "../../components/layout/CommonPageTitle";
import { formatNumber } from "../../utils/formatNumber";

const PlayerWalletLog = () => {
  const { t } = useTranslation();
  const i18n = (key) => t(`page.admin.memberwalletlog.${key}`);
  const i18n_actionCode = (key) => t(`action_code.${key}`);
  const i18n_ex = (key) => t(`ex.${key}`);

  const [searchParams, setSearchParams] = UseMergeableSearchParams();
  const { create_ts, current_page, per_page } = searchParams;

  const trigger = useSelector((state) => state.trigger);
  const nowTime = useSelector((state) => state.nowTime);
  const reportDetailPop = useSelector((state) => state.reportDetailPop);
  const basicConfig = useSelector((state) => state.basicConfig);
  const agentNameList = useSelector((state) => state.agentNameList);
  const CURRENCY = useSelector((state) => state.currency);
  const dispatch = useDispatch();

  const [tableLoading, setTableLoading] = useState(false);
  const [playerWalletLog, setPlayerWalletLog] = useState([]);
  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    setTableLoading(true);
    if (initialRender) {
      dispatch(apiCalling());
    }
    getMemberWalletLog({
      paramsData: { ...searchParams },
    })
      .then((data) => {
        setPlayerWalletLog(data.data.list);
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
  }, [current_page, per_page, trigger, create_ts]);

  const columns = [
    {
      title: i18n("col.number"),
      dataIndex: "uid",
      key: "uid",
      width: 50,
      search: true,
      type: "number",
      ex: "1",
    },
    {
      title: i18n("col.executeAgent"),
      dataIndex: "execute",
      key: "execute",
      width: 200,
      search: true,
      type: "autoComplete",
      autoCompleteProps: {
        options: agentNameList?.map((item) => {
          return { value: item };
        }),
      },
      ex: "agent01",
    },

    {
      title: i18n("col.playerId"),
      dataIndex: "memId",
      key: "memId",
      search: true,
      type: "text",
      ex: "player01",
      render: (row, value) => {
        return <NavigatePlayer uid={value.member_info_uid} player={row} />;
      },
    },
    {
      title: i18n("col.transactionTime"),
      dataIndex: "create_time",
      key: "create_ts",
      render: (row) => {
        return <RelativeTimeCol now={nowTime} timeStr={row} />;
      },
      search: false,
      type: "date",
    },
    {
      title: i18n("col.type"),
      dataIndex: "action_code",
      key: "action_code",
      render: (row) => {
        return i18n_actionCode(`${row}`);
      },
      csvTurn: true,
      search: true,
      type: "select",
      selectProps: {
        options: basicConfig?.actionCode?.map((action) => {
          return {
            label: i18n_actionCode(`${action}`),
            value: action,
          };
        }),
      },
      ex: i18n_ex("export_points"),
    },
    {
      title: i18n("col.game"),
      dataIndex: "wallet_name",
      key: "wallet_name",
      search: true,
      type: "text",
      ex: "PAIGOW",
    },
    {
      title: i18n("col.amounts"),
      dataIndex: `mem_${basicConfig.wallet_type}_wallet_trans`,
      key: `mem_${basicConfig.wallet_type}_wallet_trans`,
      render: (row) => {
        return <NumberColumns number={row} />;
      },
      csvRender: (row) => {
        return `${formatNumber(row)} ${CURRENCY}`;
      },
      csvTurn: true,
      search: true,
      type: "rangeNumber",
      ex: "1",
    },
    {
      title: i18n("col.playerBalance"),
      dataIndex: `mem_${basicConfig.wallet_type}_wallet_after`,
      key: `mem_${basicConfig.wallet_type}_wallet_after`,
      render: (row) => {
        return <NumberColumns notStyle number={row} />;
      },
      csvRender: (row) => {
        return `${formatNumber(row)} ${CURRENCY}`;
      },
      csvTurn: true,
      search: true,
      type: "rangeNumber",
      ex: "1",
    },
    {
      title: i18n("col.agentMemo"),
      dataIndex: "cagent_memo",
      key: "cagent_memo",
      search: true,
      type: "text",
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
      <CommonPageTitle pagePath="memberwalletlog" />
      <Wrapper>
        <SearchTool columns={columns} />
        <TableWrapper>
          <CommonTable
            csvApi={getMemberWalletLog}
            tableLoading={tableLoading}
            columns={columns}
            dataSource={playerWalletLog}
          />
        </TableWrapper>
        {reportDetailPop && <WalletDetail />}
      </Wrapper>
    </>
  );
};

export default PlayerWalletLog;
