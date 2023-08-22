import React from "react";
import { useSelector } from "react-redux";
import CommonTitle from "../../../../components/form/commonTitle";
import { CURRENCY } from "../../../../constant";
import { ProForm, ProFormGroup, ProFormList } from "@ant-design/pro-components";
import { Descriptions, Divider, Input, Typography } from "antd";
import CustomForm from "../../../../components/form/customForm";
import CustomInputNumber from "../../../../components/form/customInputNumber";
import { CopyTwoTone, DeleteTwoTone } from "@ant-design/icons";
import CustomDescription from "../../../../components/form/customDescription";

const RouletteForm = ({ form }) => {
  const formReducers = useSelector((state) => state.formReducers);
  const basicForm = [
    [
      {
        label: "輪盤活動名稱",
        name: "title",
        type: "text",
        rules: [{ required: true, message: "請輸入輪盤活動名稱" }],
      },
      { label: "標籤顏色", name: "tagColor", type: "select" },
    ],
    [
      {
        label: "活動開始日期",
        name: "std",
        type: "date",
      },
      {
        label: "活動結束日期",
        name: "etd",
        type: "date",
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
        label: "描述",
        name: "description",
        type: "textarea",
        width: "xl",
      },
    ],
    [
      {
        label: "每存款多少可轉動轮盘",
        name: "depositAmount",
        type: "number",
        fieldProps: {
          min: 0,
          addonAfter: CURRENCY,
        },
      },
      {
        label: "每投注多少可轉動轮盘",
        name: "betAmount",
        type: "number",
        fieldProps: {
          min: 0,
          addonAfter: CURRENCY,
        },
      },
      {
        label: "獲得轉動次数限制",
        name: "countLimit",
        type: "number",
        rules: [{ required: true, message: "請輸入獲得轉動次数限制" }],
        fieldProps: {
          min: 1,
          max: 100,
          addonAfter: "次",
        },
      },
    ],
  ];

  const conditionForm = [
    {
      label: "獎勵名稱",
      rules: [{ required: true, message: "請輸入獎勵名稱" }],
      name: "rouletteTitle",
      components: {
        component: <Input />,
        props: {},
      },
    },
    {
      label: "輪盤獎勵金額",
      rules: [{ required: true, message: "請輸入輪盤獎勵金額" }],
      name: "awardBonus",
      components: {
        component: (
          <CustomInputNumber addonAfter={CURRENCY} min={0} allowEmpty />
        ),
        props: {},
      },
    },
    {
      label: "洗碼量",
      name: "awardMultiple",
      components: {
        component: <CustomInputNumber addonAfter={`倍`} min={0} allowEmpty />,
        props: {},
      },
    },
    {
      label: "中獎需求最低投注額",
      rules: [{ required: true, message: "請輸入中獎需求最低投注額" }],
      name: "turnoverMin",
      components: {
        component: (
          <CustomInputNumber addonAfter={CURRENCY} min={0} allowEmpty />
        ),
        props: {},
      },
    },
    {
      label: "中獎需求最高投注額",
      rules: [{ required: true, message: "請輸入中獎需求最高投注額" }],
      name: "turnoverMax",
      components: {
        component: (
          <CustomInputNumber addonAfter={CURRENCY} min={0} allowEmpty />
        ),
        props: {},
      },
    },
    {
      label: "獎品分佈機率",
      rules: [{ required: true, message: "請輸入獎品分佈機率" }],
      name: "rouletteProbability",
      components: {
        component: <CustomInputNumber addonAfter={`%`} min={0} allowEmpty />,
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
      <ProFormList
        name="checkDetail"
        min={1}
        max={7}
        copyIconProps={{
          tooltipText: "复制此行到末尾",
          Icon: CopyTwoTone,
        }}
        deleteIconProps={{
          tooltipText: "刪除此設定",
          Icon: DeleteTwoTone,
        }}
        initialValue={[{}]}
        itemRender={({ listDom, action }, { record, index }) => {
          return (
            <>
              <Typography.Title level={5}>第{index + 1}項</Typography.Title>
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
      ></ProFormList>
    </>
  );
};

export default RouletteForm;
