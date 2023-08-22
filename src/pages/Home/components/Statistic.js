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
} from "recharts";

const data = [
  { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
  // ...
];

const Statistic = () => {
  return (
    <div>
      <StatisticCard
        title="有效投注量"
        tip="玩家有效投注量"
        style={{ maxWidth: 520 }}
        extra={<EllipsisOutlined />}
        chart={
          <BarChart width={500} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#8884d8" />
            <Bar dataKey="uv" fill="#82ca9d" />
          </BarChart>
        }
      />
    </div>
  );
};

export default Statistic;
