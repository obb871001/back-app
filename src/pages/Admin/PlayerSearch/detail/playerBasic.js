import { useDispatch, useSelector } from "react-redux";
import { Button, Divider, Form, Space, Typography, notification } from "antd";

import CustomForm from "../../../../components/form/customForm";
import UseMergeableSearchParams from "../../../../hooks/useMergeableSearchParams";
import Balance from "./settings/balance";
import { useEffect, useState } from "react";
import { ProForm } from "@ant-design/pro-components";
import { useForm } from "antd/es/form/Form";
import { updatePlayerConfig } from "../../../../api/methods/postApi";
import { filterAgentLevel } from "../../../../utils/oldUtils/filterAgentLevel";
import EditAuthColumns from "../../../../utils/EditAuthColumns";
import { useParams } from "react-router";
import { getMemberList } from "../../../../api/methods/getApi";
import { storeDetail, trigger } from "../../../../redux/action/common/action";
import { updateMemberBasic } from "../../../../api/methods/patchApi";
import { APP_NAME } from "../../../../constant";
import { useTranslation } from "react-i18next";

const PlayerBasic = () => {
  const { t } = useTranslation();
  const i18n = (key) => t(`page.admin.playersearch.col.${key}`);
  const i18n_statusCode = (key) => t(`status_code.${key}`);
  const i18n_commonModal = (key) => t(`commonModal.${key}`);

  const [searchParams, setSearchParams] = UseMergeableSearchParams();
  const { playeruid } = searchParams;

  const playerDetail = useSelector((state) => state.commonDetail);
  const triggerApi = useSelector((state) => state.trigger);
  const isCredit = useSelector((state) => state.basicConfig.is_credit === 1);
  const statusCode = useSelector((state) => state.basicConfig.statusCode);
  const dispatch = useDispatch();

  const [form] = useForm();

  const [editPlayer, setEditPlayer] = useState(false);
  const [updateButton, setUpdateButton] = useState(false);

  useEffect(() => {
    form.setFieldsValue({
      memId: playerDetail.memId,
      true_name: playerDetail.true_name,
      crypto_address: playerDetail.crypto_address,
      email: playerDetail.email,
      mobile: playerDetail.mobile,
      status: playerDetail.status,
    });
  }, [playerDetail, editPlayer]);

  const basicDetail = [
    {
      label: i18n("agent"),
      component: (
        <Form.Item label={i18n("agent")}>
          {filterAgentLevel(playerDetail)}
        </Form.Item>
      ),
    },

    {
      label: i18n("playerId"),
      name: "memId",
      type: "text",
      readonly: true,
    },
    {
      label: i18n("accountStatus"),
      name: "status",
      type: "radio",
      value: i18n_statusCode(form.getFieldValue("status")),
      readonly: !editPlayer,
      options: statusCode?.map((code) => {
        return {
          label: `${i18n_statusCode(`${code}`)}${i18n_statusCode(
            `${code}hint`
          )}`,
          value: code,
        };
      }),
      layout: "vertical",
    },

    {
      label: i18n("truename"),
      name: "true_name",
      type: "text",
      readonly: !editPlayer,
    },
    {
      label: i18n("cryptoAddress"),
      name: "crypto_address",
      type: "text",
      readonly: !editPlayer,
    },
    {
      label: i18n("email"),
      name: "email",
      type: "text",
      readonly: !editPlayer,
    },
    {
      label: i18n("mobile"),
      name: "mobile",
      type: "text",
      readonly: !editPlayer,
    },
    {
      label: i18n("registerDate"),
      value: playerDetail.create_time,
      type: "text",
      readonly: true,
    },
  ];

  const onUpdatePlayer = (values, uid) => {
    setUpdateButton(true);
    updateMemberBasic({ uid, patchData: values })
      .then((res) => {
        console.log(res);
        notification.success({
          message: i18n_commonModal("submitSuccess"),
        });
        getMemberList({
          paramsData: { uid: uid },
        }).then((res) => {
          dispatch(storeDetail(res.data.list[0]));
        });
        dispatch(trigger());

        setTimeout(() => {
          setEditPlayer(false);
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        notification.error({
          message: i18n_commonModal("submitFail"),
        });
      })
      .finally(() => {
        setTimeout(() => {
          setUpdateButton(false);
        }, 1000);
      });
  };

  return (
    <>
      <ProForm
        form={form}
        onFinish={(values) => {
          onUpdatePlayer(values, playerDetail.uid);
        }}
        initialValues={{
          email: playerDetail.email,
          mobile: playerDetail.mobile,
        }}
        layout="horizontal"
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 19,
        }}
        submitter={{
          render: (props, doms) => {
            // isCredit ? null :
            return (
              <EditAuthColumns>
                <Form.Item label={i18n("action")}>
                  {editPlayer
                    ? [
                        <Button
                          loading={updateButton}
                          key="cancel"
                          danger
                          type="primary"
                          onClick={() => {
                            setEditPlayer(false);
                          }}
                          className="mr-[10px]"
                          htmlType="button"
                        >
                          {i18n("cancel")}
                        </Button>,
                        <Button
                          loading={updateButton}
                          key="submit"
                          onClick={() => {
                            form.submit();
                          }}
                          htmlType="button"
                        >
                          {i18n("submit")}
                        </Button>,
                      ]
                    : [
                        <Button
                          key="editPlayer"
                          onClick={() => {
                            setEditPlayer(true);
                          }}
                          type="primary"
                          htmlType="button"
                        >
                          {i18n("editPlayerBasic")}
                        </Button>,
                      ]}
                </Form.Item>
              </EditAuthColumns>
            );
          },
        }}
      >
        {basicDetail.map((item) => {
          return (
            <>
              {item.component || <CustomForm {...item} />}
              {item.border && <Divider />}
            </>
          );
        })}
      </ProForm>
      <Divider />
      <Typography.Title level={4} italic>
        {i18n("walletInformation")}
      </Typography.Title>
      <Balance />
    </>
  );
};

export default PlayerBasic;
