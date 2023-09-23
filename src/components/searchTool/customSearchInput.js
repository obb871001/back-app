import {
  AutoComplete,
  DatePicker,
  Input,
  InputNumber,
  Radio,
  Select,
  Space,
} from "antd";
import React, { useEffect, useState } from "react";
import UseMergeableSearchParams from "../../hooks/useMergeableSearchParams";
import { toTimeStamp } from "../../utils/toTimeStamp";
import { useTranslation } from "react-i18next";
import { ProFormDigitRange } from "@ant-design/pro-components";
import dayjs from "dayjs";

const CustomSearchInput = ({ props }) => {
  const { t } = useTranslation();
  const i18n = (key) => t(`ex.${key}`);
  const [searchParams, setSearchParams] = UseMergeableSearchParams();

  const [numberRange, setNumberRange] = useState([0, 0]);

  useEffect(() => {
    if (props.type === "rangeNumber") {
      if (numberRange[0] && numberRange[1]) {
        setSearchParams({ [props.key]: `${numberRange[0]},${numberRange[1]}` });
      } else if (numberRange[0] === 0 || numberRange[1] === 0) {
        setSearchParams({ [props.key]: `${numberRange[0]},${numberRange[1]}` });
      } else {
        setSearchParams({ [props.key]: "" });
      }
    }
  }, [numberRange]);

  const {
    type,
    label,
    name = props.key,
    ex = "",
    inputProps = {},
    selectProps = {},
    autoCompleteProps = {},
    radioProps = {},
  } = props;

  const handleInputChange = (e) => {
    setSearchParams({ [e.target.name]: e.target.value });
  };

  const handleInputNumberChange = (v, name) => {
    setSearchParams({ [name]: v });
  };

  const handleSelectChange = (v, name) => {
    setSearchParams({ [name]: v });
  };
  const handleRadioChange = (e, name) => {
    setSearchParams({ [name]: e.target.value });
  };
  const onRangeChange = (dates, dateStrings, name) => {
    if (dates) {
      setSearchParams({
        [name]: `${toTimeStamp(dateStrings[0])},${toTimeStamp(dateStrings[1])}`,
      });
    } else {
      setSearchParams({
        [name]: null,
      });
    }
  };

  switch (type) {
    case "text":
      return (
        <Input
          name={name}
          onChange={handleInputChange}
          placeholder={ex && `${i18n("ex")}${ex}`}
          value={searchParams[name] || ""}
        />
      );
    case "date":
      return (
        <DatePicker.RangePicker
          onChange={(dates, dateStrings) => {
            onRangeChange(dates, dateStrings, name);
          }}
          value={
            searchParams[name]
              ? [
                  dayjs.unix(searchParams[name].split(",")[0]),
                  dayjs.unix(searchParams[name].split(",")[1]),
                ]
              : null
          }
          name={name}
        />
      );
    case "select":
      return (
        <Select
          className="w-full"
          name={name}
          {...selectProps}
          options={[
            {
              label: i18n("clear"),
              value: "",
            },
            ...(selectProps?.options || []),
          ]}
          onChange={(v) => {
            handleSelectChange(v, name);
          }}
          placeholder={ex && `${i18n("ex")}${ex}`}
        />
      );
    case "radio":
      return (
        <Radio.Group
          className="w-full"
          name={name}
          {...radioProps}
          value={searchParams[name] || ""}
          onChange={(e) => {
            handleRadioChange(e, name);
          }}
          placeholder={ex && `${i18n("ex")}${ex}`}
        />
      );
    case "rangeNumber":
      return (
        <Space>
          <InputNumber
            className="w-full"
            name={name}
            {...inputProps}
            value={searchParams[name]?.split(",")[0]}
            onChange={(v) => {
              if (v === null || v === undefined) {
                v = "";
              }
              setNumberRange([v, numberRange[1]]);
            }}
          />
          -
          <InputNumber
            className="w-full"
            name={name}
            {...inputProps}
            value={searchParams[name]?.split(",")[1]}
            onChange={(v) => {
              if (v === null || v === undefined) {
                v = "";
              }
              setNumberRange([numberRange[0], v]);
            }}
          />
        </Space>
      );
    case "number":
      return (
        <InputNumber
          className="w-full"
          name={name}
          value={searchParams[name] || ""}
          {...inputProps}
          onChange={(v) => {
            handleInputNumberChange(v, name);
          }}
          placeholder={ex && `${i18n("ex")}${ex}`}
        />
      );
    case "textarea":
      return (
        <Input.TextArea
          name={name}
          value={searchParams[name] || ""}
          onChange={(v) => {
            setSearchParams({ [name]: v.target.value });
          }}
          placeholder={ex && `${i18n("ex")}${ex}`}
        />
      );
    case "autoComplete":
      return (
        <AutoComplete
          {...autoCompleteProps}
          className="!w-full"
          onSelect={(data) => {
            setSearchParams({ [name]: data });
          }}
          onSearch={(text) => {
            setSearchParams({ [name]: text });
          }}
          placeholder={ex && `${i18n("ex")}${ex}`}
          value={searchParams[name] || ""}
          filterOption={(inputValue, option) =>
            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
        />
      );
    default:
      return (
        <Input
          onChange={handleInputChange}
          name={name}
          placeholder={ex && `${i18n("ex")}${ex}`}
          value={searchParams[name] || ""}
        />
      );
  }
};

export default CustomSearchInput;
