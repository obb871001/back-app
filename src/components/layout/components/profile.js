import { useSelector } from "react-redux";
import CustomModal from "../../modal/customModal";
import { ProForm } from "@ant-design/pro-components";
import { useForm } from "antd/es/form/Form";
import CustomForm from "../../form/customForm";
import { useEffect, useState } from "react";
import { relativeFromTime } from "../../../utils/getDay";
import { Button, Form, Space, Typography } from "antd";
import { allowClick } from "../../../assets/style/styleConfig";
import GameCommission from "../../../pages/Agent/AgentList/detail/gameCommission";
import MenuPermission from "../../../pages/Agent/AgentList/detail/menuPermission";
import { filterMenuKeys } from "../../../helpers/aboutAuth/filterMenuKeys";
import GamePermissionDetail from "../../../pages/Agent/AgentList/detail/GamePermissionDetail";

const Profile = ({ isModalOpen, setIsModalOpen }) => {
  const [form] = useForm();

  const agentInfo = useSelector((state) => state.agentInfo);

  const [modalGameCommission, setModalGameCommission] = useState(false);
  const [modalMenuPermission, setModalMenuPermission] = useState(false);
  const [modalGamePermission, setModalGamePermission] = useState(false);
  const [modifyProfile, setModifyProfile] = useState(false);

  useEffect(() => {
    if (agentInfo) {
      form.setFieldsValue({
        ...agentInfo,
        create_time: relativeFromTime(agentInfo.create_time),
        game_permission: filterMenuKeys(agentInfo.game_permission),
        menu_permission: filterMenuKeys(agentInfo.menu_permission),
        menu_editable: filterMenuKeys(agentInfo.menu_editable),
      });
    }
  }, []);

  const basicForm = [
    {
      label: "代理帳號",
      name: "cagent",
      readonly: true,
    },
    {
      label: "代理等級",
      name: "level",
      readonly: true,
    },

    {
      label: "登入名稱",
      name: "login_name",
      readonly: true,
    },

    {
      label: "暱稱",
      name: "nick_name",
      readonly: true,
    },
    {
      label: "創建時間",
      name: "create_time",
      readonly: true,
    },
  ];

  const editorForm = [
    {
      label: "真實姓名",
      name: "true_name",
      readonly: !modifyProfile,
    },
    {
      label: "電子郵件",
      name: "email",
      readonly: !modifyProfile,
    },
    {
      label: "手機號碼",
      name: "mobile",
      readonly: !modifyProfile,
    },
  ];
  const aboutAuth = [
    {
      label: "遊戲佔成狀態",
      func: () => {
        setModalGameCommission(true);
      },
    },
    {
      label: "選單權限",
      func: () => {
        setModalMenuPermission(true);
      },
    },
    {
      label: "遊戲權限",
      func: () => {
        setModalGamePermission(true);
      },
    },
  ];

  return (
    <CustomModal
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      modalProps={{ title: `個人資料`, width: 550 }}
    >
      <ProForm
        form={form}
        layout="horizontal"
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 19,
        }}
        submitter={false}
      >
        <Typography.Title level={4}>基本資料 </Typography.Title>

        {basicForm.map((item) => {
          return <CustomForm {...item} />;
        })}
        <Typography.Title level={4}>
          可編輯欄位{" "}
          <Typography.Text
            className="text-blue-500 cursor-pointer"
            underline
            onClick={() => {
              setModifyProfile(!modifyProfile);
            }}
          >
            {modifyProfile ? "取消" : "修改"}
          </Typography.Text>
        </Typography.Title>
        {editorForm.map((item) => {
          return <CustomForm {...item} />;
        })}
        {modifyProfile && (
          <Form.Item label="操作">
            <Space>
              <Button
                htmlType="button"
                onClick={() => {
                  setModifyProfile(false);
                }}
              >
                取消
              </Button>

              <Button htmlType="submit" type="primary">
                提交
              </Button>
            </Space>
          </Form.Item>
        )}
        <Typography.Title level={4}>權限相關 </Typography.Title>
        {aboutAuth.map((item) => {
          return (
            <Form.Item label={item.label}>
              <span className={`${allowClick} underline`} onClick={item.func}>
                查看
              </span>
            </Form.Item>
          );
        })}
      </ProForm>
      {modalGameCommission && (
        <GameCommission
          isModalOpen={modalGameCommission}
          setIsModalOpen={setModalGameCommission}
          props={agentInfo}
        />
      )}
      {modalMenuPermission && (
        <MenuPermission
          isModalOpen={modalMenuPermission}
          setIsModalOpen={setModalMenuPermission}
          form={form}
        />
      )}
      {modalGamePermission && (
        <GamePermissionDetail
          isModalOpen={modalGamePermission}
          setIsModalOpen={setModalGamePermission}
          form={form}
        />
      )}
    </CustomModal>
  );
};

export default Profile;
