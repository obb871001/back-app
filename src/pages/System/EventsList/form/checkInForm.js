import { Button, Descriptions, Divider, Form, Typography } from "antd";
import CommonTitle from "../../../../components/form/commonTitle";
import {
  ProCard,
  ProForm,
  ProFormGroup,
  ProFormList,
  ProFormText,
} from "@ant-design/pro-components";
import CustomForm from "../../../../components/form/customForm";
import CustomDescription from "../../../../components/form/customDescription";
import CustomInputNumber from "../../../../components/form/customInputNumber";
import { useSelector } from "react-redux";
import BetGametypeLimit from "../components/betGametypeLimit";
import React from "react";

const CheckInForm = ({ form }) => {
  const formReducers = useSelector((state) => state.formReducers);
  const CURRENCY = useSelector((state) => state.CURRENCY);

  const basicForm = [
    [
      {
        label: "簽到活動名稱",
        name: "title",
        type: "text",
        required: true,
      },
      { label: "標籤顏色", name: "tagColor", type: "select" },
    ],
    [
      {
        label: "活動開始日期",
        name: "std",
        type: "date",
        required: true,
      },
      {
        label: "活動結束日期",
        name: "etd",
        type: "date",
        required: true,
      },
    ],
    [
      {
        label: "開啟狀態",
        name: "status",
        type: "switch",
      },
    ],
    [
      {
        label: "簽到天數",
        name: "checkInDay",
        type: "number",
        fieldProps: {
          addonAfter: "天",
          max: 7,
          min: 1,
          value: formReducers.checkDetail?.length || 1,
          disabled: true,
        },
      },
    ],
  ];

  const conditionForm = [
    {
      label: "存款次数",
      name: "depositTimes",
      components: {
        component: (
          <CustomInputNumber addonAfter={CURRENCY} min={0} allowEmpty />
        ),
        props: {},
      },
    },
    {
      label: "存款金額",
      name: "depositAmounts",
      components: {
        component: (
          <CustomInputNumber addonAfter={CURRENCY} min={0} allowEmpty />
        ),
        props: {},
      },
    },
    {
      label: "有效投注額",
      name: "turnover",
      components: {
        component: (
          <CustomInputNumber addonAfter={CURRENCY} min={0} allowEmpty />
        ),
        props: {},
      },
    },
    {
      label: "簽到點數",
      required: true,
      name: "checkBonus",
      components: {
        component: (
          <CustomInputNumber addonAfter={CURRENCY} min={0} allowEmpty />
        ),
        props: {},
      },
    },
    {
      label: "洗碼量",
      required: true,
      name: "checkMultiple",
      components: {
        component: (
          <CustomInputNumber addonAfter={CURRENCY} min={0} allowEmpty />
        ),
        props: {},
      },
    },
    {
      label: "投注遊戲限制",
      name: "gameType",
      components: {
        component: <BetGametypeLimit form={form} />,
        props: {},
      },
    },
  ];
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
      <Divider dashed />
      <Typography.Title level={5}>簽到條件設置</Typography.Title>
      <ProFormList
        name="checkDetail"
        min={1}
        max={7}
        copyIconProps={{
          tooltipText: "复制此行到末尾",
        }}
        deleteIconProps={{
          tooltipText: "刪除此設定",
        }}
        initialValue={[{}]}
        itemRender={({ listDom, action }, { record, index }) => {
          return (
            <>
              <Typography.Title level={5}>第{index + 1}天</Typography.Title>
              {listDom}
              {action}
              <Descriptions
                className="mb-[20px]"
                size="small"
                layout="vertical"
                column={3}
                bordered
              >
                {conditionForm.map((item) => {
                  return (
                    <CustomDescription
                      key={item.label}
                      label={item.label}
                      className={`${item.label === " " && "no-padding-label"}`}
                    >
                      {(
                        <ProForm.Item
                          className="!mb-0"
                          name={item.name}
                          rules={item.rules}
                        >
                          {React.cloneElement(item.components.component, {
                            ...item.components.props,
                            fieldKey: index,
                          })}
                        </ProForm.Item>
                      ) || item.value}
                    </CustomDescription>
                  );
                })}
              </Descriptions>
            </>
          );
        }}
      >
        {/* <Descriptions
          className="mb-[20px]"
          size="small"
          layout="vertical"
          column={3}
          bordered
        >
          {conditionForm.map((item, index) => {
            item.components.props.index = index;
            return (
              <CustomDescription
                key={item.label}
                label={item.label}
                className={`${item.label === " " && "no-padding-label"}`}
              >
                {(
                  <ProForm.Item
                    className="!mb-0"
                    name={item.name}
                    rules={item.rules}
                  >
                    {React.cloneElement(item.components.component, {
                      ...item.components.props,
                      fieldKey: index,
                    })}
                  </ProForm.Item>
                ) || item.value}
              </CustomDescription>
            );
          })}
        </Descriptions> */}
      </ProFormList>
    </>
  );
};

export default CheckInForm;
