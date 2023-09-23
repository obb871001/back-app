import { useDispatch, useSelector } from "react-redux";
import CustomModal from "../../modal/customModal";
import { ProForm } from "@ant-design/pro-components";
import { useForm } from "antd/es/form/Form";
import CustomForm from "../../form/customForm";
import { useEffect, useState } from "react";
import { relativeFromTime } from "../../../utils/getDay";
import { Button, Form, Space, Typography, notification } from "antd";
import { allowClick } from "../../../assets/style/styleConfig";
import GameCommission from "../../../pages/Agent/AgentList/detail/gameCommission";
import MenuPermission from "../../../pages/Agent/AgentList/detail/menuPermission";
import { filterMenuKeys } from "../../../helpers/aboutAuth/filterMenuKeys";
import GamePermissionDetail from "../../../pages/Agent/AgentList/detail/GamePermissionDetail";
import { updateAgentBasic } from "../../../api/methods/patchApi";
import { clearPopType, trigger } from "../../../redux/action/common/action";
import { useTranslation } from "react-i18next";
import { ErrorMessage } from "../../../utils/ErrorMessage";

const Profile = ({ isModalOpen, setIsModalOpen }) => {
  const { t } = useTranslation();
  const i18n = (key) => t(`page.agentinfomation.agentlist.modal.${key}`);
  const i18n_commonModal = (key) => t(`commonModal.${key}`);
  const [form] = useForm();

  const agentInfo = useSelector((state) => state.agentInfo);
  const dispatch = useDispatch();

  const [modalGameCommission, setModalGameCommission] = useState(false);
  const [modalMenuPermission, setModalMenuPermission] = useState(false);
  const [modalGamePermission, setModalGamePermission] = useState(false);
  const [modifyProfile, setModifyProfile] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

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
      label: i18n("agentAccount"),
      name: "cagent",
      readonly: true,
    },
    {
      label: i18n("agentLevel"),
      name: "level",
      readonly: true,
    },

    {
      label: i18n("loginname"),
      name: "login_name",
      readonly: true,
    },

    {
      label: i18n("nickname"),
      name: "nick_name",
      readonly: true,
    },
    {
      label: i18n("createDate"),
      name: "create_time",
      readonly: true,
    },
  ];

  const editorForm = [
    {
      label: i18n("truename"),
      name: "true_name",
      readonly: !modifyProfile,
    },
    {
      label: i18n("email"),
      name: "email",
      readonly: !modifyProfile,
    },
    {
      label: i18n("mobile"),
      name: "mobile",
      readonly: !modifyProfile,
    },
  ];
  const aboutAuth = [
    {
      label: i18n("gameCommissionDetail"),
      func: () => {
        setModalGameCommission(true);
      },
      hidden: agentInfo.type === "child",
    },
    {
      label: i18n("menuPermissionDetail"),
      func: () => {
        setModalMenuPermission(true);
      },
    },
    {
      label: i18n("gamePermissionDetail"),
      func: () => {
        setModalGamePermission(true);
      },
      hidden: agentInfo.type === "child",
    },
  ];

  const onFinish = (values) => {
    setButtonLoading(true);
    updateAgentBasic({
      uid: agentInfo.uid,
      patchData: {
        true_name: values.true_name,
        email: values.email,
        mobile: values.mobile,
      },
    })
      .then((data) => {
        setModifyProfile(false);
        notification.success({
          message: i18n_commonModal("submitSuccess"),
        });
        dispatch(trigger());
      })
      .catch((err) => {
        const errorMessage = err.response.data.message;
        notification.error({
          message: i18n_commonModal("submitFail"),
          description: ErrorMessage(errorMessage),
        });
      })
      .finally(() => {
        setButtonLoading(false);
      });
  };

  return (
    <CustomModal
      isModalOpen={isModalOpen}
      setIsModalOpen={() => {
        setIsModalOpen();
        dispatch(clearPopType());
      }}
      modalProps={{ title: i18n("profileInformation"), width: 550 }}
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
        onFinish={(values) => {
          onFinish(values);
        }}
      >
        <Typography.Title level={4}>
          {i18n("basicInformation")}{" "}
        </Typography.Title>

        {basicForm.map((item) => {
          return <CustomForm {...item} />;
        })}
        <Typography.Title level={4}>
          {i18n("editableColumns")}
          <Typography.Text
            className="text-blue-500 cursor-pointer"
            underline
            onClick={() => {
              setModifyProfile(!modifyProfile);
            }}
          >
            {modifyProfile ? i18n("cancel") : i18n("confirm")}
          </Typography.Text>
        </Typography.Title>
        {editorForm.map((item) => {
          return <CustomForm {...item} />;
        })}
        {modifyProfile && (
          <Form.Item label={i18n("action")}>
            <Space>
              <Button
                disabled={buttonLoading}
                htmlType="button"
                onClick={() => {
                  setModifyProfile(false);
                }}
              >
                {i18n("cancel")}
              </Button>

              <Button disabled={buttonLoading} htmlType="submit" type="primary">
                {i18n("confirm")}
              </Button>
            </Space>
          </Form.Item>
        )}
        <Typography.Title level={4}>
          {i18n("aboutPermission")}{" "}
        </Typography.Title>
        {aboutAuth
          .filter((item) => !item.hidden)
          .map((item) => {
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
