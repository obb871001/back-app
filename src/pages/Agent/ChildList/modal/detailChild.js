import React from "react";
import CustomModal from "../../../../components/modal/customModal";
import { Tabs } from "antd";
import UseMergeableSearchParams from "../../../../hooks/useMergeableSearchParams";
import { useTranslation } from "react-i18next";

const DetailChild = ({ setIsModalOpen, isModalOpen }) => {
  const { t } = useTranslation();
  const i18n = (key) => t(`page.agentinfomation.agentlist.tabs.${key}`);

  const [searchParams, setSearchParams] = UseMergeableSearchParams();
  const { playeruid, tabKey = "1" } = searchParams;

  const handleTabChange = (key) => {
    setSearchParams({ tabKey: key });
  };

  const tabs = [
    {
      key: "1",
      label: i18n("basicInfo"),
      children: "幾本",
    },
    {
      key: "2",
      label: i18n("resetPassword"),
      children: "重設密碼",
    },
  ];

  return (
    <CustomModal
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      modalProps={{ title: i18n("subDetail") }}
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
