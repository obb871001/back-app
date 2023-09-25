import { ProFormGroup, ProFormSelect } from "@ant-design/pro-components";
import { Divider, Select, Space, Typography } from "antd";
import React, { useEffect, useState } from "react";
import MenuPermissions from "../../../../components/permissionComponents/menuPermissions";
import { useTranslation } from "react-i18next";
import useMenuTag from "../../../../hooks/useMenuTag";
import { useSelector } from "react-redux";
import CommonTooltip from "../../../../components/hint/commonTooltip";

const MenuAuth = ({ form, isChild }) => {
  const { t } = useTranslation();
  const i18n = (key) => t(`page.agentinfomation.agentlist.modal.${key}`);
  const i18n_common = (key) => t(`common.${key}`);

  const menuTagList = useMenuTag();

  const popType = useSelector((state) => state.popType);

  const [customSetting, setCustomSetting] = useState(popType !== "edit");
  const [menuLabel, setMenuLabel] = useState(null);

  const tagOptions = menuTagList.map((item) => {
    return {
      label: item.tag_name,
      value: item.uid,
      menu_permission: item.menu_permission,
      menu_editable: item.menu_editable,
    };
  });

  return (
    <>
      <div className="mb-[10px]">
        <Typography.Title italic level={4}>
          {i18n("menuPermission")}
          <Typography.Text
            className="cursor-pointer text-blue-500 ml-[20px]"
            onClick={() => setCustomSetting((prev) => !prev)}
            underline
          >
            {customSetting ? i18n("customize") : i18n("cancel")}
          </Typography.Text>
        </Typography.Title>{" "}
        <Divider className="mt-0 mb-[10px]" />
        <Space direction="vertical" align="baseline">
          <ProFormGroup>
            {customSetting ? (
              <section className="flex gap-[10px] items-center">
                <CommonTooltip tooltip={i18n_common("canSetAtPermission")} />
                <Select
                  options={tagOptions}
                  className="w-[200px]"
                  value={menuLabel}
                  placeholder={i18n_common("pleaseSelect")}
                  onChange={(v, item) => {
                    setMenuLabel(item.label);
                    form.setFieldsValue({
                      menu_permission: item.menu_permission,
                      menu_editable: item.menu_editable,
                    });
                  }}
                />
                <ProFormSelect name="menu_permission" className="hidden" />
                <ProFormSelect name="menu_editable" className="hidden" />
              </section>
            ) : (
              <MenuPermissions
                hiddenTitle
                isChild={isChild}
                customSetting={customSetting}
                form={form}
              />
            )}
          </ProFormGroup>
        </Space>
      </div>
    </>
  );
};

export default MenuAuth;
