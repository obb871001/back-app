import { ProFormGroup, ProFormSelect } from "@ant-design/pro-components";
import { Divider, Select, Space, Typography } from "antd";
import React, { useState } from "react";
import GamePermission from "../../../../components/permissionComponents/gamePermission";
import { useTranslation } from "react-i18next";
import CommonTooltip from "../../../../components/hint/commonTooltip";
import useGamePermissionTag from "../../../../hooks/useGamePermissionTag";
import { useSelector } from "react-redux";

const GameAuth = ({ form }) => {
  const { t } = useTranslation();
  const i18n = (key) => t(`page.agentinfomation.agentlist.modal.${key}`);
  const i18n_common = (key) => t(`common.${key}`);

  const gameTagList = useGamePermissionTag();

  const popType = useSelector((state) => state.popType);

  const [customSetting, setCustomSetting] = useState(popType !== "edit");
  const [labelSelect, setLabelSelect] = useState(null);

  const tagOptions = gameTagList.map((item) => {
    return {
      label: item.tag_name,
      value: item.uid,
      game_permission: item.game_permission,
    };
  });
  return (
    <>
      <div className="mb-[10px]">
        <Typography.Title italic level={4}>
          {i18n("gamePermission")}
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
                      game_permission: item.game_permission,
                    });
                  }}
                />
                <ProFormSelect name="game_permission" className="hidden" />
              </section>
            ) : (
              <GamePermission form={form} hiddenTitle />
            )}
          </ProFormGroup>
        </Space>
      </div>
    </>
  );
};

export default GameAuth;
