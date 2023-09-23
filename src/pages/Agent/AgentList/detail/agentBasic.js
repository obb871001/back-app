import { ProFormGroup, ProFormSwitch } from "@ant-design/pro-components";
import { Divider, Form, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CustomForm from "../../../../components/form/customForm";
import { useForm } from "antd/es/form/Form";
import { allowClick } from "../../../../assets/style/styleConfig";
import GameCommission from "./gameCommission";
import MenuPermission from "./menuPermission";
import { filterMenuKeys } from "../../../../helpers/aboutAuth/filterMenuKeys";
import GamePermissionDetail from "./GamePermissionDetail";
import { filterAgentLevel } from "../../../../utils/oldUtils/filterAgentLevel";
import { useTranslation } from "react-i18next";
import { color } from "../utils/statusCodeColor";
import FilterLevelName from "../../../../utils/filterLevelName";

const AgentBasic = ({ type }) => {
  const { t } = useTranslation();
  const i18n = (key) => t(`page.agentinfomation.agentlist.modal.${key}`);
  const i18n_unit = (key) => t(`unit.${key}`);
  const i18n_statusCode = (key) => t(`status_code.${key}`);
  const i18n_switch = (key) => t(`switch.${key}`);

  const agentDetail = useSelector((state) => state.commonDetail);

  const [form] = useForm();

  const [modalGameCommission, setModalGameCommission] = useState(false);
  const [modalMenuPermission, setModalMenuPermission] = useState(false);
  const [modalGamePermission, setModalGamePermission] = useState(false);

  useEffect(() => {
    if (agentDetail) {
      form.setFieldsValue({
        ...agentDetail,
        game_permission: filterMenuKeys(agentDetail.game_permission),
        menu_permission: filterMenuKeys(agentDetail.menu_permission),
        menu_editable: filterMenuKeys(agentDetail.menu_editable),
      });
    }
  }, [agentDetail]);

  const basicForm = [
    {
      label: i18n("agentLine"),
      type: "text",
      value: filterAgentLevel(agentDetail),
      agentType: true,
    },

    {
      label: type === "child" ? i18n("childName") : i18n("agentName"),
      name: "cagent",
      type: "text",
      agentType: true,
    },
    {
      label: type === "child" ? i18n("childLevel") : i18n("agentLevel"),
      name: "level",
      type: "number",
      addonAfter: i18n_unit("level"),
      agentType: true,
      component: (
        <Form.Item
          label={type === "child" ? i18n("childLevel") : i18n("agentLevel")}
        >
          {FilterLevelName(type, agentDetail.level)}
        </Form.Item>
      ),
    },

    {
      label: type === "child" ? i18n("childNumber") : i18n("agentNumber"),
      name: "uid",
      type: "number",
      addonBefore: "No.",
      agentType: true,
    },
    {
      label: type === "child" ? i18n("childNickname") : i18n("agentNickname"),
      name: "nick_name",
      type: "text",
      agentType: true,
    },
    {
      component: (
        <Form.Item label={i18n("accountStatus")}>
          <Tag color={color(agentDetail.status)}>
            {i18n_statusCode(`${agentDetail.status}`)}
          </Tag>
        </Form.Item>
      ),
      agentType: true,
    },

    {
      label: i18n("truename"),
      name: "true_name",
      type: "text",
      agentType: true,
    },
    {
      label: i18n("loginname"),
      name: "login_name",
      type: "text",
      agentType: true,
    },

    {
      label: i18n("mobile"),
      name: "mobile",
      type: "text",
      agentType: true,
    },
    {
      label: i18n("createDate"),
      name: "create_time",
      type: "text",
      agentType: true,
    },
    {
      label: i18n("lastLoginDate"),
      name: "oauth",
      type: "text",
      agentType: true,
    },

    {
      label: i18n("email"),
      name: "email",
      type: "text",
      agentType: true,
    },
    {
      component: (
        <Form.Item label={i18n("gameCommission")}>
          <span
            className={`${allowClick} underline`}
            onClick={() => setModalGameCommission(true)}
          >
            {i18n("view")}
          </span>
        </Form.Item>
      ),
      agentType: type === "agent",
    },
    {
      component: (
        <Form.Item label={i18n("menuPermission")}>
          <span
            className={`${allowClick} underline`}
            onClick={() => setModalMenuPermission(true)}
          >
            {i18n("view")}
          </span>
        </Form.Item>
      ),
      agentType: true,
    },
    {
      component: (
        <Form.Item label={i18n("gamePermission")}>
          <span
            className={`${allowClick} underline`}
            onClick={() => setModalGamePermission(true)}
          >
            {i18n("view")}
          </span>
        </Form.Item>
      ),
      agentType: type === "agent",
    },
  ];

  return (
    <>
      <Form
        form={form}
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 19,
        }}
      >
        {" "}
        {basicForm
          .filter((item) => item.agentType)
          .map((item) => {
            return item.component || <CustomForm readonly {...item} />;
          })}
      </Form>
      {modalGameCommission && (
        <GameCommission
          isModalOpen={modalGameCommission}
          setIsModalOpen={setModalGameCommission}
          props={agentDetail}
        />
      )}
      {modalMenuPermission && (
        <MenuPermission
          isModalOpen={modalMenuPermission}
          setIsModalOpen={setModalMenuPermission}
          props={agentDetail}
          form={form}
        />
      )}
      {modalGamePermission && (
        <GamePermissionDetail
          isModalOpen={modalGamePermission}
          setIsModalOpen={setModalGamePermission}
          props={agentDetail}
          form={form}
        />
      )}
    </>
  );
};

export default AgentBasic;
