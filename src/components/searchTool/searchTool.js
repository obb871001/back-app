import {
  Button,
  DatePicker,
  Divider,
  Input,
  Radio,
  Select,
  TimePicker,
} from "antd";
import UseMergeableSearchParams from "../../hooks/useMergeableSearchParams";
import {
  dateFormat,
  getMonth,
  getToday,
  getWeek,
  getYesterday,
} from "../../utils/getDay";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { QueryFilter } from "@ant-design/pro-components";
import { toTimeStamp } from "../../utils/toTimeStamp";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { trigger } from "../../redux/action/common/action";

const buttons = [
  {
    label: "今天",
    timeFunc: () => {
      const start = getToday();
      const end = getToday();
      return { start, end };
    },
  },
  {
    label: "昨天",
    timeFunc: () => {
      const start = getYesterday();
      const end = getYesterday();
      return { start, end };
    },
  },
  {
    label: "本週",
    timeFunc: () => getWeek(1, 7),
  },
  {
    label: "上週",
    timeFunc: () => getWeek(-6, 0),
  },
  {
    label: "本月",
    timeFunc: () => getMonth(0),
  },
  {
    label: "上月",
    timeFunc: () => getMonth(1),
  },
];

const sectionClass =
  "lg:flex-row flex-col flex items-start md:items-center gap-[10px] md:gap-[20px]";
const divClass =
  "flex items-start gap-[10px] md:items-center flex-col md:flex-row ";

const SearchTool = ({ advanceSearch }) => {
  const [searchParams, setSearchParams] = UseMergeableSearchParams();

  const dispatch = useDispatch();

  const [timeConfig, setTimeConfig] = useState({
    std: getToday(),
    etd: getToday(),
    stt: "00:00:00",
    ett: "23:59:59",
  });
  const { std, etd, stt, ett } = timeConfig;

  useEffect(() => {
    setSearchParams({
      createTs: `${toTimeStamp(`${std} ${stt}`)} ${toTimeStamp(
        `${etd} ${ett}`
      )}`,
    });
  }, [std, etd, stt, ett]);

  const handleSearch = (e) => {
    setSearchParams({ [e.target.name]: e.target.value });
  };

  const onRangeChange = (dates, dateStrings) => {
    if (dates) {
      setSearchParams({
        std: dateStrings[0],
        etd: dateStrings[1],
      });
    }
  };

  const handleTimeRangeChange = (times, timeStrings) => {
    setSearchParams({
      stt: timeStrings[0],
      ett: timeStrings[1],
    });
  };

  const handleRadio = (e) => {
    setSearchParams({
      [e.target.name]: e.target.value,
    });
  };

  const handleSelect = (value) => {
    setSearchParams({
      searchKeys: value,
    });
  };

  const radioOptions = [
    { label: "all", value: -1, name: "ispay", title: "狀態搜尋" },
    { label: "ispay", value: 1 },
    { label: "isnotpay", value: 0 },
  ];
  return (
    <section className="flex flex-col md:gap-[20px] gap-[10px] items-start mb-[20px] rounded-lg border">
      {/* <section className={sectionClass}>
        <div className={divClass}>
          <p>搜尋選項：</p>
          <Select onChange={handleSelect} className="w-[150px]" />
        </div>
        <div className={divClass}>
          <p>搜尋：</p>
          <Input.Search
            name="searchValue"
            onChange={(e) => handleSearch(e)}
            className="w-[200px] md:w-[250px]"
          />
        </div>
      </section> */}
      <section className={sectionClass}>
        <div className={divClass}>
          <p>時間範圍：</p>
          <DatePicker.RangePicker
            onChange={onRangeChange}
            value={[dayjs(std, dateFormat), dayjs(etd, dateFormat)]}
          />
          <TimePicker.RangePicker
            format="HH:mm:ss"
            onChange={handleTimeRangeChange}
            value={[dayjs(stt, "HH:mm:ss"), dayjs(ett, "HH:mm:ss")]}
          />
        </div>
        <div className="md:flex items-center grid grid-cols-3 gap-[10px] md:w-[unset] w-full">
          {buttons.map((button) => (
            <Button
              key={button.label}
              onClick={() => {
                const time = button.timeFunc();
                setTimeConfig({
                  ...timeConfig,
                  std: time.start,
                  etd: time.end,
                });
              }}
              type="primary"
            >
              {button.label}
            </Button>
          ))}{" "}
        </div>
      </section>

      <section className={``}>{advanceSearch}</section>
      <Button
        onClick={() => {
          dispatch(trigger());
        }}
        type="primary"
        icon={<SearchOutlined />}
      >
        搜尋
      </Button>
      <Divider dashed />
    </section>
  );
};

export default SearchTool;
