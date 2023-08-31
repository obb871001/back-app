import React, { useEffect, useState } from "react";
import { ProTable } from "@ant-design/pro-components";
import { notification } from "antd";
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

const PlayerSearch = () => {
  const [searchParams, setSearchParams] = UseMergeableSearchParams();
  const { current_page, per_page } = searchParams;

  const navigate = useNavigate();

  const [playerList, setPlayerList] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);
  const [initialRender, setInitialRender] = useState(true);

  const dispatch = useDispatch();
  const trigger = useSelector((state) => state.trigger);
  const CURRENCY = useSelector((state) => state.CURRENCY);

  useEffect(() => {
    setTableLoading(true);
    if (initialRender) {
      dispatch(apiCalling());
    }
    getMemberList({
      searchData: {
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
      title: "編號",
      dataIndex: "uid",
      key: "uid",
      width: 50,
      search: true,
      type: "number",
      ex: "1",
    },
    {
      title: "代理上線",
      key: "cagent",
      render: (row) => filterAgentLevel(row),
      search: true,
      type: "text",
      ex: "agent01",
    },

    {
      title: "玩家ID",
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
      title: "帳戶餘額",
      dataIndex: "balance",
      key: "balance",
      render: (row) => `${formatNumber(row)}${CURRENCY}`,
      search: true,
      type: "number",
      inputProps: {
        addonAfter: CURRENCY,
      },
      ex: "20",
      render: (row) => <NumberColumns number={row} notStyle />,
    },

    {
      title: "手機",
      dataIndex: "mobile",
      key: "mobile",
      search: true,
      type: "text",
      ex: "0912345678",
      columnsHidden: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      search: true,
      type: "text",
      ex: "abc@gamil.com",
      columnsHidden: true,
    },
    {
      title: "真實名稱",
      dataIndex: "true_name",
      key: "true_name",
      search: true,
      type: "text",
      ex: "Chang Chia-Hang",
    },

    {
      title: "註冊日期",
      dataIndex: "create_time",
      key: "create_time",
      render: (row) => relativeFromTime(row),
      search: true,
      type: "date",
      ex: "1998-10-01",
    },
    {
      title: "國家",
      dataIndex: "country",
      key: "country",
      search: true,
      type: "text",
      ex: "Phlippines",
    },
    {
      title: "操作",
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
          <CreateButton type="新玩家" />
        </EditAuthColumns>
        <CommonTable
          csvApi={getMemberList}
          dataSource={playerList}
          columns={columns}
          tableProps={{ title: "玩家列表" }}
          tableLoading={tableLoading}
        />
      </TableWrapper>
    </Wrapper>
  );
};

export default PlayerSearch;
