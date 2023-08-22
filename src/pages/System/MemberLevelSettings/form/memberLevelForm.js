import { ProFormGroup, ProFormText } from "@ant-design/pro-components";
import { useSelector } from "react-redux";
import { Descriptions, Form, InputNumber, Typography } from "antd";

import { CURRENCY } from "../../../../constant";
import CustomForm from "../../../../components/form/customForm";
import CustomDescription from "../../../../components/form/customDescription";
import CustomInputNumber from "../../../../components/form/customInputNumber";
import CommonTooltip from "../../../../components/hint/commonTooltip";
import CommonTitle from "../../../../components/form/commonTitle";

const MemberLevelForm = () => {
  const formDetail = useSelector((state) => state.formReducers);

  const basicForm = [
    [
      {
        label: "標籤名稱",
        name: "tagName",
        type: "text",
        rules: [{ required: true, message: "請輸入標籤名稱" }],
      },
      { label: "標籤顏色", name: "tagColor", type: "select" },
      { label: "描述", name: "description", type: "text" },
    ],
    [
      {
        label: "點數小於多少時完成洗碼",
        name: "washMin",
        type: "number",
        fieldProps: { addonAfter: CURRENCY },
        allowEmpty: true,
      },
    ],
    [
      {
        label: "手續費類型",
        name: "isPercent",
        type: "radio",
        options: [
          { label: "百分比", value: 1 },
          { label: "固定金額", value: 0 },
        ],
      },
      {
        label: "提款手續費",
        name: "withdrawFee",
        type: "number",
        fieldProps: { addonAfter: formDetail.isPercent ? "%" : CURRENCY },
        allowEmpty: true,
      },
    ],
    [
      {
        label: "自动出款",
        name: "isAutoWithdraw",
        type: "switch",
      },
      {
        label: "手动出款几次后可自动出款",
        name: "autoWithdrawLimit",
        type: "number",
        fieldProps: { addonAfter: "次", disabled: !formDetail.isAutoWithdraw },
      },
    ],
  ];
  const depositDetail = [
    {
      label: "類型",
      value: "單日存款次數",
    },
    {
      label: "設定值",
      value: "",
      components: (
        <Form.Item className="!mb-0" name="depositTimes">
          <CustomInputNumber
            allowEmpty
            addonAfter={"次"}
            className="!w-[250px]"
          />
        </Form.Item>
      ),
    },
    {
      label: " ",
      value: "單日存款金額",
    },
    {
      label: " ",
      value: "",
      components: (
        <Form.Item className="!mb-0" name="depositLimit">
          <CustomInputNumber
            allowEmpty
            addonAfter={CURRENCY}
            className="!w-[250px]"
          />
        </Form.Item>
      ),
    },
  ];
  const withdrawDetail = [
    {
      label: "類型",
      value: "單日提款次數",
    },
    {
      label: "設定值",
      value: "",
      components: (
        <Form.Item className="!mb-0" name="withdrawTimes">
          <CustomInputNumber
            allowEmpty
            addonAfter="次"
            className="!w-[250px]"
          />
        </Form.Item>
      ),
    },
    {
      label: " ",
      value: "單日提款金額",
    },
    {
      label: " ",
      value: "",
      components: (
        <Form.Item className="!mb-0" name="withdrawLimit">
          <CustomInputNumber
            allowEmpty
            addonAfter={CURRENCY}
            min={0}
            className="!w-[250px]"
          />
        </Form.Item>
      ),
    },
    {
      label: " ",
      value: "最低提款金額",
    },
    {
      label: " ",
      value: "",
      components: (
        <Form.Item className="!mb-0" name="withdrawMin">
          <CustomInputNumber
            allowEmpty
            addonAfter={CURRENCY}
            min={0}
            className="!w-[250px]"
          />
        </Form.Item>
      ),
    },
    {
      label: " ",
      value: "最高提款金額",
    },
    {
      label: " ",
      value: "",
      components: (
        <Form.Item className="!mb-0" name="withdrawMax">
          <CustomInputNumber
            allowEmpty
            addonAfter={CURRENCY}
            className="!w-[250px]"
          />
        </Form.Item>
      ),
    },
  ];

  const createDepositDetailArray = (prefix) => [
    {
      label: "優惠門檻",
      tooltip: "喔",
      components: (
        <Form.Item className="!mb-0" name={`${prefix}BenefitMin`}>
          <CustomInputNumber addonAfter={CURRENCY} min={0} allowEmpty />
        </Form.Item>
      ),
    },
    {
      label: "最低充值金额",
      components: (
        <Form.Item className="!mb-0" name={`${prefix}Min`}>
          <CustomInputNumber addonAfter={CURRENCY} min={0} allowEmpty />
        </Form.Item>
      ),
    },
    {
      label: "最高充值金额",
      components: (
        <Form.Item className="!mb-0" name={`${prefix}Max`}>
          <CustomInputNumber addonAfter={CURRENCY} allowEmpty />
        </Form.Item>
      ),
    },
    {
      label: "充值优惠",
      components: (
        <Form.Item className="!mb-0" name={`${prefix}Benefit`}>
          <CustomInputNumber addonAfter="%" max={100} allowEmpty />
        </Form.Item>
      ),
    },
    {
      label: <CommonTooltip title="洗碼倍數" tooltip={""} />,
      components: (
        <Form.Item className="!mb-0" name={`${prefix}Muilti`}>
          <CustomInputNumber addonAfter={`倍`} min={0} allowEmpty />
        </Form.Item>
      ),
    },
    {
      label: "当日优惠上限",
      components: (
        <Form.Item className="!mb-0" name={`${prefix}Upper`}>
          <CustomInputNumber addonAfter={CURRENCY} min={0} allowEmpty />
        </Form.Item>
      ),
    },
  ];

  const companyDepositDetail = createDepositDetailArray("company");
  const cashflowDepositDetail = createDepositDetailArray("merchant");

  return (
    <>
      <CommonTitle title="基本設定" />
      {basicForm.map((group) => {
        return (
          <ProFormGroup>
            {group.map((item) => {
              return <CustomForm {...item} />;
            })}
          </ProFormGroup>
        );
      })}
      <Typography.Title level={5}>當日存款限制</Typography.Title>
      <Descriptions
        className="mb-[20px]"
        size="small"
        layout="vertical"
        column={2}
        bordered
      >
        {depositDetail.map((item, index) => {
          return (
            <CustomDescription
              key={index}
              label={item.label}
              className={`${item.label === " " && "no-padding-label"}`}
            >
              {item.components || item.value}
            </CustomDescription>
          );
        })}
      </Descriptions>
      <Typography.Title level={5}>當日提款限制</Typography.Title>
      <Descriptions
        className="mb-[20px]"
        size="small"
        layout="vertical"
        column={2}
        bordered
      >
        {withdrawDetail.map((item, index) => {
          return (
            <CustomDescription
              key={index}
              label={item.label}
              tooltip={item.tooltip}
              className={`${item.label === " " && "no-padding-label"}`}
            >
              {item.components || item.value}
            </CustomDescription>
          );
        })}
      </Descriptions>
      <Typography.Title level={5}>公司存款優惠</Typography.Title>
      <Descriptions
        className="mb-[20px]"
        size="small"
        layout="vertical"
        column={3}
        bordered
      >
        {companyDepositDetail.map((item, index) => {
          return (
            <CustomDescription
              key={index}
              label={item.label}
              tooltip={item.tooltip}
              className={`${item.label === " " && "no-padding-label"}`}
            >
              {item.components || item.value}
            </CustomDescription>
          );
        })}
      </Descriptions>
      <Typography.Title level={5}>金流存款優惠</Typography.Title>
      <Descriptions
        className="mb-[20px]"
        size="small"
        layout="vertical"
        column={3}
        bordered
      >
        {cashflowDepositDetail.map((item, index) => {
          return (
            <CustomDescription
              key={index}
              label={item.label}
              tooltip={item.tooltip}
              className={`${item.label === " " && "no-padding-label"}`}
            >
              {item.components || item.value}
            </CustomDescription>
          );
        })}
      </Descriptions>
    </>
  );
};

export default MemberLevelForm;
