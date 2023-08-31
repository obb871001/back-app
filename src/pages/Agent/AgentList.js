import { useEffect, useState } from "react";
import CreateAgent from "./AgentList/modal/createAgent";
import { agentInfo, getAgentList } from "../../api/methods/getApi";
import SearchTool from "../../components/searchTool/searchTool";
import CommonTable from "../../components/table/commonTable";
import UseMergeableSearchParams from "../../hooks/useMergeableSearchParams";
import { MehOutlined, SettingTwoTone, SmileOutlined } from "@ant-design/icons";
import DetailAgent from "./AgentList/modal/detailAgent";
import CreateAgentTwo from "./AgentList/modal/createAgent2";
import ActionCol from "../../components/tableColumns/actionCol";
import CreateButton from "../../components/button/createButton";
import { useDispatch, useSelector } from "react-redux";
import { storeDetail } from "../../redux/action/member/action";
import CustomSearchInput from "../../components/searchTool/customSearchInput";
import { Col, Modal, Row, Space, Switch, Typography, notification } from "antd";
import Wrapper from "../../components/layout/Wrapper";
import TableWrapper from "../../components/layout/TableWrapper";
import EditAuthColumns from "../../utils/EditAuthColumns";
import { relativeFromTime } from "../../utils/getDay";
import {
  apiCalled,
  apiCalling,
  storeTotalRecords,
} from "../../redux/action/common/action";
import useEditStatus from "../../utils/EditStatus";
import { switchAgentStatus } from "../../api/methods/postApi";

const AgentList = () => {
  const [searchParams, setSearchParams] = UseMergeableSearchParams();
  const { current_page, per_page } = searchParams;

  const canEdit = useEditStatus();

  const dispatch = useDispatch();
  const trigger = useSelector((state) => state.trigger);

  const [confirmButtonLoading, setConfirmButtonLoading] = useState(false);
  const [agentList, setAgentList] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);
  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    setTableLoading(true);
    if (initialRender) {
      dispatch(apiCalling());
    }

    getAgentList({
      paramsData: {
        ...searchParams,
      },
    })
      .then((data) => {
        setAgentList(data.data.list);
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

  const editAgentStatus = (action, rowData) => {
    const { cagent, uid } = rowData;
    Modal.confirm({
      title: `您確定要 ${action} ${cagent} 的帳號嗎？`,
      content: "確認無誤",
      okButtonProps: {
        loading: confirmButtonLoading,
      },
      cancelButtonProps: {
        disabled: confirmButtonLoading,
      },
      onOk() {
        setConfirmButtonLoading(true);
        switchAgentStatus({ uid: uid })
          .then((data) => {
            dispatch(trigger());
            notification.open({
              description: `提交成功`,
              icon: <SmileOutlined className="text-green-500" />,
            });
          })
          .catch((err) => {
            const data = err.response.data;
            notification.open({
              description: `提交失敗`,
              icon: <MehOutlined className="text-red-500" />,
            });
          })
          .finally(() => {
            setConfirmButtonLoading(false);
          });
      },
      onCancel() {},
    });
  };

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
      title: "上層代理",
      dataIndex: "cagent_belong",
      key: "cagent_belong",
      search: true,
      type: "text",
      ex: "agent001",
    },

    {
      title: "代理商",
      dataIndex: "cagent",
      key: "cagent",
      search: true,
      type: "text",
      ex: "agent01",
    },
    {
      title: "登入名稱",
      dataIndex: "login_name",
      key: "login_name",
      render: (row) => {
        return row || "尚未登入";
      },
      search: true,
      type: "text",
      ex: "Jason Han",
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
      title: "玩家數量",
      dataIndex: "pnum",
      key: "pnum",
    },
    {
      title: "創建時間",
      dataIndex: "create_time",
      key: "create_time",
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
      render: (value, row) => {
        return canEdit ? (
          <Switch
            checkedChildren="啟用"
            unCheckedChildren="停用"
            checked={value == 1}
            onClick={() => {
              editAgentStatus("關閉", row);
            }}
          />
        ) : (
          <p>{row == 1 ? "啟用" : "停用"}</p>
        );
      },
      search: true,
      type: "select",
      selectProps: {
        options: [
          {
            label: "啟用",
            value: 1,
          },
          {
            label: "停用",
            value: 0,
          },
        ],
      },
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
            openDetail
            openEdit
          />
        );
      },
    },
  ];
  return (
    <Wrapper>
      <SearchTool columns={columns} />
      {/* <CreateAgent /> */}
      <TableWrapper>
        <EditAuthColumns>
          <CreateButton type="代理" />
        </EditAuthColumns>
        <CommonTable
          csvApi={getAgentList}
          tableLoading={tableLoading}
          columns={columns}
          dataSource={agentList}
        />
      </TableWrapper>
    </Wrapper>
  );
};

export default AgentList;
