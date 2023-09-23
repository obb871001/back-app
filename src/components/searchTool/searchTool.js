import {
  Button,
  DatePicker,
  Divider,
  Input,
  Popover,
  Radio,
  Select,
  Switch,
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
import { DownOutlined, SearchOutlined, UpOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { trigger } from "../../redux/action/common/action";
import AdvanceComponents from "./advanceComponents";
import { useTranslation } from "react-i18next";
import PriorityTip from "./priorityTip";
import { cardTitleClass } from "../../constant";
import { hasSearched, initHasSearched } from "../../redux/action/form/action";
import useDeviceType from "../../hooks/useDeviceType";

const excludedKeys = ["search_type"];

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
    timeFunc: () => getWeek(0, 6),
  },
  {
    label: "lastWeek",
    timeFunc: () => getWeek(-7, -1),
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

const SearchTool = ({
  columns = [],
  priorityList,
  timeOptional = { enabled: false },
  closeTimeOptional,
}) => {
  const { t } = useTranslation();
  const i18n = (key) => t(`layout.searchTool.${key}`);
  const i18n_switch = (key) => t(`switch.${key}`);

  const deviceType = useDeviceType();

  const [searchParams, setSearchParams] = UseMergeableSearchParams();
  const { create_ts, search_type } = searchParams;
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
  const [showMoreSearchCondition, setShowMoreSearchCondition] = useState(false);

  useEffect(() => {
    if (deviceType === "Mobile") {
      setShowMoreSearchCondition(false);
    } else {
      setShowMoreSearchCondition(true);
    }
  }, [deviceType]);

  useEffect(() => {
    if (closeTimeOptional) {
      setSearchParams({
        search_type: search_type || "partial",
      });
      return;
    }
    setSearchParams({
      create_ts: `${toTimeStamp(`${std} ${stt}`)},${toTimeStamp(
        `${etd} ${ett}`
      )}`,
      search_type: search_type || "partial",
    });
  }, [std, etd, stt, ett, create_ts]);

  const disabledTime = useMemo(() => {
    return timeOptional.enabled ? !timeOptional.open : false;
  }, [timeOptional]);

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
    <aside className="shadow rounded" style={{ border: "1px solid #ededed" }}>
      <section
        className={`${cardTitleClass} py-[10px] px-[15px] rounded-t font-semibold`}
      >
        {i18n("searchCondition")}
      </section>
      <section className="flex flex-col md:gap-[20px] gap-[10px] items-start mb-[20px] min-w-[350px] p-[10px] ">
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

        {closeTimeOptional ? null : (
          <>
            <div className={`flex flex-col gap-[10px] w-full mx-auto`}>
              <section className="flex items-center justify-between">
                <span>{i18n("timeRange")}：</span>
                {timeOptional.enabled && (
                  <Popover content={i18n("timeOptionalHint")}>
                    <Switch
                      checkedChildren={i18n_switch("open")}
                      unCheckedChildren={i18n_switch("close")}
                      value={timeOptional.open}
                      onChange={(checked) => {
                        timeOptional.setOpen(checked);
                      }}
                    />
                  </Popover>
                )}
              </section>
              <DatePicker.RangePicker
                onChange={onRangeChange}
                disabled={disabledTime}
                value={[dayjs(std, dateFormat), dayjs(etd, dateFormat)]}
              />
              <TimePicker.RangePicker
                format="HH:mm:ss"
                onChange={handleTimeRangeChange}
                disabled={disabledTime}
                value={[dayjs(stt, "HH:mm:ss"), dayjs(ett, "HH:mm:ss")]}
              />
            </div>
            <div className=" items-center lg:w-full lg:grid grid-cols-3 gap-[10px] md:w-[unset] md:flex grid w-full">
              {buttons.map((button) => (
                <Button
                  key={button.label}
                  disabled={disabledTime}
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
          </>
        )}
        {/* </section> */}

        <section className={`w-full md:px-[0px] px-[5px]`}>
          {columns.length !== 0 && (
            <AdvanceComponents
              props={{
                title: i18n("searchSetting"),
                key: "search_type",
                type: "radio",
                radioProps: {
                  value: search_type,
                  options: [
                    {
                      label: i18n("partial"),
                      value: "partial",
                    },
                    { label: i18n("exact"), value: "exact" },
                    {
                      label: i18n("starts"),
                      value: "starts",
                    },
                    {
                      label: i18n("ends"),
                      value: "ends",
                    },
                  ],
                },
              }}
            />
          )}
          {columns
            .filter((item) => item.search)
            .sort((a, b) => {
              if (a.searchOrder !== undefined && b.searchOrder === undefined)
                return -1;
              if (a.searchOrder === undefined && b.searchOrder !== undefined)
                return 1;
              if (a.searchOrder !== undefined && b.searchOrder !== undefined)
                return a.searchOrder - b.searchOrder;
              return 0;
            })
            .slice(0, showMoreSearchCondition ? 100 : 3)
            .map((item) => {
              return <AdvanceComponents props={item} />;
            })}
        </section>
        {columns.filter((item) => item.search).length > 3 && (
          <section className="flex flex-col items-center justify-center gap-[5px] w-full !text-xs text-gray-400 md:hidden">
            <p
              className="my-[0px]"
              onClick={() => {
                setShowMoreSearchCondition(!showMoreSearchCondition);
              }}
            >
              {showMoreSearchCondition ? i18n("collapse") : i18n("expand")}
            </p>
            {showMoreSearchCondition ? <UpOutlined /> : <DownOutlined />}
          </section>
        )}
        <Button
          onClick={() => {
            const checkedKeys =
              Object.keys(searchParams).filter(
                (key) => !excludedKeys.includes(key)
              ).length === 0;
            if (checkedKeys) {
              dispatch(initHasSearched());
            } else {
              dispatch(trigger());
              dispatch(hasSearched());
            }
          }}
          className="md:!w-full w-[95%] mx-auto"
          type="primary"
          icon={<SearchOutlined />}
        >
          {i18n("search")}
        </Button>
        {priorityList && <PriorityTip priorityList={priorityList} />}
      </section>
    </aside>
  );
};

export default SearchTool;
