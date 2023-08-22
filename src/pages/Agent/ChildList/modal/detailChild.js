import React from "react";
import CustomModal from "../../../../components/modal/customModal";
import { Tabs } from "antd";
import UseMergeableSearchParams from "../../../../hooks/useMergeableSearchParams";

const DetailChild = ({ setIsModalOpen, isModalOpen }) => {
  const [searchParams, setSearchParams] = UseMergeableSearchParams();
  const { playeruid, tabKey = "1" } = searchParams;

  const handleTabChange = (key) => {
    setSearchParams({ tabKey: key });
  };

  const tabs = [
    {
      key: "1",
      label: `基本資料`,
      children: "幾本",
    },
    {
      key: "2",
      label: `重設密碼`,
      children: "重設密碼",
    },
  ];

  return (
    <CustomModal
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      modalProps={{ title: "子帳號詳細資料" }}
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

export default DetailChild;
