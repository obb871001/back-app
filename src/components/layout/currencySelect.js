import { Select } from "antd";
import Typography from "antd/es/typography/Typography";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Flag from "react-world-flags";
import Cookies from "js-cookie";
import { fakeCurrency } from "../../constant";
import usdt from "../../../node_modules/cryptocurrency-icons/svg/color/usdt.svg";
import eth from "../../../node_modules/cryptocurrency-icons/svg/color/eth.svg";
import { setCurrency } from "../../redux/action/common/action";
import { useTranslation } from "react-i18next";

const CurrencySelect = () => {
  const { i18n, t } = useTranslation();
  const i18n_header = (key) => t(`layout.header.${key}`);

  const currencyList = useSelector(
    (state) => state.basicConfig.currency || fakeCurrency
  );
  const dispatch = useDispatch();

  const iconList = {
    usdt: usdt,
    eth: eth,
  };
  return (
    <>
      <Typography.Text>{i18n_header("currency")}：</Typography.Text>
      <Select
        className="!w-[120px]"
        placeholder="Select with images"
        defaultValue={Cookies.get("currency")}
        onChange={(value) => {
          Cookies.set("currency", value);
          const symbol = currencyList.find(
            (item) => item.iso_code === value
          )?.symbol;
          dispatch(setCurrency(symbol));
        }}
      >
        {currencyList
          .filter((item) => item.status_backend === 1)
          ?.map((currency) => (
            <Select.Option value={currency.iso_code} key={currency.iso_code}>
              {currency.is_crypto == 1 ? (
                <img
                  src={iconList[currency.iso_code?.toLowerCase()]}
                  className="h-[10px] w-[15px]"
                />
              ) : (
                <Flag
                  code={`${currency.iso_num == 901 ? 158 : currency.iso_num}`}
                  height="10"
                />
              )}
              <span className="ml-[5px]">{currency.iso_code}</span>
            </Select.Option>
          ))}
      </Select>
    </>
  );
};

export default CurrencySelect;
