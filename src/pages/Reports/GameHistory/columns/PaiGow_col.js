import { useNavigate } from "react-router";
import { allowClick } from "../../../../assets/style/styleConfig";
import NavigatePlayer from "../../../../components/table/navigatePlayer";
import NumberColumns from "../../../../components/table/numberColumns";
import { relativeFromTime } from "../../../../utils/getDay";
import NavigateDetail from "../../../../components/table/navigateDetail";
import handleDetail from "../utils/paigow/handleDetail";
import RelativeTimeCol from "../../../../components/tableColumns/relativeTimeCol";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function PaiGowColumns() {
  const navigate = useNavigate();

  const nowTime = useSelector((state) => state.nowTime);
  const CURRENCY = useSelector((state) => state.CURRENCY);

  return [
    {
      title: "編號",
      dataIndex: "uid",
      key: "uid",
    },
    {
      title: "玩家",
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
      title: "交易時間",
      dataIndex: "create_time",
      key: "create_time",
      render: (row) => {
        return <RelativeTimeCol now={nowTime} timeStr={row} />;
      },
      search: true,
      type: "date",
    },

    {
      title: "訂單號",
      dataIndex: "hash",
      key: "hash",
      columnsHidden: true,
      search: true,
      type: "text",
    },
    {
      title: "局號",
      dataIndex: "round_id",
      key: "round_id",
      columnsHidden: true,
      search: true,
      type: "text",
    },

    {
      title: "投注金額",
      dataIndex: "bet",
      key: "bet",
      render: (row) => {
        return <NumberColumns notStyle number={row} />;
      },
      search: true,
      type: "number",
      inputProps: {
        addonAfter: CURRENCY,
      },
    },
    {
      title: "贏/輸",
      dataIndex: "net_win",
      key: "net_win",
      render: (row) => {
        return <NumberColumns number={row} />;
      },
      search: true,
      type: "number",
      inputProps: {
        addonAfter: CURRENCY,
      },
    },
    {
      title: "投注時間",
      dataIndex: "bet_ts",
      key: "bet_ts",
      columnsHidden: true,
      render: (row) => {
        return relativeFromTime(row);
      },
      search: true,
      type: "date",
    },
    {
      title: "派彩時間",
      dataIndex: "win_ts",
      key: "win_ts",
      columnsHidden: true,
      render: (row) => {
        return relativeFromTime(row);
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
              return "結算";
            case 2:
              return "取消";
            default:
              return "錯誤";
          }
        };
        return (
          <NavigateDetail
            props={{
              hash: row.hash,
              round_id: row.round_id,
              create_time: row.create_time,
              bet_ts: row.bet_ts,
              win_ts: row.win_ts,
              bet: row.bet,
              win: row.win,
              net_win: row.net_win,
              after_balance: row.after_balance,
              memId: row.memId,
              roundcode: roundCode(row.round_code),
              detail: handleDetail(row.extra),
            }}
          />
        );
      },
    },
  ];
}
