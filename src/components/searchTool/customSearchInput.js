import { DatePicker, Input, InputNumber, Select } from "antd";
import React from "react";
import UseMergeableSearchParams from "../../hooks/useMergeableSearchParams";
import { toTimeStamp } from "../../utils/toTimeStamp";

const CustomSearchInput = ({ props }) => {
  const [searchParams, setSearchParams] = UseMergeableSearchParams();

  const {
    type,
    label,
    name = props.key,
    ex = "",
    inputProps = {},
    selectProps = {},
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
          placeholder={ex && `例：${ex}`}
          value={searchParams[name] || ""}
        />
      );
    case "date":
      return (
        <DatePicker.RangePicker
          onChange={(dates, dateStrings) => {
            onRangeChange(dates, dateStrings, name);
          }}
          name={name}
        />
      );
    case "select":
      return (
        <Select
          className="w-full"
          name={name}
          {...selectProps}
          onChange={(v) => {
            handleSelectChange(v, name);
          }}
          placeholder={ex && `例：${ex}`}
        />
      );
    case "number":
      return (
        <InputNumber
          className="w-full"
          name={name}
          {...inputProps}
          onChange={(v) => {
            handleInputNumberChange(v, name);
          }}
          placeholder={ex && `例：${ex}`}
        />
      );
    case "textarea":
      return <Input.TextArea name={name} placeholder={ex && `例：${ex}`} />;
    default:
      return (
        <Input
          onChange={handleInputChange}
          name={name}
          placeholder={ex && `例：${ex}`}
          value={searchParams[name] || ""}
        />
      );
  }
};

export default CustomSearchInput;
