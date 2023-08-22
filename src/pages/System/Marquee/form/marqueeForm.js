import { ProFormGroup, ProFormText } from "@ant-design/pro-components";
import CommonTitle from "../../../../components/form/commonTitle";
import CustomForm from "../../../../components/form/customForm";

const MarqueeForm = () => {
  const basicForm = [
    [
      {
        label: "發送對象",
        name: "target",
        type: "text",
        placeholder: "若發送給所有人則無須填寫欄位",
      },
    ],
    [
      {
        label: "開始日期",
        name: "std",
        type: "date",
        required: true,
      },
      {
        label: "結束日期",
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
        label: "跑馬燈內容",
        name: "marqueeContent",
        type: "textarea",
        width: "xl",
      },
    ],
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
    </>
  );
};

export default MarqueeForm;
