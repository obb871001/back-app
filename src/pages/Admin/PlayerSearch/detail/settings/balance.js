import {
  ProForm,
  ProFormDigit,
  ProFormRadio,
  ProFormText,
} from "@ant-design/pro-components";
import {
  Button,
  Col,
  Divider,
  Form,
  Modal,
  Row,
  Space,
  Typography,
  notification,
} from "antd";
import React, { Fragment, useEffect, useMemo, useState } from "react";
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
import NumberColumns from "../../../../../components/table/numberColumns";

const Balance = () => {
  const { t } = useTranslation();
  const i18n = (key) => t(`page.admin.playersearch.col.${key}`);
  const i18n_commonModal = (key) => t(`commonModal.${key}`);

  const [searchParams, setSearchParams] = UseMergeableSearchParams();
  const { commonUid, tabKey } = searchParams;

  const playerDetail = useSelector((state) => state.commonDetail);
  const agentInfo = useSelector((state) => state.agentInfo);
  const CURRENCY = useSelector((state) => state.CURRENCY);
  const isCredit = useSelector((state) => state.basicConfig.is_credit === 1);
  const dispatch = useDispatch();

  const [form] = useForm();

  const [editBalance, setEditBalance] = useState(false);
  const [editWashCheck, setEditWashCheck] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [actionType, setActionType] = useState(0); //1:存款 2:提款
  const [formData, setFormData] = useState({});

  useEffect(() => {
    //切換頁籤重置欄位
    setEditBalance(false);
  }, [tabKey]);

  const handleDepositToPlayer = (methodType) => {
    const action = methodType === 1 ? depositToPlayer : withdrawToPlayer;
    if (
      methodType === 1 &&
      agentInfo?.[isCredit ? "credit" : "vpoint"] -
        form.getFieldValue("change_point") <
        0
    ) {
      notification.error({
        message: i18n("balanceNotEnough"),
      });
      return;
    }
    if (
      methodType === 2 &&
      playerDetail.balance - form.getFieldValue("change_point") < 0
    ) {
      notification.error({
        message: i18n("balanceNotEnough"),
      });
      return;
    }
    const paramsData = {
      uid: commonUid,
      change_point: form.getFieldValue("change_point") || 0,
      use_bank: "Bank",
      ...(methodType === 1 && {
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

  const data = useMemo(() => {
    const depositTotal = playerDetail.balance + formData.change_point;
    const withdrawTotal = playerDetail.balance - formData.change_point;

    return [
      {
        label: "yourBalance",
        value: `${agentInfo?.[isCredit ? "credit" : "vpoint"]}${CURRENCY}`,
      },
      { label: "target", value: playerDetail.memId },
      { label: "targetBalance", value: playerDetail.balance },
      {
        label: "action",
        value: actionType === 1 ? i18n("deposit") : i18n("withdraw"),
      },
      {
        label: "yourAfterBalance",
        value: `${
          agentInfo?.[isCredit ? "credit" : "vpoint"] - formData.change_point
        }${CURRENCY}`,
      },

      {
        label: "afterBalance",
        value: `${actionType === 1 ? depositTotal : withdrawTotal}${CURRENCY}`,
      },
      {
        label: "amounts",
        value: `${formData.change_point}${CURRENCY}`,
        className: "!font-bold",
      },
      { label: "cagentMemo", value: formData.cagent_memo || "-" },
      { label: "playerMemo", value: formData.member_memo || "-" },
    ];
  }, [formData]);

  const confirmModal = () => {
    Modal.confirm({
      title: i18n("confirmTitle"),
      icon: <SettingTwoTone />,
      content: (
        <Row gutter={[16, 8]}>
          {data.map((item, index) => (
            <Fragment key={index}>
              <Col span={8}>
                <Typography.Text className={item.className}>
                  {i18n(item.label)}：
                </Typography.Text>
              </Col>
              <Col span={16}>
                <Typography.Text>{item.value}</Typography.Text>
              </Col>
              {index === 3 && <Divider className="!my-[5px]" />}
            </Fragment>
          ))}
        </Row>
      ),
      okText: i18n("confirmOkText"),
      cancelText: i18n("confirmCancelText"),
      onOk: () => {
        handleDepositToPlayer(actionType);
      },
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
        setFormData(allValues);
      }}
      submitter={false}
    >
      <ProFormDigit
        label={i18n("accountBalance")}
        value={playerDetail.balance || 0}
        readonly
        addonAfter={CURRENCY}
      />

      {isCredit ? (
        <ProFormDigit
          label={i18n("yourBalance")}
          value={agentInfo?.[isCredit ? "credit" : "vpoint"] || 0}
          readonly
          addonAfter={CURRENCY}
        />
      ) : null}

      {editBalance && (
        <>
          <ProFormRadio.Group
            label={i18n("action")}
            name="actionType"
            onChange={(e) => {
              setActionType(e.target.value);
            }}
            value={actionType}
            options={[
              { label: i18n("deposit"), value: 1 },
              { label: i18n("withdraw"), value: 2 },
            ]}
          />
          <ProFormDigit
            label={i18n("amounts")}
            name="change_point"
            min={0}
            readonly={!editBalance}
            fieldProps={{
              addonAfter: CURRENCY,
            }}
          />

          {!isCredit && actionType === 1 ? (
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
          ) : null}
          {actionType !== 0 && (
            <>
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
        </>
      )}
      <EditAuthColumns>
        <Form.Item label={i18n("action")}>
          <section className="flex items-center gap-[10px]">
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
            {editBalance && (
              <>
                <Button
                  disabled={actionType === 0 || !formData.change_point}
                  onClick={() => confirmModal()}
                  type="primary"
                  htmlType="button"
                  loading={buttonLoading}
                >
                  {i18n("submit")}
                </Button>
              </>
            )}
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
                      setActionType(0);
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
