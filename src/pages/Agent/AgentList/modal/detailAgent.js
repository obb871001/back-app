import React, { useEffect, useState } from "react";
import CustomModal from "../../../../components/modal/customModal";
import { Tabs } from "antd";
import UseMergeableSearchParams from "../../../../hooks/useMergeableSearchParams";
import CommonModal from "../../../../components/modal/commonModal";
import { useDispatch, useSelector } from "react-redux";
import AgentBasic from "../detail/agentBasic";
import { agentInfo } from "../../../../api/methods/getApi";
import { storeDetail } from "../../../../redux/action/common/action";
import { useParams } from "react-router";

const DetailAgent = ({ type }) => {
  const { uid } = useParams();

  const dispatch = useDispatch();

  const [tab, setTab] = useState("1");

  const handleTabChange = (key) => {
    setTab(`${key}`);
  };

  useEffect(() => {
    agentInfo({ agentUid: uid }).then((data) => {
      dispatch(storeDetail(data));
    });
  }, [uid]);
  const tabs = [
    {
      key: "1",
      label: `基本資料`,
      children: <AgentBasic type={type} />,
    },
    // {
    //   key: "2",
    //   label: `重設密碼`,
    //   children: "重設密碼",
    // },
  ];

  return (
    <CustomModal
      modalProps={{
        title: type === "child" ? "子帳號詳細資料" : "代理詳細資料",
      }}
    >
      <Tabs
        defaultActiveKey={tab}
        activeKey={tab}
        onChange={handleTabChange}
        items={tabs}
      />
    </CustomModal>
  );
};

export default DetailAgent;
