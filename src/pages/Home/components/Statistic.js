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
import { useMemo, useState } from "react";
import HtmlCanvasWrapper from "../../../components/html2canvas/htmlCanvasWrapper";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { formatNumber } from "../../../utils/formatNumber";

const Statistic = () => {
  const { t } = useTranslation();
  const i18n = (key) => t(`page.home.${key}`);

  const statisticData = useSelector((state) => state.homepageReports);
  const isCreditVersion = useSelector(
    (state) => state.basicConfig.is_credit === 1
  );

  const chartData = useMemo(() => {
    return statisticData?.statisticTable
      ?.map((item) => {
        return {
          ...item,
          total_turnover: Number(item.total_turnover),
          total_winloss: Number(item.total_winloss),
          total_turnover_order: Number(item.total_turnover_order),
          name: dayjs.unix(item.timestamp).format("MM-DD"),
        };
      })
      .reverse();
  }, [statisticData]);

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
      title: isCreditVersion ? i18n("newPlayer") : i18n("depositAmounts"),
      tip: isCreditVersion ? i18n("newPlayer") : i18n("depositAmounts"),
      unit: isCreditVersion ? i18n("people") : i18n("total_deposit_amounts"),
      keys: isCreditVersion ? "new_player" : "total_turnover_order",
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
            {statisticArray
              .filter((item) => !item.isCredit)
              .map((statistic) => {
                return (
                  <Col
                    className="overflow-x-scroll"
                    xl={6}
                    lg={12}
                    md={12}
                    sm={24}
                  >
                    <StatisticCard
                      title={statistic.title}
                      tip={statistic.tip}
                      headStyle={{ padding: "0 0 10px 0" }}
                      bodyStyle={{ padding: "0 0 10px 0" }}
                      chart={
                        <BarChart width={330} height={250} data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis>
                            <Label
                              value={statistic.unit}
                              position="insideBottom"
                              angle={-90}
                              offset={10}
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
                            barSize={20}
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
