import React, { useEffect } from "react";
import CustomModal from "../../../../components/modal/customModal";
import { Tabs } from "antd";
import UseMergeableSearchParams from "../../../../hooks/useMergeableSearchParams";
import CommonModal from "../../../../components/modal/commonModal";
import { useDispatch, useSelector } from "react-redux";
import AgentBasic from "../detail/agentBasic";
import { agentInfo } from "../../../../api/methods/getApi";
import { storeDetail } from "../../../../redux/action/common/action";

const DetailAgent = ({ type }) => {
  const [searchParams, setSearchParams] = UseMergeableSearchParams();
  const { uid, commonUid, tabKey = "1" } = searchParams;

  const agentDetail = useSelector((state) => state.commonDetail);
  const dispatch = useDispatch();

  const handleTabChange = (key) => {
    setSearchParams({ tabKey: key });
  };

  useEffect(() => {
    agentInfo({ agentUid: uid || commonUid }).then((data) => {
      dispatch(storeDetail(data));
    });
  }, [uid, commonUid]);
  const tabs = [
    {
      key: "1",
      label: `基本資料`,
      children: <AgentBasic type={type} />,
    },
    {
      key: "2",
      label: `重設密碼`,
      children: "重設密碼",
    },
  ];

  return (
    <CustomModal
      modalProps={{
        title: type === "child" ? "子帳號詳細資料" : "代理詳細資料",
      }}
    >
      <Tabs
        defaultActiveKey={tabKey}
        activeKey={tabKey}
        onChange={handleTabChange}
        items={tabs}
      />
    </CustomModal>
  );
};

export default DetailAgent;
