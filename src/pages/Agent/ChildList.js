import { useEffect, useState } from "react";
import { SettingTwoTone } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

import {
  agentInfo,
  getAgentList,
  getChildList,
} from "../../api/methods/getApi";
import CreateChild from "./ChildList/modal/createChild";
import SearchTool from "../../components/searchTool/searchTool";
import CommonTable from "../../components/table/commonTable";
import UseMergeableSearchParams from "../../hooks/useMergeableSearchParams";
import DetailChild from "./ChildList/modal/detailChild";
import CreateButton from "../../components/button/createButton";
import Wrapper from "../../components/layout/Wrapper";
import ActionCol from "../../components/tableColumns/actionCol";
import {
  apiCalled,
  apiCalling,
  storeDetail,
  storeTotalRecords,
} from "../../redux/action/common/action";
import { filterAgentLevel } from "../../utils/oldUtils/filterAgentLevel";
import TableWrapper from "../../components/layout/TableWrapper";
import AdvanceComponents from "../../components/searchTool/advanceComponents";
import EditAuthColumns from "../../utils/EditAuthColumns";
import { relativeFromTime } from "../../utils/getDay";

const ChildList = () => {
  const [searchParams, setSearchParams] = UseMergeableSearchParams();
  const { current_page, per_page } = searchParams;

  const dispatch = useDispatch();
  const trigger = useSelector((state) => state.trigger);

  const [childList, setChildList] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);
  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    setTableLoading(true);
    if (initialRender) {
      dispatch(apiCalling());
    }

    getChildList({
      paramsData: {
        ...searchParams,
      },
    })
      .then((data) => {
        setChildList(data.data.list);
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
  }, [trigger, current_page, per_page]);
  const columns = [
    {
      title: "編號",
      dataIndex: "uid",
      key: "uid",
      search: true,
      type: "number",
      ex: "1",
    },
    {
      title: "代理上線",
      key: "cagent",
      render: (row) => {
        return filterAgentLevel(row);
      },
      search: true,
      type: "text",
      ex: "agent01",
    },
    {
      title: "子帳號",
      dataIndex: "cagent",
      key: "cagent",
      search: true,
      type: "text",
      ex: "child01",
    },
    {
      title: "等級",
      dataIndex: "level",
      key: "level",
      search: true,
      type: "number",
      ex: "1",
      inputProps: {
        addonAfter: "級",
      },
    },
    {
      title: "暱稱",
      dataIndex: "nick_name",
      key: "nick_name",
      search: true,
      type: "text",
      ex: "Godtone",
    },
    {
      title: "真實姓名",
      dataIndex: "true_name",
      key: "true_name",
      search: true,
      type: "text",
      ex: "Chang Chia-Hang",
    },
    {
      title: "手機",
      dataIndex: "mobile",
      key: "mobile",
      search: true,
      type: "text",
      ex: "0912345678",
    },
    {
      title: "生日",
      dataIndex: "birthday",
      key: "birthday",
      search: true,
      type: "text",
      ex: "1998-10-01",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      search: true,
      type: "text",
      ex: "abc@gmail.com",
    },
    {
      title: "創建時間",
      dataIndex: "createDate",
      key: "createDate",
      search: true,
      type: "date",
    },
    {
      title: "上次登入時間",
      dataIndex: "oauth",
      key: "oauth",
      render: (row) => {
        return !row ? relativeFromTime(row) : "(尚未登入)";
      },
      search: true,
      type: "date",
    },
    {
      title: "帳號狀態",
      dataIndex: "status",
      key: "status",
      render: (row) => {
        return <p>{row == 1 ? "啟用" : "停用"}</p>;
      },
      search: true,
      type: "select",
    },
    {
      title: "操作",
      key: "action",
      render: (row) => {
        return (
          <ActionCol
            callApi={() => {
              agentInfo({ agentUid: row.uid }).then((data) => {
                dispatch(storeDetail(data));
              });
            }}
            apiUid={row.uid}
            openEdit
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
          <CreateButton type="子帳號" />
        </EditAuthColumns>
        <CommonTable
          tableLoading={tableLoading}
          csvApi={getChildList}
          columns={columns}
          dataSource={childList}
        />
      </TableWrapper>
    </Wrapper>
  );
};

export default ChildList;
