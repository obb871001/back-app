import {
  ProFormGroup,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";
import { Divider, Space, Typography } from "antd";
import React, { useEffect, useState } from "react";
import BasicInformation from "../step/BasicInformation";
import GameAuth from "../step/gameAuth";
import MenuAuth from "../step/menuAuth";
import GameCommission from "../step/gameCommission";
import NoticeTitle from "../../../../components/hint/noticeTitle";
import OptionalInfo from "../step/OptionalInfo";
import { useSelector } from "react-redux";
import { filterMenuKeys } from "../../../../helpers/aboutAuth/filterMenuKeys";
import { isEmptyObject } from "../../../../utils/isEmptyObject";

const CreateAgentForm = ({ form }) => {
  const agentDetail = useSelector((state) => state.commonDetail);

  useEffect(() => {
    if (!isEmptyObject(agentDetail)) {
      form.setFieldsValue({
        ...agentDetail,
        game_permission: filterMenuKeys(agentDetail.game_permission),
        menu_permission: filterMenuKeys(agentDetail.menu_permission),
        menu_editable: filterMenuKeys(agentDetail.menu_editable),
      });
    } else {
      form.setFieldsValue({
        status: 1,
      });
    }
  }, [agentDetail]);

  return (
    <>
      <NoticeTitle required />
      <BasicInformation form={form} />
      <MenuAuth form={form} />
      <GameAuth form={form} />
      <GameCommission prefix="per" form={form} />
      <NoticeTitle optional />
      <OptionalInfo />
    </>
  );
};

export default CreateAgentForm;
