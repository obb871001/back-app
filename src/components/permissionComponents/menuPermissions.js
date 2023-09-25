import { Checkbox, Divider, Form, Space, Typography } from "antd";
import routesProps from "../../utils/layoutConfig/routes";
import { filterRoutes } from "../../utils/menu/filterRoutes";
import { ProFormCheckbox } from "@ant-design/pro-components";
import CommonTitle from "../form/commonTitle";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storeForm } from "../../redux/action/form/action";
import { filterMenuKeys } from "../../helpers/aboutAuth/filterMenuKeys";
import CommonTooltip from "../hint/commonTooltip";
import { useTranslation } from "react-i18next";
import { fakeEditableMenu, fakeMenu } from "../../constant";

const MenuPermissions = ({ form, hiddenTitle, type, isChild }) => {
  const { t } = useTranslation();
  const i18n = (key) => t(`permission.menu.${key}`);
  const i18n_menu = (key) => t(`layout.menu.${key}`);

  const dispatch = useDispatch();
  const formDetail = useSelector((state) => state.formReducers);
  const configMenu = useSelector((state) => state.basicConfig.menu || fakeMenu);
  const agentDetail = useSelector((state) => state.commonDetail);
  const agentInfo = useSelector((state) => state.agentInfo);
  const agentMenu = useSelector((state) =>
    filterMenuKeys(state.agentInfo.menu_permission)
  );
  const editMenu = useSelector(
    (state) => filterMenuKeys(state.agentInfo.menu_editable) || fakeEditableMenu
  );

  const popType = useSelector((state) => state.popType);

  const menuConfig = [
    {
      label: i18n("view"),
      prefix: "permission",
    },
    {
      label: i18n("edit"),
      prefix: "editable",
      notTitle: true,
      hint: i18n("editHint"),
    },
  ];

  const routes = routesProps.route.routes;
  const filterMenu = filterRoutes(routes).filter((item) => {
    if (item.divider) {
      return item;
    } else if (agentInfo.level >= item.level_limit - 1) {
      return;
    } else {
      if (configMenu.includes(item.path)) {
        if (editMenu.includes(item.path)) {
          return item;
        } else if (agentMenu.includes(item.path)) {
          return item;
        }
      }
    }
  });
  const menu = filterMenu.filter((item, index) => {
    if (
      item.divider &&
      filterMenu[index + 1] &&
      filterMenu[index + 1].divider
    ) {
      return;
    } else if (item.divider && index === filterMenu.length - 1) {
      return;
    } else {
      return item;
    }
  });

  const [menuPermission, setMenuPermission] = useState({
    menu_permission: formDetail.menu_permission || [],
    menu_editable: formDetail.menu_editable || [],
  });
  const [indeterminate, setIndeterminate] = useState({
    menu_permission: false,
    menu_editable: false,
  });
  const [checkAll, setCheckAll] = useState({
    menu_permission: false,
    menu_editable: false,
  });
  const [checkboxNow, setCheckboxNow] = useState({
    prefix: "",
    checked: false,
    value: "",
  });

  const getCheckboxStatus = (permissionList, prefix) => {
    const filteredMenuLength = menu
      .filter((item) => !item.divider)
      .filter((item) => {
        if (prefix === "editable") {
          if (editMenu.includes(item.path)) {
            return item;
          }
        } else {
          return item;
        }
      })
      .filter((item) => {
        if (item.path === "platformsetting") {
          return true;
        } else if (item[`hidden_${prefix}`]) {
          return false;
        } else {
          return true;
        }
      }).length; //過濾divider

    const length = permissionList.length;
    return {
      checkAll: length === filteredMenuLength,
      indeterminate: length > 0 && length < filteredMenuLength,
    };
  };

  useEffect(() => {
    if (popType === "edit") {
      setMenuPermission({
        menu_permission: filterMenuKeys(agentDetail.menu_permission) || [],
        menu_editable: filterMenuKeys(agentDetail.menu_editable) || [],
      });
    }
    if (
      form.getFieldValue("menu_permission") ||
      form.getFieldValue("menu_editable")
    ) {
      setMenuPermission({
        menu_permission: form.getFieldValue("menu_permission") || [],
        menu_editable: form.getFieldValue("menu_editable") || [],
      });
    }
  }, [agentDetail, popType]);

  useEffect(() => {
    if (checkboxNow.prefix === "permission" && !checkboxNow.checked) {
      if (checkboxNow.value === "all") {
        let editable = [];
        setMenuPermission({
          ...menuPermission,
          menu_editable: editable,
        });
        form.setFieldsValue({
          menu_editable: editable,
        });
      } else {
        let editable = menuPermission.menu_editable.filter(
          (item) => item !== checkboxNow.value
        );
        setMenuPermission({
          ...menuPermission,
          menu_editable: editable,
        });
        form.setFieldsValue({
          menu_editable: editable,
        });
      }
    }
  }, [checkboxNow]);

  useEffect(() => {
    dispatch(storeForm({ ...formDetail, ...menuPermission }));
  }, [menuPermission]);

  useEffect(() => {
    const menuPermissionStatus = getCheckboxStatus(
      menuPermission.menu_permission,
      "permission"
    );
    const menuEditableStatus = getCheckboxStatus(
      menuPermission.menu_editable,
      "editable"
    );
    setCheckAll({
      menu_permission: menuPermissionStatus.checkAll,
      menu_editable: menuEditableStatus.checkAll,
    });

    setIndeterminate({
      menu_permission: menuPermissionStatus.indeterminate,
      menu_editable: menuEditableStatus.indeterminate,
    });
  }, [form, menuPermission]);

  const handleCheckAllChange = (e, prefix) => {
    const Menu = menu
      .filter((item) => !item.divider)
      .filter((item) => {
        if (prefix === "editable") {
          if (editMenu.includes(item.path)) {
            return item;
          }
        } else {
          return item;
        }
      })
      .filter((item) => {
        if (item.path === "platformsetting") {
          return true;
        } else if (item[`hidden_${prefix}`]) {
          return false;
        } else {
          return true;
        }
      })
      .map((item) => {
        return item && item.path;
      });

    setMenuPermission({
      ...menuPermission,
      [`menu_${prefix}`]: e.target.checked ? Menu : [],
    });
    form.setFieldsValue({
      [`menu_${prefix}`]: e.target.checked ? Menu : [],
    });
    setIndeterminate({
      ...indeterminate,
      [`menu_${prefix}`]: false,
    });
    setCheckAll({
      ...checkAll,
      [`menu_${prefix}`]: e.target.checked,
    });
  };

  const handleGroupChange = (checkedList, prefix) => {
    setMenuPermission({
      ...menuPermission,
      [`menu_${prefix}`]: checkedList,
    });
    form.setFieldsValue({
      [`menu_${prefix}`]: checkedList,
    });
    setIndeterminate({
      ...indeterminate,
      [`menu_${prefix}`]:
        !!checkedList.length && checkedList.length < menu.length,
    });
    setCheckAll({
      ...checkAll,
      [`menu_${prefix}`]: checkedList.length === menu.length,
    });
  };

  return (
    <Space align="middle">
      {menuConfig.map((config) => {
        const filteredMenuLength = menu
          .filter((item) => !item.divider)
          .filter((item) => {
            if (item.path === "platformsetting") {
              return true;
            } else if (item[`hidden_permission`]) {
              return false;
            } else {
              return true;
            }
          }).length; //算出permission長度，因為edit全選需要permission的長度
        return (
          <Form.Item
            key={config.label}
            name={`menu_${config.prefix}`}
            label={
              hiddenTitle ? (
                ""
              ) : (
                <CommonTitle
                  className={config.notTitle && "h-[28px]"}
                  title={!config.notTitle && i18n("title")}
                />
              )
            }
            valuePropName="checked"
          >
            {popType === "detail" ? null : (
              <>
                <section className="flex justify-end relative">
                  <p>{config.label}</p>
                  <section className="absolute-center !left-[40px]">
                    {config.hint && <CommonTooltip tooltip={config.hint} />}
                  </section>
                </section>
                <div className={`flex items-center gap-[5px] `}>
                  {!config.notTitle && (
                    <span className="w-[150px] flex">{i18n("selectAll")}</span>
                  )}
                  <Checkbox
                    indeterminate={indeterminate?.[`menu_${config.prefix}`]}
                    onChange={(e) => {
                      handleCheckAllChange(e, config.prefix);
                      setCheckboxNow({
                        prefix: config.prefix,
                        checked: e.target.checked,
                        value: "all",
                      });
                    }}
                    checked={checkAll?.[`menu_${config.prefix}`]}
                    disabled={
                      (config.prefix === "editable" &&
                        menuPermission.menu_permission.length !==
                          filteredMenuLength) ||
                      type === "detail"
                    }
                    className="mb-[10px] flex flex-row-reverse"
                  ></Checkbox>
                </div>
              </>
            )}

            <Divider className="!my-[10px]" />
            <Checkbox.Group
              value={form.getFieldValue(`menu_${config.prefix}`)}
              onChange={(checkedList) =>
                handleGroupChange(checkedList, config.prefix)
              }
              className="flex flex-col gap-[5px] items-start"
            >
              {menu.map((item, index) => {
                if (item.divider) {
                  return (
                    <>
                      {item.main && <Divider className="!my-[10px]" dashed />}
                      <Typography.Title level={5} className="!my-[10px]">
                        {config.notTitle ? (
                          <div className="h-[24px]"></div>
                        ) : (
                          <>
                            <span className="mr-[5px]">{item.icon}</span>
                            {i18n_menu(item.path.replace("/", ""))}
                          </>
                        )}
                      </Typography.Title>
                    </>
                  );
                } else {
                  return (
                    <div className={`flex items-center gap-[5px] h-[22px]`}>
                      {!config.notTitle && (
                        <span className="w-[150px] flex">
                          {i18n_menu(item.path)}
                        </span>
                      )}
                      <Checkbox
                        className={`flex flex-row-reverse ${
                          item.path === "platformsetting" &&
                          agentInfo.type === "cagent" &&
                          isChild &&
                          agentInfo.level == 0
                            ? "!flex"
                            : ""
                        } ${item?.[`hidden_${config.prefix}`] && "!hidden"} ${
                          config.prefix === "editable"
                            ? editMenu.includes(item.path)
                              ? ""
                              : "!hidden"
                            : ""
                        }`}
                        value={`${item.path}`}
                        key={`${item.path}`}
                        onChange={(e) => {
                          setCheckboxNow({
                            prefix: config.prefix,
                            checked: e.target.checked,
                            value: item.path,
                          });
                        }}
                        disabled={
                          type === "detail"
                            ? true
                            : item?.hidden_permission
                            ? false
                            : config.prefix === "editable" &&
                              !menuPermission.menu_permission.includes(
                                item.path
                              )
                        }
                      ></Checkbox>
                    </div>
                  );
                }
              })}
            </Checkbox.Group>
          </Form.Item>
        );
      })}
    </Space>
  );
};

export default MenuPermissions;
