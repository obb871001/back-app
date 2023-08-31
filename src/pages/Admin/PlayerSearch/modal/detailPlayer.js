import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";

import CustomModal from "../../../../components/modal/customModal";
import { getMemberList } from "../../../../api/methods/getApi";
import { storeDetail } from "../../../../redux/action/member/action";
import PlayerBasic from "../detail/playerBasic";
import UseMergeableSearchParams from "../../../../hooks/useMergeableSearchParams";
import PlayerPassword from "../detail/playerPassword";
import PlayerBetLimit from "../detail/playerBetLimit";
import { useNavigate, useParams } from "react-router";

const DetailPlayer = ({ setIsModalOpen, isModalOpen }) => {
  const [searchParams, setSearchParams] = UseMergeableSearchParams();
  const { tabKey = "1" } = searchParams;
  const { uid } = useParams();

  const dispatch = useDispatch();
  const trigger = useSelector((state) => state.trigger);

  const navigate = useNavigate();

  useEffect(() => {
    if (uid || searchParams.uid) {
      getMemberList({
        paramsData: { uid: uid || searchParams.uid },
      }).then((res) => {
        dispatch(storeDetail(res.data.list[0]));
      });
    }
  }, [trigger]);

  const handleTabChange = (key) => {
    setSearchParams({ tabKey: key });
  };

  const tabs = [
    {
      key: "1",
      label: `基本資料`,
      children: <PlayerBasic />,
    },
    {
      key: "2",
      label: `重設密碼`,
      children: <PlayerPassword />,
    },
    {
      key: "3",
      label: `限紅設定`,
      children: <PlayerBetLimit />,
    },
  ];
  return (
    <CustomModal modalProps={{ title: "玩家詳細資料" }}>
      <Tabs
        defaultActiveKey={tabKey}
        activeKey={tabKey}
        onChange={handleTabChange}
        items={tabs}
      />
    </CustomModal>
  );
};

export default DetailPlayer;
