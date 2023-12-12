import React, { useEffect, useRef, useState } from "react";
import CommonTitle from "../../../../components/form/commonTitle";
import {
  ProCard,
  ProFormGroup,
  ProFormText,
  StepsForm,
} from "@ant-design/pro-components";
import CustomForm from "../../../../components/form/customForm";
import {
  Card,
  Collapse,
  Divider,
  Typography,
  message,
  notification,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { CopyFilled, CopyTwoTone } from "@ant-design/icons";
import { createVipLevel } from "../../../../api/methods/postApi";
import { useNavigate, useParams } from "react-router";
import { getVipList } from "../../../../api/methods/getApi";
import { updateVipLevel } from "../../../../api/methods/patchApi";
import { useTranslation } from "react-i18next";
import { CURRENCY } from "../../../../constant";
import { trigger } from "../../../../redux/action/common/action";

const CreateVipStep = ({ rebateAndTableLimitOptions, form }) => {
  const { t } = useTranslation();
  const i18n = (key) => t(`page.systemsetting.vipList.${key}`);
  const i18n_common = (key) => t(`commonModal.${key}`);
  const i18n_unit = (key) => t(`unit.${key}`);

  const vipGameList = useSelector((state) => state.vipList?.game);
  const popType = useSelector((state) => state.popType);
  const dispatch = useDispatch();

  const [storeDetail, setStoreDetail] = useState({});

  const navigate = useNavigate();

  const { uid } = useParams();

  const basicForm = [
    [
      {
        label: i18n("form.vipName"),
        name: "level",
        type: "number",
        min: 0,
        placeholder: i18n("hint.vipName"),
        required: true,
      },
    ],
    [
      {
        label: i18n("form.vipNameDescprition"),
        name: "name",
        type: "text",
        placeholder: i18n("hint.vipNameDescprition"),
        required: true,
      },
    ],
    [
      {
        label: i18n("form.vipContentDescprition"),
        name: "comment",
        type: "textarea",
        placeholder: i18n("hint.vipContentDescprition"),
      },
    ],
  ];

  const rebateForm = [
    [
      {
        label: i18n("form.rebateTypeName"),
        name: "RebateGroupName",
        type: "text",
        placeholder: i18n("hint.rebateTypeName"),
        required: true,
      },
    ],
    [
      {
        label: i18n("form.rebateTypeDescrition"),
        name: "RebateGroupComment",
        type: "textarea",
        placeholder: i18n("hint.rebateTypeDescrition"),
      },
    ],
  ];

  const tableLimitForm = [
    [
      {
        label: i18n("form.betLimitName"),
        name: "TableLimitGroupName",
        type: "text",
        placeholder: i18n("hint.betLimitName"),
        required: true,
      },
    ],
    [
      {
        label: i18n("form.betLimitDescrition"),
        name: "TableLimitGroupComment",
        type: "textarea",
        placeholder: i18n("hint.betLimitDescrition"),
      },
    ],
  ];

  const handleRebateCopy = ({ gameUid = "" } = {}) => {
    const rebateValue = formRef.current.getFieldValue(`${gameUid}rebate`);
    const rebateDaysValue = formRef.current.getFieldValue(
      `${gameUid}rebate_days`
    );
    const valueObj = {};
    vipGameList.forEach((key, index) => {
      valueObj[`${key?.uid}rebate`] = rebateValue;
      valueObj[`${key?.uid}rebate_days`] = rebateDaysValue;
    });
    formRef.current.setFieldsValue({ ...valueObj });
  };

  const handleTableCopy = ({ gameUid = "" } = {}) => {
    const minLimiteValue = formRef.current.getFieldValue(`${gameUid}min_limit`);
    const maxLimitValue = formRef.current.getFieldValue(`${gameUid}max_limit`);
    const winLimitValue = formRef.current.getFieldValue(`${gameUid}win_limit`);
    const valueObj = {};
    vipGameList.forEach((key, index) => {
      valueObj[`${key?.uid}min_limit`] = minLimiteValue;
      valueObj[`${key?.uid}max_limit`] = maxLimitValue;
      valueObj[`${key?.uid}win_limit`] = winLimitValue;
    });
    formRef.current.setFieldsValue({ ...valueObj });
  };

  const waitTime = (time) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };

  const formRef = useRef();

  const handleSubmit = async (formData) => {
    await waitTime(2000);
    try {
      if (popType === "edit") {
        await updateVipLevel({
          uid: uid,
          formData,
        }).then((data) => {
          notification.success({
            message: i18n_common("submitSuccess"),
          });
        });
      } else {
        await createVipLevel({
          formData,
        }).then((data) => {
          notification.success({
            message: i18n_common("submitSuccess"),
          });
        });
      }
      dispatch(trigger());
      navigate(-1);
    } catch (err) {
      throw err;
    } finally {
    }
  };

  useEffect(() => {
    if (uid) {
      if (popType === "detail") {
        // setReadOnly(true);
      }
      getVipList({
        paramsData: { uid: uid },
      }).then((data) => {
        console.log(data);
        const detail = data?.vipinfo?.[0];
        setStoreDetail(detail);
        formRef?.current?.forEach((formInstanceRef) => {
          formInstanceRef?.current?.setFieldsValue(detail);
        });
      });
    }
  }, [uid, popType]);

  return (
    <ProCard>
      <StepsForm formMapRef={formRef} onFinish={handleSubmit}>
        <StepsForm.StepForm
          title={i18n("form.basicSetting")}
          stepProps={
            {
              // className: "!mx-0",
            }
          }
        >
          <Divider />
          {basicForm?.map((group) => {
            return (
              <ProFormGroup>
                {group.map((item) => {
                  return <CustomForm width={250} {...item} />;
                })}
              </ProFormGroup>
            );
          })}
        </StepsForm.StepForm>
        <StepsForm.StepForm title={i18n("form.rebateSetting")}>
          <div className="mb-[20px]">
            {rebateForm?.map((group) => {
              return (
                <ProFormGroup>
                  {group.map((item) => {
                    return <CustomForm {...item} />;
                  })}
                </ProFormGroup>
              );
            })}

            <Collapse
              items={[
                {
                  key: "1",
                  label: i18n("form.rebateDetail"),
                  children: vipGameList?.map((item, index) => {
                    return (
                      <Card
                        style={{
                          marginTop: 16,
                        }}
                        type="inner"
                        title={
                          <Typography.Text>
                            {item?.platform}{" "}
                            {index === 0 && (
                              <CopyTwoTone
                                onClick={() => {
                                  handleRebateCopy({ gameUid: item?.uid });
                                }}
                                className="cursor-pointer"
                              />
                            )}
                          </Typography.Text>
                        }
                      >
                        <ProFormGroup>
                          <CustomForm
                            label={i18n("form.rebatePercent")}
                            name={`${item?.uid}rebate`}
                            type="number"
                            min={0}
                            addonAfter="%"
                            required={true}
                          />
                          <CustomForm
                            label={`${i18n("form.rebatePeriod")}(${i18n(
                              "form.excute"
                            )})`}
                            name={`${item?.uid}rebate_days`}
                            placeholder="Ex:5"
                            type="number"
                            min={1}
                            addonAfter={i18n_unit("day")}
                            required={true}
                          />
                        </ProFormGroup>
                      </Card>
                    );
                  }),
                },
              ]}
            />
          </div>
        </StepsForm.StepForm>
        <StepsForm.StepForm title={i18n("form.betLimitSetting")}>
          <div className="mb-[20px]">
            {tableLimitForm?.map((group) => {
              return (
                <>
                  <ProFormGroup>
                    {group.map((item) => {
                      return <CustomForm {...item} />;
                    })}
                  </ProFormGroup>
                </>
              );
            })}
            <Collapse
              items={[
                {
                  key: "1",
                  label: i18n("form.betLimitDetail"),
                  children: vipGameList?.map((item, index) => {
                    return (
                      <>
                        <Card
                          style={{
                            marginTop: 16,
                          }}
                          type="inner"
                          title={
                            <Typography.Text>
                              {item?.platform}{" "}
                              {index === 0 && (
                                <CopyTwoTone
                                  onClick={() => {
                                    handleTableCopy({ gameUid: item?.uid });
                                  }}
                                  className="cursor-pointer"
                                />
                              )}
                            </Typography.Text>
                          }
                        >
                          <ProFormGroup>
                            <CustomForm
                              name={`${item?.uid}min_limit`}
                              label={`${i18n("form.betLimiT")} ${i18n(
                                "form.betMinLimit"
                              )}`}
                              addonAfter={CURRENCY}
                              type="number"
                              min={0}
                              required={true}
                            />
                            <CustomForm
                              name={`${item?.uid}max_limit`}
                              label={`${i18n("form.betLimiT")} ${i18n(
                                "form.betMaxLimit"
                              )}`}
                              addonAfter={CURRENCY}
                              type="number"
                              min={0}
                              required={true}
                            />
                            <CustomForm
                              name={`${item?.uid}win_limit`}
                              label={`${i18n("form.betLimiT")} ${i18n(
                                "form.betLimit"
                              )}`}
                              addonAfter={CURRENCY}
                              placeholder="5"
                              type="number"
                              min={0}
                              required={true}
                            />
                          </ProFormGroup>
                        </Card>
                      </>
                    );
                  }),
                },
              ]}
            />
          </div>
        </StepsForm.StepForm>
      </StepsForm>
    </ProCard>
  );
};

export default CreateVipStep;
