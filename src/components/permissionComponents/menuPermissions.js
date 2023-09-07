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

const MenuPermissions = ({ form, hiddenTitle, type }) => {
  const { t } = useTranslation();
  const i18n = (key) => t(`permission.menu.${key}`);
  const i18n_menu = (key) => t(`layout.menu.${key}`);

  const dispatch = useDispatch();
  const formDetail = useSelector((state) => state.formReducers);
  const agentDetail = useSelector((state) => state.commonDetail);
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
      hint: i18n("editHint  "),
    },
  ];

  const routes = routesProps.route.routes;
  const menu = filterRoutes(routes);

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

  const filteredMenuLength = menu.filter((item) => !item.divider).length; //過濾divider
  const getCheckboxStatus = (permissionList) => {
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
  }, [agentDetail]);

  useEffect(() => {
    dispatch(storeForm({ ...formDetail, ...menuPermission }));
  }, [menuPermission]);

  useEffect(() => {
    const menuPermissionStatus = getCheckboxStatus(
      menuPermission.menu_permission
    );
    const menuEditableStatus = getCheckboxStatus(menuPermission.menu_editable);

    setCheckAll({
      menu_permission: menuPermissionStatus.checkAll,
      menu_editable: menuEditableStatus.checkAll,
    });

    setIndeterminate({
      menu_permission: menuPermissionStatus.indeterminate,
      menu_editable: menuEditableStatus.indeterminate,
    });
  }, [form, menuPermission]);

  const onlyPathMenu = menu
    .filter((item) => !item.divider)
    .map((item) => {
      return item && item.path;
    });

  const handleCheckAllChange = (e, prefix) => {
    setMenuPermission({
      ...menuPermission,
      [`menu_${prefix}`]: e.target.checked ? onlyPathMenu : [],
    });
    form.setFieldsValue({
      [`menu_${prefix}`]: e.target.checked ? onlyPathMenu : [],
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
            <section className="flex justify-end relative">
              <p>{config.label}</p>
              <section className="absolute-center !left-[40px]">
                {config.hint && <CommonTooltip tooltip={config.hint} />}
              </section>
            </section>
            <Checkbox
              indeterminate={indeterminate?.[`menu_${config.prefix}`]}
              onChange={(e) => handleCheckAllChange(e, config.prefix)}
              checked={checkAll?.[`menu_${config.prefix}`]}
              disabled={
                (config.prefix === "editable" &&
                  menuPermission.menu_permission.length !==
                    filteredMenuLength) ||
                type === "detail"
              }
              className="mb-[10px] flex flex-row-reverse"
            >
              {!config.notTitle && (
                <span className="w-[150px] flex">{i18n("selectAll")}</span>
              )}
            </Checkbox>

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
                      <Typography.Title level={5}>
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
                    <div className="flex items-center gap-[5px]">
                      <Checkbox
                        className="flex flex-row-reverse"
                        value={`${item.path}`}
                        key={`${item.path}`}
                        disabled={
                          (config.prefix === "editable" &&
                            !menuPermission.menu_permission.includes(
                              item.path
                            )) ||
                          type === "detail"
                        }
                      >
                        {!config.notTitle && (
                          <span className="w-[150px] flex">
                            {i18n_menu(item.path)}
                          </span>
                        )}
                      </Checkbox>
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
