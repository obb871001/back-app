import React, { useEffect, useState } from "react";
import { ProTable } from "@ant-design/pro-components";
import { notification } from "antd";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import { SettingTwoTone } from "@ant-design/icons";

import SearchTool from "../../../components/searchTool/searchTool";
import CommonTable from "../../../components/table/commonTable";
import CreatePlayer from "./modal/createPlayer";
import { getMemberList } from "../../../api/methods/getApi";
import UseMergeableSearchParams from "../../../hooks/useMergeableSearchParams";
import DetailPlayer from "./modal/detailPlayer";

const PlayerSearch = () => {
  const [searchParams, setSearchParams] = UseMergeableSearchParams();
  const { searchKeys, searchValue, sort, order } = searchParams;

  const navigate = useNavigate();

  const [playerList, setPlayerList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [trigger, setTrigger] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setTableLoading(true);
    getMemberList({
      sort: sort,
      order: order,
      searchData: {
        [searchKeys]: searchValue,
      },
    })
      .then((res) => {
        setPlayerList(res.data.list);
      })
      .catch((err) => {
        const data = err.response.data;
      })
      .finally(() => {
        setTableLoading(false);
      });
  }, [searchValue, trigger]);

  const columns = [
    {
      title: "編號",
      dataIndex: "uid",
      key: "uid",
      width: 50,
    },
    {
      title: "玩家名稱",
      dataIndex: "memId",
      key: "memId",
    },
    {
      title: "註冊日期",
      dataIndex: "createDate",
      key: "createDate",
    },
    {
      title: "國家",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "帳戶餘額",
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
      <SearchTool
        searchOptions={[
          { label: "玩家名稱", value: "memId" },
          { label: "編號", value: "uid" },
        ]}
      />
      <CreatePlayer />
      <CommonTable
        dataSource={playerList}
        columns={columns}
        tableProps={{ title: "玩家列表" }}
        tableLoading={tableLoading}
        setTrigger={setTrigger}
      />
      {isModalOpen && (
        <DetailPlayer
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </>
  );
};

export default PlayerSearch;
