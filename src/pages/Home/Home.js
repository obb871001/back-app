import React from "react";
import Statistic from "./components/Statistic";
import StatisticTable from "./components/StatisticTable";
import Typography from "antd/es/typography/Typography";
import { Divider } from "antd";
import { useTranslation } from "react-i18next";
import CommonPageTitle from "../../components/layout/CommonPageTitle";

const Home = () => {
  const { t } = useTranslation();
  const i18n = (key) => t(`page.home.${key}`);

  return (
    <>
      <CommonPageTitle pagePath="home" />
      <Typography.Title level={2}>{i18n("title")}</Typography.Title>
      <Divider />
      <Statistic />
      <StatisticTable />
    </>
  );
};

export default Home;
