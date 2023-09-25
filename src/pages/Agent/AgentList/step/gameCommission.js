import { ProFormGroup, ProFormSelect } from "@ant-design/pro-components";
import { Divider, Select, Space, Typography } from "antd";
import { useState } from "react";
import CommissionPermission from "../../../../components/permissionComponents/commissionPermission";
import { useTranslation } from "react-i18next";
import FilterLevelName from "../../../../utils/filterLevelName";
import { useSelector } from "react-redux";
import useGameCommissionTag from "../../../../hooks/useGameCommissionTag";
import CommonTooltip from "../../../../components/hint/commonTooltip";

const GameCommission = ({ form, prefix }) => {
  const { t } = useTranslation();
  const i18n = (key) => t(`page.agentinfomation.agentlist.modal.${key}`);
  const i18n_common = (key) => t(`common.${key}`);

  const agentInfo = useSelector((state) => state.agentInfo);
  const popType = useSelector((state) => state.popType);

  const gameTagList = useGameCommissionTag();

  const [customSetting, setCustomSetting] = useState(popType !== "edit");
  const [labelSelect, setLabelSelect] = useState(null);

  const tagOptions = gameTagList.map((item) => {
    return {
      label: item.tag_name,
      value: item.uid,
      game_per: item.game_per,
    };
  });
  return (
    <>
      <div className="mb-[10px]">
        <Typography.Title italic level={4}>
          {FilterLevelName(null, agentInfo.level + 1)}
          {i18n(`game_${prefix}`)}
          <Typography.Text
            className="cursor-pointer text-blue-500 ml-[20px]"
            onClick={() => setCustomSetting((prev) => !prev)}
            underline
          >
            {customSetting ? i18n("customize") : i18n("cancel")}
          </Typography.Text>
        </Typography.Title>{" "}
        <Divider className="mt-0 mb-[10px]" />
        <Space align="baseline">
          <ProFormGroup>
            {customSetting ? (
              <section className="flex gap-[10px] items-center">
                <CommonTooltip tooltip={i18n_common("canSetAtPermission")} />
                <Select
                  options={tagOptions}
                  className="w-[200px]"
                  value={labelSelect}
                  placeholder={i18n_common("pleaseSelect")}
                  onChange={(v, item) => {
                    setLabelSelect(item.label);
                    form.setFieldsValue({
                      game_per: item.game_per,
                    });
                  }}
                />
                <ProFormSelect name="game_per" className="hidden" />
              </section>
            ) : (
              <CommissionPermission form={form} prefix={prefix} hiddenTitle />
            )}
          </ProFormGroup>
        </Space>
      </div>
    </>
  );
};

export default GameCommission;
