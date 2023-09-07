import { AutoComplete, DatePicker, Input, InputNumber, Select } from "antd";
import React from "react";
import UseMergeableSearchParams from "../../hooks/useMergeableSearchParams";
import { toTimeStamp } from "../../utils/toTimeStamp";
import { useTranslation } from "react-i18next";

const CustomSearchInput = ({ props }) => {
  const { t } = useTranslation();
  const i18n = (key) => t(`ex.${key}`);
  const [searchParams, setSearchParams] = UseMergeableSearchParams();

  const {
    type,
    label,
    name = props.key,
    ex = "",
    inputProps = {},
    selectProps = {},
    autoCompleteProps = {},
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
          placeholder={ex && `${i18n("ex")}${ex}`}
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
          placeholder={ex && `${i18n("ex")}${ex}`}
        />
      );
    case "textarea":
      return (
        <Input.TextArea name={name} placeholder={ex && `${i18n("ex")}${ex}`} />
      );
    case "autoComplete":
      return (
        <AutoComplete
          {...autoCompleteProps}
          style={{
            width: 200,
          }}
          onSelect={(data) => {
            setSearchParams({ [name]: data });
          }}
          onSearch={(text) => {
            setSearchParams({ [name]: text });
          }}
          placeholder={ex && `${i18n("ex")}${ex}`}
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
