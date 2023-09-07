import { EllipsisOutlined } from "@ant-design/icons";
import { StatisticCard } from "@ant-design/pro-components";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";
import StatisticWrapper from "./StatisticWrapper";
import { demo_chart_data, demo_data } from "./demo";
import { Col, Row, Space, Switch, Typography } from "antd";
import { useState } from "react";
import HtmlCanvasWrapper from "../../../components/html2canvas/htmlCanvasWrapper";
import { useTranslation } from "react-i18next";

const Statistic = () => {
  const { t } = useTranslation();
  const i18n = (key) => t(`page.home.${key}`);

  const [showNumber, setShowNumber] = useState(true);
  const statisticArray = [
    {
      title: i18n("validTurnover"),
      tip: i18n("validTurnover"),
      unit: i18n("amount"),
      keys: "total_turnover",
      color: "#007BFF", // 蓝色
    },
    {
      title: i18n("totalWinLoss"),
      tip: i18n("totalWinLoss"),
      unit: i18n("amount"),
      keys: "total_winloss",
      color: "#28A745", // 绿色
    },
    {
      title: i18n("validTurnoverOrderNumber"),
      tip: i18n("validTurnoverOrderNumber"),
      unit: i18n("validTurnoverOrderNumberUnit"),
      keys: "total_turnover_order",
      color: "#FD7E14", // 橘色
    },
    {
      title: i18n("activePlayer"),
      tip: i18n("activePlayer"),
      unit: i18n("people"),
      keys: "active_player",
      color: "#DC3545", // 红色
    },
  ];
  return (
    <>
      <StatisticWrapper
        wrapperClassName={`!pt-[0px]`}
        tooltip={`${i18n("recentOperation")}${i18n("everyMinuteUpdate")}`}
        title={i18n("recentOperation")}
      >
        <section className="justify-end flex gap-[10px]">
          <Typography.Text underline>{i18n("showNumber")}</Typography.Text>
          <Switch
            onChange={() => {
              setShowNumber(!showNumber);
            }}
            checked={showNumber}
          />
        </section>
        <HtmlCanvasWrapper imageName={i18n("recentOperation")}>
          <Row>
            {statisticArray.map((statistic) => {
              return (
                <Col xl={6} lg={12} sm={24}>
                  <StatisticCard
                    title={statistic.title}
                    tip={statistic.tip}
                    extra={<EllipsisOutlined />}
                    chart={
                      <BarChart width={350} height={300} data={demo_chart_data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis>
                          <Label
                            value={statistic.unit}
                            position="insideBottom"
                            angle={-90}
                            offset={20}
                          />
                        </YAxis>
                        <Tooltip />
                        <Legend />
                        <Bar
                          dataKey={statistic.keys}
                          label={
                            showNumber ? { fill: "", fontSize: 12 } : false
                          }
                          name={statistic.title}
                          fill={statistic.color}
                          barSize={15}
                        />
                      </BarChart>
                    }
                  />
                </Col>
              );
            })}
          </Row>
        </HtmlCanvasWrapper>
      </StatisticWrapper>
    </>
  );
};

export default Statistic;
