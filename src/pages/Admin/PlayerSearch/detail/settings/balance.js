import { ProForm, ProFormDigit, ProFormText } from "@ant-design/pro-components";
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
import { useTranslation } from "react-i18next";

const Balance = () => {
  const { t } = useTranslation();
  const i18n = (key) => t(`page.admin.playersearch.col.${key}`);
  const i18n_commonModal = (key) => t(`commonModal.${key}`);

  const [searchParams, setSearchParams] = UseMergeableSearchParams();
  const { uid, tabKey } = searchParams;

  const playerDetail = useSelector((state) => state.commonDetail);
  const CURRENCY = useSelector((state) => state.CURRENCY);
  const isCredit = useSelector((state) => state.basicConfig.is_credit === 1);
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
      cagent_memo: form.getFieldValue("cagent_memo") || "",
      member_memo: form.getFieldValue("member_memo") || "",
    };
    setButtonLoading(true);
    action({ paramsData: paramsData })
      .then((res) => {
        dispatch(trigger());
        notification.success({
          message: i18n_commonModal("submitSuccess"),
        });
        setEditBalance(false);
        form.resetFields();
      })
      .catch((err) => {
        const data = err.response.data;
        notification.error({
          message: i18n_commonModal("submitFail"),
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
        label={i18n("accountBalance")}
        value={playerDetail.balance || 0}
        readonly
        addonAfter={CURRENCY}
      />
      {editBalance && (
        <>
          <ProFormDigit
            label={i18n("amounts")}
            name="change_point"
            min={0}
            readonly={!editBalance}
            fieldProps={{
              addonAfter: CURRENCY,
            }}
          />

          {!isCredit && (
            <ProFormDigit
              label={
                <CommonTooltip
                  title={i18n("depositWashpoints")}
                  tooltip={i18n("withdrawDontInputThisField")}
                />
              }
              min={0}
              placeholder={i18n("withdrawDontInputThisField")}
              name="change_wash"
              readonly={!editBalance}
              fieldProps={{
                addonAfter: CURRENCY,
              }}
            />
          )}
          <ProFormText
            label={
              <CommonTooltip
                title={i18n("cagentMemo")}
                tooltip={i18n("cagentMemoHint")}
              />
            }
            placeholder={`${i18n("cagentMemoEx")}${CURRENCY}`}
            name="cagent_memo"
          />
          <ProFormText
            label={
              <CommonTooltip
                title={i18n("playerMemo")}
                tooltip={i18n("playerMemoHint")}
              />
            }
            placeholder={`${i18n("playerMemoEx")}${CURRENCY}`}
            name="member_memo"
          />
        </>
      )}
      <EditAuthColumns>
        <Form.Item label={i18n("action")}>
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
                  {i18n("deposit")}
                </Button>
                <Button
                  icon={<SwapOutlined />}
                  onClick={() => handleDepositToPlayer("withdraw")}
                  type="dashed"
                  htmlType="button"
                  loading={buttonLoading}
                >
                  {i18n("withdraw")}
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
              {editBalance ? i18n("cancel") : i18n("editBalance")}
            </Button>
          </section>
        </Form.Item>
      </EditAuthColumns>

      {!isCredit && (
        <>
          <Divider dashed />
          <Form.Item
            className="custom-form-mb-0"
            label={i18n("playerWashNow")}
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
            <Form.Item label={i18n("action")}>
              {editWashCheck ? (
                <Space>
                  <Button
                    htmlType="button"
                    onClick={() => {
                      setEditWashCheck(false);
                    }}
                  >
                    {i18n("cancel")}
                  </Button>
                  <Button htmlType="button" type="primary">
                    {i18n("updateWashpoints")}
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
                  {i18n("editWashPoints")}
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
