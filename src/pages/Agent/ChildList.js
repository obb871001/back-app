import { useEffect, useState } from "react";
import { getAgentList, getChildList } from "../../api/methods/getApi";
import CreateChild from "./ChildList/modal/createChild";
import SearchTool from "../../components/searchTool/searchTool";
import CommonTable from "../../components/table/commonTable";
import { SettingTwoTone } from "@ant-design/icons";
import UseMergeableSearchParams from "../../hooks/useMergeableSearchParams";
import DetailChild from "./ChildList/modal/detailChild";

const ChildList = () => {
  const [searchParams, setSearchParams] = UseMergeableSearchParams();
  const { searchKeys, searchValue, sort, order } = searchParams;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [childList, setChildList] = useState([]);

  useEffect(() => {
    getChildList()
      .then((data) => {
        console.log(data);
        setChildList(data.data.list);
      })
      .catch((err) => {
        const data = err.response.data;
      })
      .finally(() => {});
  }, []);
  const columns = [
    {
      title: "編號",
      dataIndex: "uid",
    },
    {
      title: "代理上線",
      dataIndex: "memId",
      key: "memId",
    },
    {
      title: "等級",
      dataIndex: "createDate",
      key: "createDate",
    },
    {
      title: "暱稱",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "玩家數量",
      dataIndex: "vpoint",
      key: "vpoint",
    },
    {
      title: "創建時間",
      key: "action",
    },
    {
      title: "上次登入時間",
      dataIndex: "vpoint",
      key: "vpoint",
    },
    {
      title: "操作",
      key: "action",
      render: (row) => {
        return (
          <SettingTwoTone
            onClick={() => {
              setSearchParams({ playeruid: row.uid });
              setIsModalOpen(true);
            }}
            className="cursor-pointer"
          />
        );
      },
    },
  ];

  return (
    <>
      <SearchTool />
      <CreateChild />
      <CommonTable columns={columns} dataSource={childList} />
      {isModalOpen && (
        <DetailChild
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </>
  );
};

export default ChildList;
