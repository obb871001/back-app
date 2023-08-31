import { useSelector } from "react-redux";
import CommonTitle from "../../../../components/form/commonTitle";
import {
  ProForm,
  ProFormGroup,
  ProFormList,
  ProFormText,
} from "@ant-design/pro-components";
import CustomForm from "../../../../components/form/customForm";
import CommonTooltip from "../../../../components/hint/commonTooltip";
import { Descriptions, Divider, Input, Typography } from "antd";
import CustomInputNumber from "../../../../components/form/customInputNumber";
import BetGametypeLimit from "../components/betGametypeLimit";
import CustomDescription from "../../../../components/form/customDescription";
import React from "react";
import { CopyTwoTone, DeleteTwoTone } from "@ant-design/icons";

const TaskForm = ({ form }) => {
  const formReducers = useSelector((state) => state.formReducers);
  const CURRENCY = useSelector((state) => state.CURRENCY);

  const basicForm = [
    [
      {
        label: "任務主標題",
        name: "title",
        type: "text",
        required: true,
      },
      { label: "標籤顏色", name: "tagColor", type: "select" },
    ],
    [
      {
        label: (
          <>
            活動開始日期
            <CommonTooltip
              tooltip={`玩家只能在活动期间内进行任务。如果超过活动时间但玩家完成任务却未领取奖励，或者未完成任务，这些任务都将从前台的任务清单中消失。`}
            />
          </>
        ),
        name: "std",
        type: "date",
        required: true,
      },
      {
        label: (
          <>
            活動結束日期
            <CommonTooltip
              tooltip={`玩家只能在活动期间内进行任务。如果超过活动时间但玩家完成任务却未领取奖励，或者未完成任务，这些任务都将从前台的任务清单中消失。`}
            />
          </>
        ),
        name: "etd",
        type: "date",
        required: true,
      },
    ],
    [
      {
        label: (
          <>
            任務領取天數
            <CommonTooltip tooltip={`領取獎勵後的過期天數`} />
          </>
        ),
        name: "rewardDay",
        type: "number",
        required: true,
      },
    ],

    [
      {
        label: "任務狀態",
        name: "status",
        type: "switch",
      },
    ],
  ];

  const conditionForm = [
    {
      label: "子任務標題",
      name: "taskTitle",
      components: {
        component: <Input />,
        props: {},
      },
    },
    {
      label: "存款次數",
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
      label: "任務獲得點數",
      rules: [{ required: true, message: "請輸入簽到點數" }],
      name: "taskBonus",
      components: {
        component: (
          <CustomInputNumber addonAfter={CURRENCY} min={0} allowEmpty />
        ),
        props: {},
      },
    },
    {
      label: "洗碼量",
      name: "taskMultiple",
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
      <CommonTitle title="任務條件設置" />
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

export default TaskForm;
