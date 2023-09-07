import React, { useEffect, useState } from "react";
import { ProTable } from "@ant-design/pro-components";
import { Tag, notification } from "antd";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { SettingTwoTone } from "@ant-design/icons";

import SearchTool from "../../components/searchTool/searchTool";
import CommonTable from "../../components/table/commonTable";
import CreatePlayer from "./PlayerSearch/modal/createPlayer";
import { getMemberList } from "../../api/methods/getApi";
import UseMergeableSearchParams from "../../hooks/useMergeableSearchParams";
import DetailPlayer from "./PlayerSearch/modal/detailPlayer";
import Wrapper from "../../components/layout/Wrapper";
import TableWrapper from "../../components/layout/TableWrapper";
import ActionCol from "../../components/tableColumns/actionCol";
import {
  apiCalled,
  apiCalling,
  storeDetail,
  storeTotalRecords,
} from "../../redux/action/common/action";
import { filterAgentLevel } from "../../utils/oldUtils/filterAgentLevel";
import AdvanceComponents from "../../components/searchTool/advanceComponents";
import { relativeFromTime } from "../../utils/getDay";
import CreateButton from "../../components/button/createButton";
import EditAuthColumns from "../../utils/EditAuthColumns";
import { allowClick } from "../../assets/style/styleConfig";
import { formatNumber } from "../../utils/formatNumber";
import NavigatePlayer from "../../components/table/navigatePlayer";
import NumberColumns from "../../components/table/numberColumns";
import { useTranslation } from "react-i18next";
import { color } from "../Agent/AgentList/utils/statusCodeColor";

const PlayerSearch = () => {
  const { t } = useTranslation();
  const i18n = (key) => t(`page.admin.playersearch.${key}`);
  const i18n_statusCode = (key) => t(`status_code.${key}`);

  const [searchParams, setSearchParams] = UseMergeableSearchParams();
  const { current_page, per_page } = searchParams;

  const navigate = useNavigate();

  const [playerList, setPlayerList] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);
  const [initialRender, setInitialRender] = useState(true);

  const dispatch = useDispatch();
  const trigger = useSelector((state) => state.trigger);
  const CURRENCY = useSelector((state) => state.CURRENCY);
  const agentNameList = useSelector((state) => state.agentNameList);
  const statusCode = useSelector((state) => state.basicConfig.statusCode);

  useEffect(() => {
    setTableLoading(true);
    if (initialRender) {
      dispatch(apiCalling());
    }
    getMemberList({
      paramsData: {
        ...searchParams,
      },
    })
      .then((data) => {
        setPlayerList(data.data.list);
        dispatch(storeTotalRecords(data.data.pagination));
      })
      .catch((err) => {
        const data = err.response.data;
      })
      .finally(() => {
        setTableLoading(false);
        setInitialRender(false);
        dispatch(apiCalled());
      });
  }, [current_page, per_page, trigger]);

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
      title: i18n("col.agent"),
      key: "cagent",
      render: (row) => filterAgentLevel(row),
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
        return <NavigatePlayer uid={value.uid} player={row} />;
      },
    },
    {
      title: i18n("col.accountBalance"),
      dataIndex: "balance",
      key: "balance",
      render: (row) => `${formatNumber(row)}${CURRENCY}`,
      search: true,
      type: "number",
      inputProps: {
        addonAfter: CURRENCY,
      },
      ex: "20",
      render: (row, value) => (
        <span
          onClick={() => {
            navigate(`detail?commonUid=${value.uid}`);
          }}
          className={`${allowClick} cursor-pointer underline font-bold`}
        >
          {CURRENCY}
          {formatNumber(row)}
        </span>
      ),
    },

    {
      title: i18n("col.mobile"),
      dataIndex: "mobile",
      key: "mobile",
      search: true,
      type: "text",
      ex: "0912345678",
      columnsHidden: true,
    },
    {
      title: i18n("col.email"),
      dataIndex: "email",
      key: "email",
      search: true,
      type: "text",
      ex: "abc@gamil.com",
      columnsHidden: true,
    },
    {
      title: i18n("col.truename"),
      dataIndex: "true_name",
      key: "true_name",
      search: true,
      type: "text",
      ex: "Chang Chia-Hang",
    },

    {
      title: i18n("col.registerDate"),
      dataIndex: "create_time",
      key: "create_time",
      render: (row) => relativeFromTime(row),
      search: true,
      type: "date",
      ex: "1998-10-01",
    },
    {
      title: i18n("col.country"),
      dataIndex: "country",
      key: "country",
      search: true,
      type: "text",
      ex: "Phlippines",
    },
    {
      title: i18n("col.accountStatus"),
      dataIndex: "status",
      key: "status",
      render: (value, row) => {
        return <Tag color={color(value)}>{i18n_statusCode(`${value}`)}</Tag>;
      },
      search: true,
      type: "select",
      selectProps: {
        options: statusCode?.map((code) => {
          return {
            label: i18n_statusCode(`${code}`),
            value: code,
          };
        }),
      },
    },

    {
      title: i18n("col.action"),
      key: "action",
      render: (row) => {
        return (
          <ActionCol
            callApi={() => {
              getMemberList({
                paramsData: { uid: row.uid },
              }).then((res) => {
                dispatch(storeDetail(res.data.list[0]));
              });
            }}
            apiUid={row.uid}
            openDetail
          />
        );
      },
    },
  ];

  return (
    <Wrapper>
      <SearchTool columns={columns} />
      <TableWrapper>
        <EditAuthColumns>
          <CreateButton type={i18n("create")} />
        </EditAuthColumns>
        <CommonTable
          csvApi={getMemberList}
          dataSource={playerList}
          columns={columns}
          tableLoading={tableLoading}
        />
      </TableWrapper>
    </Wrapper>
  );
};

export default PlayerSearch;
