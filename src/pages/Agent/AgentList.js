import { useEffect, useState } from "react";
import CreateAgent from "./AgentList/modal/createAgent";
import { agentInfo, getAgentList } from "../../api/methods/getApi";
import SearchTool from "../../components/searchTool/searchTool";
import CommonTable from "../../components/table/commonTable";
import UseMergeableSearchParams from "../../hooks/useMergeableSearchParams";
import { SettingTwoTone } from "@ant-design/icons";
import DetailAgent from "./AgentList/modal/detailAgent";
import CreateAgentTwo from "./AgentList/modal/createAgent2";
import ActionCol from "../../components/tableColumns/actionCol";
import CreateButton from "../../components/button/createButton";
import { useDispatch, useSelector } from "react-redux";
import { storeDetail } from "../../redux/action/member/action";
import CustomSearchInput from "../../components/searchTool/customSearchInput";
import { Col, Row, Space, Typography } from "antd";

const AgentList = () => {
  const [searchParams, setSearchParams] = UseMergeableSearchParams();
  const { searchKeys, searchValue, sort, order } = searchParams;

  const dispatch = useDispatch();
  const trigger = useSelector((state) => state.trigger);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [agentList, setAgentList] = useState([]);

  useEffect(() => {
    getAgentList()
      .then((data) => {
        console.log(data);
        setAgentList(data.data.list);
      })
      .catch((err) => {
        const data = err.response.data;
      })
      .finally(() => {});
  }, [trigger]);

  const columns = [
    {
      title: "編號",
      dataIndex: "uid",
      key: "uid",
    },
    {
      title: "代理上線/登入名稱",
      key: "cagent",
      render: (row) => {
        return `${row.cagent}/${row.loginname || "(尚未登入)"}`;
      },
      search: true,
      type: "text",
    },
    {
      title: "等級",
      dataIndex: "level",
      key: "level",
      search: true,
      type: "number",
    },
    {
      title: "暱稱",
      dataIndex: "nick_name",
      key: "nick_name",
      search: true,
      type: "text",
    },
    {
      title: "真實姓名",
      dataIndex: "true_name",
      key: "true_name",
      search: true,
      type: "text",
    },
    {
      title: "手機",
      dataIndex: "mobile",
      key: "mobile",
      search: true,
      type: "text",
    },
    {
      title: "生日",
      dataIndex: "birthday",
      key: "birthday",
      search: true,
      type: "text",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      search: true,
      type: "text",
    },
    {
      title: "玩家數量",
      dataIndex: "pnum",
      key: "pnum",
    },
    {
      title: "創建時間",
      dataIndex: "createDate",
      key: "createDate",
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
          />
        );
      },
    },
  ];
  return (
    <>
      <SearchTool
        advanceSearch={columns
          .filter((item) => item.search)
          .map((item) => {
            return (
              <Row className="mb-[10px]">
                <Col span={12}>
                  <Typography.Text>{item.title}：</Typography.Text>
                </Col>
                <Col span={12}>
                  <CustomSearchInput props={item} />
                </Col>
              </Row>
            );
          })}
      />
      {/* <CreateAgent /> */}
      <CreateButton type="代理" />
      <CommonTable columns={columns} dataSource={agentList} />
      {isModalOpen && (
        <DetailAgent
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </>
  );
};

export default AgentList;
