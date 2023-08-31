import { ProForm, ProFormDigit } from "@ant-design/pro-components";
import { Button, Divider, Form, Space, notification } from "antd";
import React, { useEffect, useState } from "react";
import CommonTooltip from "../../../../../components/hint/commonTooltip";
import {
  DollarCircleOutlined,
  SettingTwoTone,
  SwapOutlined,
} from "@ant-design/icons";
import UseMergeableSearchParams from "../../../../../hooks/useMergeableSearchParams";
import { useDispatch, useSelector } from "react-redux";
import {
  depositToPlayer,
  withdrawToPlayer,
} from "../../../../../api/methods/postApi";
import { APP_NAME } from "../../../../../constant";
import { useForm } from "antd/es/form/Form";
import EditAuthPage from "../../../../../utils/EditAuthPage";
import EditAuthColumns from "../../../../../utils/EditAuthColumns";
import { trigger } from "../../../../../redux/action/common/action";

const Balance = () => {
  const [searchParams, setSearchParams] = UseMergeableSearchParams();
  const { uid, tabKey } = searchParams;

  const playerDetail = useSelector((state) => state.commonDetail);
  const CURRENCY = useSelector((state) => state.CURRENCY);
  const dispatch = useDispatch();

  const [form] = useForm();

  const [editBalance, setEditBalance] = useState(false);
  const [editWashCheck, setEditWashCheck] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    //切換頁籤重置欄位
    setEditBalance(false);
  }, [tabKey]);

  const handleDepositToPlayer = (methodType) => {
    const action =
      methodType === "deposit" ? depositToPlayer : withdrawToPlayer;
    const paramsData = {
      uid: uid,
      change_point: form.getFieldValue("change_point") || 0,
      use_bank: "Bank",
      ...(methodType === "deposit" && {
        change_wash: form.getFieldValue("change_wash") || 0,
      }),
    };
    setButtonLoading(true);
    action({ paramsData: paramsData })
      .then((res) => {
        dispatch(trigger());
        notification.success({
          message: "提交成功",
        });
        setEditBalance(false);
        form.resetFields();
      })
      .catch((err) => {
        const data = err.response.data;
        notification.error({
          message: "提交失敗",
        });
      })
      .finally(() => {
        setButtonLoading(false);
      });
  };

  return (
    <ProForm
      layout="horizontal"
      labelCol={{
        span: 5,
      }}
      wrapperCol={{
        span: 19,
      }}
      form={form}
      onValuesChange={(changedValues, allValues) => {
        console.log(changedValues, allValues);
      }}
      submitter={false}
    >
      <ProFormDigit
        label={`帳戶餘額`}
        value={playerDetail.balance || 0}
        readonly
        addonAfter={CURRENCY}
      />
      {editBalance && (
        <>
          <ProFormDigit
            label={`金額`}
            name="change_point"
            min={0}
            readonly={!editBalance}
            fieldProps={{
              addonAfter: CURRENCY,
            }}
          />

          {APP_NAME !== "PAIGOW" && (
            <ProFormDigit
              label={
                <CommonTooltip
                  title="存款洗碼量"
                  tooltip="提款無需輸入此欄位"
                />
              }
              min={0}
              placeholder={`提款無需輸入此欄位`}
              name="change_wash"
              readonly={!editBalance}
              fieldProps={{
                addonAfter: CURRENCY,
              }}
            />
          )}
        </>
      )}
      <EditAuthColumns>
        <Form.Item label="操作">
          <section className="flex items-center gap-[10px]">
            {editBalance && (
              <>
                <Button
                  icon={<DollarCircleOutlined />}
                  onClick={() => handleDepositToPlayer("deposit")}
                  type="dashed"
                  htmlType="button"
                  loading={buttonLoading}
                >
                  存款
                </Button>
                <Button
                  icon={<SwapOutlined />}
                  onClick={() => handleDepositToPlayer("withdraw")}
                  type="dashed"
                  htmlType="button"
                  loading={buttonLoading}
                >
                  提款
                </Button>
              </>
            )}
            <Button
              onClick={() => {
                setEditBalance((prev) => !prev);
                form.resetFields();
              }}
              htmlType="button"
              type="primary"
              danger={editBalance}
              loading={buttonLoading}
            >
              {editBalance ? "取消" : "編輯餘額"}
            </Button>
          </section>
        </Form.Item>
      </EditAuthColumns>

      {APP_NAME !== "PAIGOW" && (
        <>
          <Divider dashed />
          <Form.Item
            className="custom-form-mb-0"
            label="該玩家目前洗碼量"
            name="wash_check"
          >
            <ProFormDigit
              min={0}
              readonly={!editWashCheck}
              fieldProps={{
                addonAfter: CURRENCY,
              }}
              addonAfter={!editWashCheck && CURRENCY}
              value={playerDetail.wash_check || 0}
            />
          </Form.Item>
          <EditAuthColumns>
            <Form.Item label="操作">
              {editWashCheck ? (
                <Space>
                  <Button
                    htmlType="button"
                    onClick={() => {
                      setEditWashCheck(false);
                    }}
                  >
                    取消
                  </Button>
                  <Button htmlType="button" type="primary">
                    更新洗碼量
                  </Button>
                </Space>
              ) : (
                <Button
                  htmlType="button"
                  type="primary"
                  onClick={() => {
                    setEditWashCheck(true);
                  }}
                >
                  編輯洗碼量
                </Button>
              )}
            </Form.Item>
          </EditAuthColumns>
        </>
      )}
    </ProForm>
  );
};

export default Balance;
