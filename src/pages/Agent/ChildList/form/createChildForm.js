import {
  ProFormGroup,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";
import { Divider, Space, Typography } from "antd";
import React, { useEffect, useState } from "react";
import MenuPermissions from "../../../../components/permissionComponents/menuPermissions";
import CommissionPermission from "../../../../components/permissionComponents/commissionPermission";
import GamePermission from "../../../../components/permissionComponents/gamePermission";
import NoticeTitle from "../../../../components/hint/noticeTitle";
import BasicInformation from "../../AgentList/step/BasicInformation";
import MenuAuth from "../../AgentList/step/menuAuth";
import OptionalInfo from "../../AgentList/step/OptionalInfo";
import { useSelector } from "react-redux";
import { filterMenuKeys } from "../../../../helpers/aboutAuth/filterMenuKeys";

const CreateChildForm = ({ form }) => {
  const childDetail = useSelector((state) => state.commonDetail);

  useEffect(() => {
    if (childDetail) {
      form.setFieldsValue({
        ...childDetail,
        game_permission: filterMenuKeys(childDetail.game_permission),
        menu_permission: filterMenuKeys(childDetail.menu_permission),
        menu_editable: filterMenuKeys(childDetail.menu_editable),
      });
    }
  }, [childDetail]);

  return (
    <>
      <NoticeTitle required />
      <BasicInformation type="child" form={form} />
      <MenuAuth form={form} isChild={true} />
      <NoticeTitle optional />
      <OptionalInfo />
    </>
  );
};

export default CreateChildForm;
