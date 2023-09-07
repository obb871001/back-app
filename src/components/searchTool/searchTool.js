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
import { useEffect, useMemo, useState } from "react";
import { QueryFilter } from "@ant-design/pro-components";
import { toTimeStamp } from "../../utils/toTimeStamp";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { trigger } from "../../redux/action/common/action";
import AdvanceComponents from "./advanceComponents";
import { useTranslation } from "react-i18next";

const buttons = [
  {
    label: "today",
    timeFunc: () => {
      const start = getToday();
      const end = getToday();
      return { start, end };
    },
  },
  {
    label: "yesterday",
    timeFunc: () => {
      const start = getYesterday();
      const end = getYesterday();
      return { start, end };
    },
  },
  {
    label: "thisWeek",
    timeFunc: () => getWeek(1, 7),
  },
  {
    label: "lastWeek",
    timeFunc: () => getWeek(-6, 0),
  },
  {
    label: "thisMonth",
    timeFunc: () => getMonth(0),
  },
  {
    label: "lastMonth",
    timeFunc: () => getMonth(1),
  },
];

const SearchTool = ({ columns = [] }) => {
  const { t } = useTranslation();
  const i18n = (key) => t(`layout.searchTool.${key}`);

  const [searchParams, setSearchParams] = UseMergeableSearchParams();
  const { create_ts } = searchParams;
  const dispatch = useDispatch();

  const create_ts_base = useMemo(() => {
    const createTsArray = create_ts?.split(",");

    if (!createTsArray) return;

    const date1 = dayjs.unix(createTsArray[0]).format(dateFormat);
    const date2 = dayjs.unix(createTsArray[1]).format(dateFormat);
    const time1 = dayjs.unix(createTsArray[0]).format("HH:mm:ss");
    const time2 = dayjs.unix(createTsArray[1]).format("HH:mm:ss");

    return [date1, date2, time1, time2];
  }, [create_ts]);

  const [timeConfig, setTimeConfig] = useState({
    std: create_ts_base ? create_ts_base[0] : getToday(),
    etd: create_ts_base ? create_ts_base[1] : getToday(),
    stt: create_ts_base ? create_ts_base[2] : "00:00:00",
    ett: create_ts_base ? create_ts_base[3] : "23:59:59",
  });
  const { std, etd, stt, ett } = timeConfig;

  useEffect(() => {
    setSearchParams({
      create_ts: `${toTimeStamp(`${std} ${stt}`)},${toTimeStamp(
        `${etd} ${ett}`
      )}`,
    });
  }, [std, etd, stt, ett, create_ts]);

  const onRangeChange = (dates, dateStrings) => {
    // setSearchParams({
    //   std: dateStrings[0],
    //   etd: dateStrings[1],
    // });
    if (dates) {
      setTimeConfig({
        ...timeConfig,
        std: dateStrings[0],
        etd: dateStrings[1],
      });
    } else {
      setTimeConfig({
        ...timeConfig,
        std: getToday(),
        etd: getToday(),
      });
    }
  };

  const handleTimeRangeChange = (times, timeStrings) => {
    // setSearchParams({
    //   stt: timeStrings[0],
    //   ett: timeStrings[1],
    // });
    if (times) {
      setTimeConfig({
        ...timeConfig,
        stt: timeStrings[0],
        ett: timeStrings[1],
      });
    } else {
      setTimeConfig({
        ...timeConfig,
        stt: "00:00:00",
        ett: "23:59:59",
      });
    }
  };

  return (
    <section className="flex flex-col md:gap-[20px] gap-[10px] items-start mb-[20px] rounded-lg border min-w-[300px]">
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
      {/* <section className={sectionClass}> */}
      <div className={`flex flex-col gap-[10px] w-full`}>
        <span>{i18n("timeRange")}：</span>
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
      <div className=" items-center lg:w-full lg:grid grid-cols-3 gap-[10px] md:w-[unset] md:flex grid w-full">
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
            {i18n(button.label)}
          </Button>
        ))}{" "}
      </div>
      {/* </section> */}

      <section className={`w-full`}>
        {columns
          .filter((item) => item.search)
          .map((item) => {
            return <AdvanceComponents props={item} />;
          })}
      </section>
      <Button
        onClick={() => {
          dispatch(trigger());
        }}
        type="primary"
        icon={<SearchOutlined />}
      >
        {i18n("search")}
      </Button>
      <Divider dashed />
    </section>
  );
};

export default SearchTool;
