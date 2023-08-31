import React from "react";
import Statistic from "./components/Statistic";
import StatisticTable from "./components/StatisticTable";
import Typography from "antd/es/typography/Typography";
import { Divider } from "antd";

const Home = () => {
  return (
    <>
      <Typography.Title level={2}>資訊看板</Typography.Title>
      <Divider />
      <Statistic />
      <StatisticTable />
    </>
  );
};

export default Home;
