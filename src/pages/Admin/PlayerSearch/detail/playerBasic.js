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

const PlayerBasic = () => {
  const [searchParams, setSearchParams] = UseMergeableSearchParams();
  const { playeruid } = searchParams;

  const playerDetail = useSelector((state) => state.commonDetail);
  const triggerApi = useSelector((state) => state.trigger);
  const dispatch = useDispatch();

  const [form] = useForm();

  useEffect(() => {
    form.setFieldsValue({
      true_name: playerDetail.true_name,
      crypto_address: playerDetail.crypto_address,
      email: playerDetail.email,
      mobile: playerDetail.mobile,
    });
  }, [playerDetail]);

  const [editPlayer, setEditPlayer] = useState(false);
  const [updateButton, setUpdateButton] = useState(false);

  const basicDetail = [
    {
      label: "代理上線",
      component: (
        <Form.Item label="代理上線">{filterAgentLevel(playerDetail)}</Form.Item>
      ),
    },

    {
      label: "玩家名稱",
      name: "memId",
      type: "text",
      readonly: true,
    },
    {
      label: "真實姓名",
      name: "true_name",
      type: "text",
      readonly: !editPlayer,
    },
    {
      label: "虛擬貨幣錢包地址",
      name: "crypto_address",
      type: "text",
      readonly: !editPlayer,
    },
    {
      label: "電子郵件",
      name: "email",
      type: "text",
      readonly: !editPlayer,
    },
    {
      label: "手機號碼",
      name: "mobile",
      type: "text",
      readonly: !editPlayer,
    },
    {
      label: "註冊日期",
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
          message: "提交成功",
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
          message: "提交失敗",
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
            return APP_NAME === "PAIGOW" ? null : (
              <EditAuthColumns>
                <Form.Item label="操作">
                  {editPlayer
                    ? [
                        <Button
                          loading={updateButton}
                          key="cancel"
                          danger
                          type="primary"
                          onClick={() => {
                            setEditPlayer(false);
                            form.resetFields();
                          }}
                          className="mr-[10px]"
                          htmlType="button"
                        >
                          取消
                        </Button>,
                        <Button
                          loading={updateButton}
                          key="submit"
                          onClick={() => {
                            form.submit();
                          }}
                          htmlType="button"
                        >
                          提交
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
                          編輯玩家基本資料
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
        錢包資訊
      </Typography.Title>
      <Balance />
    </>
  );
};

export default PlayerBasic;
