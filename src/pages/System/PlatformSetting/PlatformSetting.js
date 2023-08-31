import { ProForm } from "@ant-design/pro-components";
import StatisticWrapper from "../../Home/components/StatisticWrapper";
import { useForm } from "antd/es/form/Form";
import CustomForm from "../../../components/form/customForm";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { APP_NAME } from "../../../constant";
import useEditStatus from "../../../utils/EditStatus";
import { Form, Modal, Space, Switch, Typography } from "antd";
import { allowClick } from "../../../assets/style/styleConfig";

const PlatformSetting = () => {
  const [form] = useForm();

  const basicConfig = useSelector((state) => state.basicConfig);
  const { web_name, open_registration, member_default_passwd } = basicConfig;
  const canEdit = useEditStatus();

  const switchProps = {
    checkedChildren: "啟用",
    unCheckedChildren: "停用",
  };

  useEffect(() => {
    form.setFieldsValue({
      base_name: APP_NAME,
    });
  }, []);

  const handleSwitchOpenConfirm = (type, label) => {
    type = type ? "關閉" : "啟用";
    Modal.confirm({
      title: `確定要${type}${label}嗎？`,
      content: "確認無誤",
      okText: "確定",
      cancelText: "取消",
      onOk: () => {
        console.log("OK");
      },
    });
  };

  const handleTextOpenConfirm = (label, oldValue, newValue) => {
    Modal.confirm({
      title: `確定要修改${label}嗎？`,
      content: `將 ${oldValue} 修改為 ${newValue}`,
      okText: "確定",
      cancelText: "取消",
      onOk: () => {
        console.log("OK");
      },
    });
  };

  const basicForm = useMemo(() => {
    return [
      {
        label: "站台名稱",
        name: "base_name",
        readonly: true,
      },
      {
        label: "代理/經銷端站名",
        name: "base_name",
        readonly: true,
      },
      {
        label: "會員註冊",
        name: "",
        more: [
          {
            label: "註冊狀態",
            value: "啟用",
            component: (
              <Form.Item className="!mb-[10px]" label="註冊狀態">
                <Space>
                  {canEdit ? (
                    <Switch
                      {...switchProps}
                      checked={open_registration == 1}
                      onChange={() => {
                        handleSwitchOpenConfirm(
                          open_registration == 1,
                          "會員註冊"
                        );
                      }}
                    />
                  ) : (
                    <Typography.Text>
                      {" "}
                      {open_registration == 1 ? "啟用" : "關閉"}
                    </Typography.Text>
                  )}
                </Space>
              </Form.Item>
            ),
          },
        ],
      },
      {
        label: "會員手機驗證",
        name: "",
        component: (
          <Form.Item label="會員手機驗證">
            <Space>
              {canEdit ? (
                <Switch {...switchProps} />
              ) : (
                <Typography.Text>啟用</Typography.Text>
              )}
            </Space>
          </Form.Item>
        ),
      },
      {
        label: "會員前台修改銀行卡",
        name: "",
        component: (
          <Form.Item label="會員前台修改銀行卡">
            <Space>
              {canEdit ? (
                <Switch {...switchProps} />
              ) : (
                <Typography.Text>啟用</Typography.Text>
              )}
            </Space>
          </Form.Item>
        ),
      },
      {
        label: "後台創建新玩家預設密碼",
        name: "",
        component: (
          <Form.Item label="後台創建新玩家預設密碼">
            <Space>
              {canEdit ? (
                <Typography.Title
                  editable={{
                    onChange: (v) => {
                      handleTextOpenConfirm(
                        "後台創建新玩家預設密碼",
                        member_default_passwd,
                        v
                      );
                    },
                  }}
                  level={5}
                  style={{
                    margin: 0,
                  }}
                >
                  {basicConfig?.member_dafault_passwd}
                </Typography.Title>
              ) : (
                <Typography.Text>
                  {basicConfig?.member_dafault_passwd}
                </Typography.Text>
              )}
            </Space>
          </Form.Item>
        ),
      },

      {
        label: "App下載連結",
        name: "",
        more: [
          {
            label: "Android",
            value: "https://www.google.com/",
            component: (
              <Form.Item className="!mb-[10px]" label="Android">
                <Space>
                  {canEdit ? (
                    <Typography.Title
                      editable={{
                        onChange: (v) => {
                          console.log(v);
                        },
                      }}
                      level={5}
                      style={{
                        margin: 0,
                      }}
                    >
                      https://www.google.com/
                    </Typography.Title>
                  ) : (
                    <Typography.Text>https://www.google.com/</Typography.Text>
                  )}
                </Space>
              </Form.Item>
            ),
          },
          {
            label: "IOS",
            value: "https://www.google.com/",
            component: (
              <Form.Item className="!mb-[10px]" label="IOS">
                <Space>
                  {canEdit ? (
                    <Typography.Title
                      editable
                      level={5}
                      style={{
                        margin: 0,
                      }}
                    >
                      https://www.google.com/
                    </Typography.Title>
                  ) : (
                    <Typography.Text>https://www.google.com/</Typography.Text>
                  )}
                </Space>
              </Form.Item>
            ),
          },
        ],
      },
      {
        label: "網域名稱",
        name: "",
        more: [
          {
            label: "網域1",
            value: "https://www.google.com/",
            component: (
              <Form.Item className="!mb-[10px]" label="網域1">
                <Space>
                  {canEdit ? (
                    <Typography.Title
                      editable
                      level={5}
                      style={{
                        margin: 0,
                      }}
                    >
                      https://www.google.com/
                    </Typography.Title>
                  ) : (
                    <Typography.Text>https://www.google.com/</Typography.Text>
                  )}
                </Space>
              </Form.Item>
            ),
          },
          {
            label: "網域2",
            value: "https://www.google.com/",
            component: (
              <Form.Item className="!mb-[10px]" label="網域2">
                <Space>
                  {canEdit ? (
                    <Typography.Title
                      editable
                      level={5}
                      style={{
                        margin: 0,
                      }}
                    >
                      https://www.google.com/
                    </Typography.Title>
                  ) : (
                    <Typography.Text>https://www.google.com/</Typography.Text>
                  )}
                </Space>
              </Form.Item>
            ),
          },
        ],
      },
      {
        label: "通訊軟體資訊",
        name: "",
        more: [
          {
            label: "Youtube",
            value: "https://www.youtube.com/",
            component: (
              <Form.Item className="!mb-[10px]" label="Youtube">
                <Space>
                  {canEdit ? (
                    <Typography.Title
                      editable
                      level={5}
                      style={{
                        margin: 0,
                      }}
                    >
                      https://www.google.com/
                    </Typography.Title>
                  ) : (
                    <Typography.Text>https://www.google.com/</Typography.Text>
                  )}
                </Space>
              </Form.Item>
            ),
          },
          {
            label: "Facebook",
            value: "https://www.facebook.com/",
            component: (
              <Form.Item className="!mb-[10px]" label="Facebook">
                <Space>
                  {canEdit ? (
                    <Typography.Title
                      editable
                      level={5}
                      style={{
                        margin: 0,
                      }}
                    >
                      https://www.facebook.com/
                    </Typography.Title>
                  ) : (
                    <Typography.Text>https://www.facebook.com/</Typography.Text>
                  )}
                </Space>
              </Form.Item>
            ),
          },
          {
            label: "Telegram",
            value: "https://web.telegram.org/",
            component: (
              <Form.Item className="!mb-[10px]" label="Telegram">
                <Space>
                  {canEdit ? (
                    <Typography.Title
                      editable
                      level={5}
                      style={{
                        margin: 0,
                      }}
                    >
                      https://web.telegram.org/
                    </Typography.Title>
                  ) : (
                    <Typography.Text>https://web.telegram.org/</Typography.Text>
                  )}
                </Space>
              </Form.Item>
            ),
          },
          {
            label: "Tiktok",
            value: "https://www.tiktok.com/",
            component: (
              <Form.Item className="!mb-[10px]" label="Tiktok">
                <Space>
                  {canEdit ? (
                    <Typography.Title
                      editable
                      level={5}
                      style={{
                        margin: 0,
                      }}
                    >
                      https://www.tiktok.com/
                    </Typography.Title>
                  ) : (
                    <Typography.Text>https://www.tiktok.com/</Typography.Text>
                  )}
                </Space>
              </Form.Item>
            ),
          },
        ],
      },
    ];
  }, [canEdit]);

  return (
    <>
      <StatisticWrapper title="站台系統資訊">
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
