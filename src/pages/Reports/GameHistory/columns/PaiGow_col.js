import { useNavigate } from "react-router";
import { allowClick } from "../../../../assets/style/styleConfig";
import NavigatePlayer from "../../../../components/table/navigatePlayer";
import NumberColumns from "../../../../components/table/numberColumns";
import { relativeFromTime, unixFormat } from "../../../../utils/getDay";
import NavigateDetail from "../../../../components/table/navigateDetail";
import handleDetail from "../utils/paigow/handleDetail";
import RelativeTimeCol from "../../../../components/tableColumns/relativeTimeCol";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export default function PaiGowColumns() {
  const { t } = useTranslation();
  const i18n = (key) => t(`page.reports.gamehistory.${key}`);

  const navigate = useNavigate();

  const nowTime = useSelector((state) => state.nowTime);
  const CURRENCY = useSelector((state) => state.CURRENCY);
  const agentNameList = useSelector((state) => state.agentNameList);

  return [
    {
      title: i18n("col.number"),
      dataIndex: "uid",
      key: "uid",
    },
    {
      title: i18n("col.belongAgent"),
      dataIndex: "cagent_belong",
      key: "cagent_belong",
      search: true,
      type: "autoComplete",
      autoCompleteProps: {
        options: agentNameList.map((item) => {
          return { value: item };
        }),
      },

      ex: "agent01",
    },

    {
      title: i18n("col.playerId"),
      dataIndex: "memId",
      key: "memId",
      render: (row, value) => {
        return <NavigatePlayer uid={value.member_info_uid} player={row} />;
      },
      search: true,
      type: "text",
      ex: "player01",
    },
    {
      title: i18n("col.transactionTime"),
      dataIndex: "betTime",
      key: "betTime",
      render: (row) => {
        return <RelativeTimeCol now={nowTime} timeStr={row} unix />;
      },
      search: true,
      type: "date",
    },

    {
      title: i18n("col.orderNumber"),
      dataIndex: "hash",
      key: "hash",
      search: true,
      type: "text",
    },
    {
      title: i18n("col.roundId"),
      dataIndex: "roundId",
      key: "roundId",
      columnsHidden: true,
      search: true,
      type: "text",
    },

    {
      title: i18n("col.betAmounts"),
      dataIndex: "bet",
      key: "bet",
      render: (row) => {
        return <NumberColumns notStyle number={row} />;
      },
      search: true,
      type: "rangeNumber",
    },
    {
      title: i18n("col.payout"),
      dataIndex: "win",
      key: "win",
      render: (row) => {
        return <NumberColumns notStyle number={row} />;
      },
      search: true,
      type: "rangeNumber",
    },

    {
      title: i18n("col.winloss"),
      dataIndex: "netWin",
      key: "netWin",
      render: (row) => {
        return <NumberColumns number={row} />;
      },
      search: true,
      type: "rangeNumber",
    },
    {
      title: i18n("col.payoutTime"),
      dataIndex: "winTime",
      key: "winTime",
      render: (row) => {
        return unixFormat(row);
      },
      search: true,
      type: "date",
    },
    {
      title: "",
      key: "detail",
      render: (row) => {
        const roundCode = (code) => {
          switch (code) {
            case 1:
              return i18n("result.settled");
            case 2:
              return i18n("result.cancel");
            default:
              return i18n("result.error");
          }
        };
        const betType = (code) => {
          switch (code) {
            case 0:
              return i18n("result.nonGambling");
            case 1:
              return i18n("result.banker");
            case 2:
              return i18n("result.player");
            default:
              return i18n("result.error");
          }
        };
        return (
          <NavigateDetail
            props={{
              hash: row.hash,
              round_id: row.roundId,
              create_time: row.betTime,
              player_id: row.playerId,
              bet_ts: row.betTime,
              win_ts: row.winTime,
              bet: row.bet,
              win: row.win,
              net_win: row.net_win,
              before_balance: row.beforeBalance,
              after_balance: row.afterBalance,
              memId: row.memId,
              roundcode: roundCode(row.roundCode),
              detail: [
                { label: i18n("col.betType"), value: betType(row.betType) },
                ...handleDetail(row.extra),
              ],
            }}
          />
        );
      },
    },
  ];
}
