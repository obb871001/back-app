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

const CreateAgentForm = ({ form }) => {
  const agentDetail = useSelector((state) => state.commonDetail);

  useEffect(() => {
    if (agentDetail) {
      form.setFieldsValue({
        ...agentDetail,
        gamePermission: filterMenuKeys(agentDetail.gamePermission),
        menuPermission: filterMenuKeys(agentDetail.menuPermission),
        menuEditable: filterMenuKeys(agentDetail.menuEditable),
      });
    }
  }, [agentDetail]);

  return (
    <>
      <NoticeTitle required />
      <BasicInformation form={form} />
      <MenuAuth form={form} />
      <GameAuth form={form} />
      <GameCommission form={form} />
      <NoticeTitle optional />
      <OptionalInfo />
    </>
  );
};

export default CreateAgentForm;
