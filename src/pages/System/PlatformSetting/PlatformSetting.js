import { ProForm } from "@ant-design/pro-components";
import StatisticWrapper from "../../Home/components/StatisticWrapper";
import { useForm } from "antd/es/form/Form";
import CustomForm from "../../../components/form/customForm";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import useEditStatus from "../../../utils/EditStatus";
import { Form, Modal, Space, Switch, Typography, notification } from "antd";
import { updatePlatformConfig } from "../../../api/methods/patchApi";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import CommonPageTitle from "../../../components/layout/CommonPageTitle";
import { ErrorMessage } from "../../../utils/ErrorMessage";

const PlatformSetting = () => {
  const { t } = useTranslation();
  const i18n = (key, props) =>
    t(`page.systemsetting.platformsetting.${key}`, { ...props });
  const i18n_switch = (key) => t(`switch.${key}`);
  const i18n_commonModal = (key) => t(`commonModal.${key}`);

  const [form] = useForm();

  const basicConfig = useSelector((state) => state.basicConfig);
  const agentInfo = useSelector((state) => state.agentInfo);
  const {
    web_name,
    open_registration,
    default_passwd,
    sms_verification,
    is_credit,
    roulettes_activity,
    zero_child_modify_configs,
    wallet_type,
    allow_domain_url: parsedAllowDomainUrl,
    app_download_url: parsedAppDownloadUrl,
    communication_url: parsedCommunicationUrl,
  } = basicConfig;
  const parseSomething = (value) => {
    try {
      return JSON.parse(value);
    } catch (err) {
      return null;
    }
  };
  const allow_domain_url = parseSomething(parsedAllowDomainUrl);
  const app_download_url = parseSomething(parsedAppDownloadUrl);
  const communication_url = parseSomething(parsedCommunicationUrl);

  const canEdit = useEditStatus(); // 是否有修改權限
  const authorizationStatus = () => {
    if (agentInfo.type === "child") {
      // 判斷子帳號
      if (basicConfig.zero_child_modify_configs === 1) {
        return true;
      } else {
        return false;
      }
    } else {
      return canEdit;
    }
  };
  const authorization = authorizationStatus();
  const switchProps = {
    checkedChildren: i18n_switch("open"),
    unCheckedChildren: i18n_switch("close"),
  };

  const handleSwitchOpenConfirm = ({ type, label, props }) => {
    const { value, key } = props;
    type = type ? i18n_switch("close") : i18n_switch("open");
    Modal.confirm({
      title: i18n("switchSure", { type, label }),
      content: i18n("sureNotError"),
      okText: i18n_commonModal("submit"),
      cancelText: i18n_commonModal("cancel"),
      onOk: () => {
        updatePlatformConfig({
          patchData: {
            [key]: value ? 1 : 0,
          },
        }).then((res) => {
          notification.success({
            message: i18n_commonModal("submitSuccess"),
            description: i18n("switchAlready", { type, label }),
          });
          window.location.reload();
        });
      },
    });
  };

  const handleTextOpenConfirm = ({ label, oldValue, newValue, props }) => {
    const { value, key } = props;
    Modal.confirm({
      title: i18n("textSure", { label }),
      content: i18n("textFrom", { oldValue, newValue }),
      okText: i18n_commonModal("submit"),
      cancelText: i18n_commonModal("cancel"),
      onOk: () => {
        console.log("OK");
        updatePlatformConfig({
          patchData: {
            [key]: value,
          },
        })
          .then((res) => {
            notification.success({
              message: i18n_commonModal("submitSuccess"),
              description: i18n("textAlready", { label, newValue }),
            });
            window.location.reload();
          })
          .catch((err) => {
            const errorMessage = err.response.data.message;
            notification.error({
              message: i18n_commonModal("submitFail"),
              description: ErrorMessage(errorMessage),
            });
          });
      },
    });
  };

  const handleArrayConfirm = ({
    label,
    oldValue,
    newValue,
    props,
    baseArray,
  }) => {
    const { value, key } = props;
    Modal.confirm({
      title: i18n("textSure", { label }),
      content: i18n("textFrom", { oldValue, newValue }),
      okText: i18n_commonModal("submit"),
      cancelText: i18n_commonModal("cancel"),
      onOk: () => {
        console.log("OK");
        updatePlatformConfig({
          patchData: {
            [key]: baseArray,
          },
        })
          .then((res) => {
            notification.success({
              message: i18n_commonModal("submitSuccess"),
              description: i18n("textAlready", { label, newValue }),
            });
            window.location.reload();
          })
          .catch((err) => {
            const errorMessage = err.response.data.message;
            notification.error({
              message: i18n_commonModal("submitFail"),
              description: Object.values(errorMessage).map((item) => {
                return <Typography.Text>{item}</Typography.Text>;
              }),
            });
          });
      },
    });
  };

  const basicForm = useMemo(() => {
    return [
      {
        label: i18n("col.platformName"),
        name: "web_name",
        readonly: true,
        value: web_name,
      },
      {
        label: i18n("col.platformType"),
        readonly: true,
        value: is_credit == 1 ? "信用版" : "現金版",
      },
      {
        label: i18n("col.walletType"),
        readonly: true,
        value: wallet_type == "single" ? "單一" : "轉帳",
      },
      // {
      //   label: i18n("col.memberRegister"),
      //   name: "",
      //   more: [
      //     {
      //       label: i18n("col.registerStatus"),
      //       value: i18n_switch("open"),
      //       component: (
      //         <Form.Item
      //           className="!mb-[10px]"
      //           label={i18n("col.registerStatus")}
      //         >
      //           <Space>
      //             {authorization ? (
      //               <Switch
      //                 {...switchProps}
      //                 checked={open_registration == 1}
      //                 onChange={(checked) => {
      //                   handleSwitchOpenConfirm({
      //                     type: open_registration == 1,
      //                     label: i18n("col.memberRegister"),
      //                     props: {
      //                       value: checked,
      //                       key: "open_registration",
      //                     },
      //                   });
      //                 }}
      //               />
      //             ) : (
      //               <Typography.Text>
      //                 {" "}
      //                 {open_registration == 1
      //                   ? i18n_switch("open")
      //                   : i18n_switch("close")}
      //               </Typography.Text>
      //             )}
      //           </Space>
      //         </Form.Item>
      //       ),
      //     },
      //     {
      //       label: i18n("col.smsValidate"),
      //       value: i18n_switch("open"),
      //       component: (
      //         <Form.Item
      //           className="!mb-[10px]"
      //           label={i18n("col.smsValidateStatus")}
      //         >
      //           <Space>
      //             {authorization ? (
      //               <Switch
      //                 {...switchProps}
      //                 checked={sms_verification == 1}
      //                 onChange={(checked) => {
      //                   handleSwitchOpenConfirm({
      //                     type: sms_verification == 1,
      //                     label: i18n("col.smsValidate"),
      //                     props: {
      //                       value: checked,
      //                       key: "sms_verification",
      //                     },
      //                   });
      //                 }}
      //               />
      //             ) : (
      //               <Typography.Text>
      //                 {" "}
      //                 {sms_verification == 1
      //                   ? i18n_switch("open")
      //                   : i18n_switch("close")}
      //               </Typography.Text>
      //             )}
      //           </Space>
      //         </Form.Item>
      //       ),
      //     },
      //   ],
      // },
      // {
      //   label: i18n("col.rouletteStatus"),
      //   name: "",
      //   component: (
      //     <Form.Item label={i18n("col.rouletteStatus")}>
      //       <Space>
      //         {authorization ? (
      //           <Switch
      //             {...switchProps}
      //             checked={roulettes_activity == 1}
      //             onChange={(checked) => {
      //               handleSwitchOpenConfirm({
      //                 type: roulettes_activity == 1,
      //                 label: i18n("col.rouletteStatus"),
      //                 props: {
      //                   value: checked,
      //                   key: "roulettes_activity",
      //                 },
      //               });
      //             }}
      //           />
      //         ) : (
      //           <Typography.Text>{i18n_switch("open")}</Typography.Text>
      //         )}
      //       </Space>
      //     </Form.Item>
      //   ),
      // },
      {
        label: i18n("col.allowSubAccountModifyPlatformSetting"),
        name: "",
        component: (
          <Form.Item label={i18n("col.allowSubAccountModifyPlatformSetting")}>
            <Space>
              {authorization ? (
                <Switch
                  {...switchProps}
                  checked={zero_child_modify_configs == 1}
                  onChange={(checked) => {
                    handleSwitchOpenConfirm({
                      type: zero_child_modify_configs == 1,
                      label: i18n("col.allowSubAccountModifyPlatformSetting"),
                      props: {
                        value: checked,
                        key: "zero_child_modify_configs",
                      },
                    });
                  }}
                />
              ) : (
                <Typography.Text>{i18n_switch("open")}</Typography.Text>
              )}
            </Space>
          </Form.Item>
        ),
      },

      // {
      //   label: "會員手機驗證",
      //   name: "",
      //   component: (
      //     <Form.Item label="會員手機驗證">
      //       <Space>
      //         {authorization ? (
      //           <Switch {...switchProps} />
      //         ) : (
      //           <Typography.Text>啟用</Typography.Text>
      //         )}
      //       </Space>
      //     </Form.Item>
      //   ),
      // },
      {
        label: i18n("col.createPlayerFromBackend"),
        name: "",
        component: (
          <Form.Item label={i18n("col.createPlayerFromBackend")}>
            <Space>
              {authorization ? (
                <Typography.Title
                  editable={{
                    onChange: (v) => {
                      handleTextOpenConfirm({
                        label: i18n("col.createPlayerFromBackend"),
                        oldValue: default_passwd,
                        newValue: v,
                        props: {
                          value: v,
                          key: "default_passwd",
                        },
                      });
                    },
                  }}
                  level={5}
                  style={{
                    margin: 0,
                  }}
                >
                  {default_passwd}
                </Typography.Title>
              ) : (
                <Typography.Text>{default_passwd}</Typography.Text>
              )}
            </Space>
          </Form.Item>
        ),
      },

      // {
      //   label: i18n("col.appDownloadLink"),
      //   name: "",
      //   readonly: true,
      //   more:
      //     app_download_url &&
      //     Object?.keys(app_download_url)?.map((app) => {
      //       return {
      //         label: app,
      //         value: app_download_url[app],
      //         component: (
      //           <Form.Item className="!mb-[10px]" label={app}>
      //             <Space>
      //               {authorization ? (
      //                 <Typography.Title
      //                   editable={{
      //                     onChange: (v) => {
      //                       const oldUrl = app_download_url[app];
      //                       if (v === oldUrl) {
      //                         return;
      //                       }
      //                       app_download_url[app] = v;
      //                       handleArrayConfirm({
      //                         label: i18n("col.appDownloadLink"),
      //                         oldValue: oldUrl,
      //                         newValue: v,
      //                         props: {
      //                           value: app_download_url,
      //                           key: "app_download_url",
      //                         },
      //                         baseArray: app_download_url,
      //                       });
      //                     },
      //                   }}
      //                   level={5}
      //                   style={{
      //                     margin: 0,
      //                   }}
      //                 >
      //                   {app_download_url[app]}
      //                 </Typography.Title>
      //               ) : (
      //                 <Typography.Text>{app_download_url[app]}</Typography.Text>
      //               )}
      //             </Space>
      //           </Form.Item>
      //         ),
      //       };
      //     }),
      // },
      {
        label: i18n("col.webLink"),
        name: "",
        more:
          allow_domain_url &&
          allow_domain_url.map((domain, index) => {
            return {
              label: `${i18n("col.web")}${index + 1}`,
              value: domain,
              readonly: true,
              component: (
                <Form.Item
                  className="!mb-[10px]"
                  label={`${i18n("col.web")}${index + 1}`}
                >
                  <Space>
                    {authorization ? (
                      <Typography.Title
                        editable={{
                          onChange: (v) => {
                            const oldUrl = allow_domain_url[index];
                            if (v === oldUrl) {
                              return;
                            }
                            allow_domain_url[index] = v;
                            handleArrayConfirm({
                              label: `${i18n("col.web")}${index + 1}`,
                              oldValue: oldUrl,
                              newValue: v,
                              props: {
                                value: allow_domain_url,
                                key: "allow_domain_url",
                              },
                              baseArray: allow_domain_url,
                            });
                          },
                        }}
                        level={5}
                        style={{
                          margin: 0,
                        }}
                      >
                        {domain}
                      </Typography.Title>
                    ) : (
                      <Typography.Text>{domain}</Typography.Text>
                    )}
                  </Space>
                </Form.Item>
              ),
            };
          }),
      },
      // {
      //   label: i18n("col.communicationInformation"),
      //   name: "",
      //   more:
      //     communication_url &&
      //     Object.keys(communication_url).map((com, index) => {
      //       return {
      //         label: com,
      //         value: communication_url[com],
      //         component: (
      //           <Form.Item className="!mb-[10px]" label={com}>
      //             <Space>
      //               {authorization ? (
      //                 <Typography.Title
      //                   editable={{
      //                     onChange: (v) => {
      //                       const oldUrl = communication_url[com];
      //                       if (v === oldUrl) {
      //                         return;
      //                       }
      //                       communication_url[com] = v;
      //                       handleArrayConfirm({
      //                         label: i18n("col.communicationInformation"),
      //                         oldValue: oldUrl,
      //                         newValue: v,
      //                         props: {
      //                           value: communication_url,
      //                           key: "communication_url",
      //                         },
      //                         baseArray: communication_url,
      //                       });
      //                     },
      //                   }}
      //                   level={5}
      //                   style={{
      //                     margin: 0,
      //                   }}
      //                 >
      //                   {communication_url[com]}
      //                 </Typography.Title>
      //               ) : (
      //                 <Typography.Text>
      //                   {communication_url[com]}
      //                 </Typography.Text>
      //               )}
      //             </Space>
      //           </Form.Item>
      //         ),
      //       };
      //     }),
      // },
    ];
  }, [authorization, i18next.language]);

  return (
    <>
      <CommonPageTitle pagePath="platformsetting" />
      <StatisticWrapper title={i18n("col.platformSystemInformation")}>
        <ProForm
          form={form}
          layout="horizontal"
          className="w-[500px]"
          submitter={false}
          formItemProps={{ style: { marginBottom: "10px" } }}
        >
          <ul>
            {basicForm.map((item) => {
              return (
                <li>
                  {item.component ? (
                    item.component
                  ) : item.more ? (
                    <>
                      <li>{item.label}</li>
                      <ul>
                        {item.more.map((more) => {
                          return (
                            <li>
                              {more.component || <CustomForm {...more} />}
                            </li>
                          );
                        })}
                      </ul>
                    </>
                  ) : (
                    <CustomForm {...item} />
                  )}
                </li>
              );
            })}
          </ul>
        </ProForm>
      </StatisticWrapper>
    </>
  );
};

export default PlatformSetting;
