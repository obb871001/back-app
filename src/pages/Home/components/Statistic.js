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

const Statistic = () => {
  const [showNumber, setShowNumber] = useState(true);
  const statisticArray = [
    {
      title: "有效投注量",
      tip: "玩家有效投注量",
      unit: "金額(萬)",
      keys: "total_turnover",
      color: "#007BFF", // 蓝色
    },
    {
      title: "總輸贏",
      tip: "玩家總輸贏",
      unit: "金額(萬)",
      keys: "total_winloss",
      color: "#28A745", // 绿色
    },
    {
      title: "有效投注單量",
      tip: "玩家有效投注單量",
      unit: "單量(單)",
      keys: "total_turnover_order",
      color: "#FD7E14", // 橘色
    },
    {
      title: "活躍玩家",
      tip: "活躍玩家",
      unit: "人數(人)",
      keys: "active_player",
      color: "#DC3545", // 红色
    },
  ];
  return (
    <>
      <StatisticWrapper
        wrapperClassName={`!pt-[0px]`}
        tooltip={`近日營運狀況每一分鐘會更新一次`}
        title={`近日營運狀況`}
      >
        <section className="justify-end flex gap-[10px]">
          <Typography.Text underline>顯示數字</Typography.Text>
          <Switch
            onChange={() => {
              setShowNumber(!showNumber);
            }}
            checked={showNumber}
          />
        </section>
        <HtmlCanvasWrapper imageName={`近日營運狀況`}>
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
