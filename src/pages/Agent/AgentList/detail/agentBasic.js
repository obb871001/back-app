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

const AgentBasic = ({ type }) => {
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
      label: "代理上線",
      type: "text",
      value: filterAgentLevel(agentDetail),
      agentType: true,
    },

    {
      label: type === "child" ? "子帳號名稱" : "代理名稱",
      name: "cagent",
      type: "text",
      agentType: true,
    },
    {
      label: type === "child" ? "子帳號等級" : "代理等級",
      name: "level",
      type: "number",
      addonAfter: "級",
      agentType: true,
    },

    {
      label: type === "child" ? "子帳號編號" : "代理編號",
      name: "uid",
      type: "number",
      addonBefore: "No.",
      agentType: true,
    },
    {
      label: type === "child" ? "子帳號暱稱" : "代理暱稱",
      name: "nick_name",
      type: "text",
      agentType: true,
    },
    {
      component: (
        <Form.Item label="帳號狀態">
          <Tag color={agentDetail.status == 1 ? "green" : "red"}>
            {agentDetail.status == 1 ? "開啟" : "關閉"}
          </Tag>
        </Form.Item>
      ),
      agentType: true,
    },

    {
      label: "真實姓名",
      name: "true_name",
      type: "text",
      agentType: true,
    },
    {
      label: "登入名稱",
      name: "login_name",
      type: "text",
      agentType: true,
    },

    {
      label: "手機",
      name: "mobile",
      type: "text",
      agentType: true,
    },
    {
      label: "創建日期",
      name: "create_time",
      type: "text",
      agentType: true,
    },
    {
      label: "上次登入日期",
      name: "oauth",
      type: "text",
      agentType: true,
    },

    {
      label: "Email",
      name: "email",
      type: "text",
      agentType: true,
    },
    {
      component: (
        <Form.Item label="遊戲佔成狀態">
          <span
            className={`${allowClick} underline`}
            onClick={() => setModalGameCommission(true)}
          >
            查看
          </span>
        </Form.Item>
      ),
      agentType: type === "agent",
    },
    {
      component: (
        <Form.Item label="選單權限">
          <span
            className={`${allowClick} underline`}
            onClick={() => setModalMenuPermission(true)}
          >
            查看
          </span>
        </Form.Item>
      ),
      agentType: true,
    },
    {
      component: (
        <Form.Item label="遊戲權限">
          <span
            className={`${allowClick} underline`}
            onClick={() => setModalGamePermission(true)}
          >
            查看
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
