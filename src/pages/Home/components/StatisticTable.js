import { Space, Table, Typography } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import CommonTooltip from "../../../components/hint/commonTooltip";
import StatisticWrapper from "./StatisticWrapper";
import { demo_data } from "./demo";
import { formatNumber } from "../../../utils/formatNumber";
import { useSelector } from "react-redux";
import HtmlCanvasWrapper from "../../../components/html2canvas/htmlCanvasWrapper";

const summaryClassName = "text-[#508a66]";
const tdClassName = "text-blue-500 font-bold";

const StatisticTable = () => {
  const statisticData = useSelector((state) => state.homepageReports);
  const CURRENCY = useSelector((state) => state.CURRENCY);

  const data = [
    {
      title: "代理資訊",
      type: "代理數(人)",
      keys: "total_agent",
      titleRowSpan: 2,
      className: tdClassName,
    },
    {
      title: "",
      type: "新增代理(人)",
      keys: "new_agent",
      titleRowSpan: 0,
      className: tdClassName,
    },
    {
      title: "玩家資訊",
      type: "玩家總人數(人)",
      keys: "total_people",
      titleRowSpan: 3,
      className: tdClassName,
    },

    {
      title: "",
      type: "新進玩家人數(人)",
      keys: "new_player",
      titleRowSpan: 0,
      className: tdClassName,
    },
    {
      title: "",
      type: "活躍玩家人數(人)",
      keys: "active_player",
      titleRowSpan: 0,
      className: tdClassName,
    },

    {
      title: "投注資訊",
      type: "有效投注(萬)",
      keys: "total_turnover",
      titleRowSpan: 2,
      currency: CURRENCY,
      formatNumber: true,
      className: tdClassName,
    },
    {
      title: "",
      type: "損益",
      keys: "total_winloss",
      titleRowSpan: 0,
      currency: CURRENCY,
      formatNumber: true,
      className: tdClassName,
    },
    {
      title: "存款資訊",
      type: "總額",
      keys: "total_deposit_amounts",
      titleRowSpan: 4,
      currency: CURRENCY,
      formatNumber: true,
      className: tdClassName,
    },
    {
      title: "",
      type: "首次存款人數(人)",
      keys: "new_deposit_player",
      titleRowSpan: 0,
    },

    {
      title: "",
      type: "總人數(人)",
      keys: "total_deposit_people",
      titleRowSpan: 0,
    },
    {
      title: "",
      type: "首次存款人數(人)",
      keys: "new_deposit_player",
      titleRowSpan: 0,
      className: tdClassName,
    },
    {
      title: "取款資訊",
      type: "總額",
      keys: "total_withdraw_amounts",
      titleRowSpan: 2,
      currency: CURRENCY,
      formatNumber: true,
      className: tdClassName,
    },
    {
      title: "",
      type: "總人數",
      keys: "total_withdraw_people",
      titleRowSpan: 0,
    },
  ];
  const columns = [
    {
      title: "",
      dataIndex: "title",
      key: "title",
      className: "font-bold",
      onCell: (row, index) => {
        return {
          rowSpan: row.titleRowSpan,
          colSpan: row.titleColSpan,
        };
      },
    },
    {
      title: "",
      dataIndex: "type",
      key: "type",
      className: "font-bold",
    },

    {
      title: "今日",
      dataIndex: "today",
      key: "today",
      align: "right",
      onCell: (row, index) => {
        return {
          className: row.className || "",
        };
      },
      render: (value, row, index) => {
        return `${row.currency || ""}${
          row.formatNumber
            ? formatNumber(statisticData.today?.[row.keys])
            : statisticData.today?.[row.keys]
        }`;
      },
    },
    {
      title: "昨日",
      dataIndex: "yesterday",
      key: "yesterday",
      align: "right",
      onCell: (row, index) => {
        return {
          className: row.className || "",
        };
      },
      render: (value, row, index) => {
        return `${row.currency || ""}${
          row.formatNumber
            ? formatNumber(statisticData.yesterday?.[row.keys])
            : statisticData.yesterday?.[row.keys]
        }`;
      },
    },
    {
      title: "本週",
      dataIndex: "thisWeek",
      key: "thisWeek",
      align: "right",
      onCell: (row, index) => {
        return {
          className: row.className || "",
        };
      },
      render: (value, row, index) => {
        return `${row.currency || ""}${
          row.formatNumber
            ? formatNumber(statisticData.thisWeek?.[row.keys])
            : statisticData.thisWeek?.[row.keys]
        }`;
      },
    },
    {
      title: "上週",
      dataIndex: "lastWeek",
      key: "lastWeek",
      align: "right",
      onCell: (row, index) => {
        return {
          className: row.className || "",
        };
      },
      render: (value, row, index) => {
        return `${row.currency || ""}${
          row.formatNumber
            ? formatNumber(statisticData.lastWeek?.[row.keys])
            : statisticData.lastWeek?.[row.keys]
        }`;
      },
    },
    {
      title: "本月",
      dataIndex: "thisMonth",
      key: "thisMonth",
      align: "right",
      onCell: (row, index) => {
        return {
          className: row.className || "",
        };
      },
      render: (value, row, index) => {
        return `${row.currency || ""}${
          row.formatNumber
            ? formatNumber(statisticData.thisMonth?.[row.keys])
            : statisticData.thisMonth?.[row.keys]
        }`;
      },
    },
    {
      title: "上月",
      dataIndex: "lastMonth",
      key: "lastMonth",
      align: "right",
      onCell: (row, index) => {
        return {
          className: row.className || "",
        };
      },
      render: (value, row, index) => {
        return `${row.currency || ""}${
          row.formatNumber
            ? formatNumber(statisticData.lastMonth?.[row.keys])
            : statisticData.lastMonth?.[row.keys]
        }`;
      },
    },
  ];

  const keysArray = [
    "today",
    "yesterday",
    "thisWeek",
    "lastWeek",
    "thisMonth",
    "lastMonth",
  ];
  console.log(statisticData);
  return (
    <>
      <StatisticWrapper
        tooltip={`焦點資訊每一分鐘會更新一次`}
        wrapperClassName="!pt-[0px]"
        title={`焦點資訊`}
      >
        <HtmlCanvasWrapper imageName={`焦點資訊`}>
          <Table
            columns={columns}
            size="small"
            bordered
            pagination={false}
            dataSource={data}
            summary={(pageData) => {
              return (
                <>
                  <Table.Summary.Row className="font-bold bg-[#b7e3c8]">
                    <Table.Summary.Cell index={0} colSpan={2}>
                      總營收(總存款-總取款)
                    </Table.Summary.Cell>
                    {keysArray.map((data, index) => {
                      return (
                        <Table.Summary.Cell
                          align="right"
                          className={summaryClassName}
                          index={index + 2}
                        >
                          {CURRENCY}
                          {statisticData[data]?.total}
                        </Table.Summary.Cell>
                      );
                    })}
                  </Table.Summary.Row>
                </>
              );
            }}
          />
        </HtmlCanvasWrapper>
      </StatisticWrapper>
    </>
  );
};

export default StatisticTable;
