import { Space, Table, Typography } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import CommonTooltip from "../../../components/hint/commonTooltip";
import StatisticWrapper from "./StatisticWrapper";
import { demo_data } from "./demo";
import { formatNumber } from "../../../utils/formatNumber";
import { useSelector } from "react-redux";
import HtmlCanvasWrapper from "../../../components/html2canvas/htmlCanvasWrapper";
import { useTranslation } from "react-i18next";

const summaryClassName = "text-[#508a66]";
const tdClassName = "text-blue-500 font-bold";

const StatisticTable = () => {
  const { t } = useTranslation();
  const i18n = (key) => t(`page.home.${key}`);

  const statisticData = useSelector((state) => state.homepageReports);
  const isCreditVersion = useSelector(
    (state) => state.basicConfig.is_credit === 1
  );
  const CURRENCY = useSelector((state) => state.CURRENCY);

  const data = [
    {
      title: i18n("agentInformation"),
      type: i18n("agentNumber"),
      keys: "total_agent",
      titleRowSpan: 2,
      className: tdClassName,
    },
    {
      title: "",
      type: i18n("addAgent"),
      keys: "new_agent",
      titleRowSpan: 0,
      className: tdClassName,
    },
    {
      title: i18n("playerInformation"),
      type: i18n("playerTotalNumber"),
      keys: "total_people",
      titleRowSpan: 3,
      className: tdClassName,
    },

    {
      title: "",
      type: i18n("newPlayer"),
      keys: "new_player",
      titleRowSpan: 0,
      className: tdClassName,
    },
    {
      title: "",
      type: i18n("activePlayerNumber"),
      keys: "active_player",
      titleRowSpan: 0,
      className: tdClassName,
    },

    {
      title: i18n("turnoverInformation"),
      type: i18n("turnover"),
      keys: "total_turnover",
      titleRowSpan: 2,
      currency: CURRENCY,
      formatNumber: true,
      className: tdClassName,
    },
    {
      title: "",
      type: i18n("winLoss"),
      keys: "total_winloss",
      titleRowSpan: 0,
      currency: CURRENCY,
      formatNumber: true,
      className: tdClassName,
    },
    {
      title: i18n("depositInformation"),
      type: i18n("total"),
      keys: "total_deposit_amounts",
      titleRowSpan: 3,
      currency: CURRENCY,
      formatNumber: true,
      className: tdClassName,
      isCredit: isCreditVersion,
    },
    {
      title: "",
      type: i18n("firstDepositPeople"),
      keys: "new_deposit_player",
      titleRowSpan: 0,
      isCredit: isCreditVersion,
    },

    {
      title: "",
      type: i18n("totalPeople"),
      keys: "total_deposit_people",
      titleRowSpan: 0,
      isCredit: isCreditVersion,
    },
    // {
    //   title: "",
    //   type: "首次存款人數(人)",
    //   keys: "new_deposit_player",
    //   titleRowSpan: 0,
    //   className: tdClassName,
    // },
    {
      title: i18n("withdrawInformation"),
      type: i18n("total"),
      keys: "total_withdraw_amounts",
      titleRowSpan: 2,
      currency: CURRENCY,
      formatNumber: true,
      className: tdClassName,
      isCredit: isCreditVersion,
    },
    {
      title: "",
      type: i18n("totalPeople"),
      keys: "total_withdraw_people",
      titleRowSpan: 0,
      isCredit: isCreditVersion,
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
      title: i18n("today"),
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
      title: i18n("yesterday"),
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
      title: i18n("thisWeek"),
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
      title: i18n("lastWeek"),
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
      title: i18n("thisMonth"),
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
      title: i18n("lastMonth"),
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
  return (
    <>
      <StatisticWrapper
        tooltip={`${i18n("focusInformation")}${"everyMinuteUpdate"}`}
        wrapperClassName="!pt-[0px]"
        title={`${i18n("focusInformation")}`}
      >
        <HtmlCanvasWrapper imageName={`${i18n("focusInformation")}`}>
          <Table
            columns={columns}
            size="small"
            bordered
            pagination={false}
            dataSource={data.filter((item) => !item.isCredit)}
            summary={(pageData) => {
              return (
                isCreditVersion || (
                  <>
                    <Table.Summary.Row className="font-bold bg-[#b7e3c8]">
                      <Table.Summary.Cell index={0} colSpan={2}>
                        {i18n("totalRevenue")}
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
                )
              );
            }}
          />
        </HtmlCanvasWrapper>
      </StatisticWrapper>
    </>
  );
};

export default StatisticTable;
