import { useNavigate, Outlet, useLocation } from "react-router";
import {
  DollarCircleOutlined,
  EyeOutlined,
  LockOutlined,
  LogoutOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { PageContainer, ProCard, ProLayout } from "@ant-design/pro-components";
import {
  Button,
  Divider,
  Dropdown,
  Input,
  Select,
  Skeleton,
  notification,
} from "antd";
import { useEffect, useMemo, useState } from "react";

import routesProps from "../../utils/layoutConfig/routes";
import locationProps from "../../utils/layoutConfig/location";
import {
  API_RELOAD,
  APP_NAME,
  VERSION,
  YEAR,
  fakeEditableMenu,
  fakeGameArray,
  fakeMenu,
} from "../../constant";
import LoginNameSetting from "../../pages/Home/modal/loginNameSetting";
import { useDispatch, useSelector } from "react-redux";
import { updateDataPeriodically } from "../../api/updateDataPeriodically";
import LanguageSelect from "./LanguageSelect";
import TimeInformation from "./TimeInformation";
import Profile from "./components/profile";
import {
  clearTotalRecords,
  setPopType,
} from "../../redux/action/common/action";
import Password from "./components/password";
import { filterMenuKeys } from "../../helpers/aboutAuth/filterMenuKeys";
import motion from "framer-motion";
import CurrencySelect from "./currencySelect";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import AgentBalance from "./AgentBalance";
import { formatNumber } from "../../utils/formatNumber";
import Typography from "antd/es/typography/Typography";
import { initHasSearched } from "../../redux/action/form/action";
import Cookies from "js-cookie";

const CommonLayout = () => {
  const { t } = useTranslation();
  const i18n_menu = (key) => t(`layout.menu.${key}`);
  const i18n_status_code = (key) => t(`status_code.${key}`);
  const i18n_cagent_level = (key) => t(`cagent_level.${key}`);

  const [firstRender, setFirstRender] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const agentInfo = useSelector((state) => state.agentInfo);
  const gamePlatform = useSelector(
    (state) => state.gameList.gamePlatform || fakeGameArray
  );
  const systemMenu = useSelector(
    (state) => state.basicConfig?.menu || fakeMenu
  );
  const agentMenu = useSelector((state) =>
    filterMenuKeys(state.agentInfo.menu_permission)
  );
  const editableMenu = useSelector((state) =>
    filterMenuKeys(state.agentInfo.menu_editable)
  );
  const globalLoading = useSelector((state) => state.globalLoading);
  const apiCalling = useSelector((state) => state.apiCalling);
  const CURRENCY = useSelector((state) => state.CURRENCY);
  const isCredit = useSelector((state) => state.basicConfig?.is_credit === 1);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!Cookies.get("token")) {
      window.sessionStorage.removeItem("token");
      Cookies.remove("token");
      notification.error({
        message: i18n_menu("loginExpired"),
      });
      navigate("/signin");
    }
    setPathname(location.pathname || "/");
  }, [location.pathname]);

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
      return;
    }
    dispatch({ type: "UPDATE_DATA_PERIODICALLY", navigate });

    const apiInterval = setInterval(() => {
      dispatch({ type: "UPDATE_DATA_PERIODICALLY", navigate });
    }, API_RELOAD);

    return () => clearInterval(apiInterval);
  }, []);

  const settings = {
    fixSiderbar: true,
    // layout: "mix",
    splitMenus: true,
    layout: "top",
  };

  const [pathname, setPathname] = useState(location.pathname);
  const [openProfile, setOpenProfile] = useState(false);
  const [openResetPassword, setOpenResetPassword] = useState(false);

  const menuDataRender = (menuList) =>
    menuList.map((item) => {
      const localItem = {
        ...item,
        children: item.children ? menuDataRender(item.children) : [],
      };
      return localItem;
    });

  function filterRoutes(routes, systemArray) {
    return routes?.reduce((filtered, route) => {
      const newRoute = { ...route };

      if (newRoute.name) {
        newRoute.name = i18n_menu(newRoute.path.replace("/", ""));
      }

      if (route.routes && route.controllSubmenu !== 1) {
        newRoute.routes = filterRoutes(route.routes, systemArray);
        newRoute.routes = newRoute.routes.filter((route) =>
          systemArray.includes(route.path)
        );
        newRoute.routes = newRoute.routes.filter((route) => {
          if (editableMenu.includes(route.path)) {
            return route;
          } else if (agentMenu.includes(route.path)) {
            return route;
          }
        });
        if (newRoute.routes.length === 0) {
          return filtered;
        }
      }

      if (route.routes && route.routes.length === 0) {
        return filtered;
      }
      if (route.path === "gamehistory") {
        newRoute.routes = gamePlatform.map((gameId) => ({
          path: gameId,
          name: (
            <div className="flex items-center gap-[10px]">
              <img
                className="w-[25px] object-contain"
                src={`https://cityofwins.com/images-webp/logo/${gameId}.png`}
              />
              {gameId}
            </div>
          ),
        }));
      }

      filtered.push(newRoute);
      return filtered;
    }, []);
  }
  const filteredRoutes = {
    route: {
      path: "/home",
      routes: filterRoutes(routesProps.route.routes, systemMenu),
    },
  };

  return (
    <>
      <div
        id="test-pro-layout"
        style={{
          height: "100vh",
        }}
      >
        <ProLayout
          title={APP_NAME}
          logo={process.env.REACT_APP_LOGO_PATH}
          pageTitleRender={false}
          bgLayoutImgList={[
            {
              src: "https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png",
              left: 85,
              bottom: 100,
              height: "303px",
            },
            {
              src: "https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png",
              bottom: -68,
              right: -45,
              height: "303px",
            },
            {
              src: "https://img.alicdn.com/imgextra/i3/O1CN018NxReL1shX85Yz6Cx_!!6000000005798-2-tps-884-496.png",
              bottom: 0,
              left: 0,
              width: "331px",
            },
          ]}
          {...filteredRoutes}
          // {...newRoutesProps}
          {...locationProps}
          menuDataRender={menuDataRender}
          location={{
            pathname,
          }}
          menu={{
            type: "group",
          }}
          avatarProps={{
            src: "https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg",
            size: "small",
            title: `${agentInfo?.cagent}(${i18n_cagent_level(
              agentInfo?.level
            )})`,
            render: (props, dom) => {
              return (
                <Dropdown
                  menu={{
                    items: [
                      {
                        key: "balance",
                        icon: <DollarCircleOutlined />,
                        label: `${i18n_menu("balance")}：${formatNumber(
                          agentInfo?.[isCredit ? "credit" : "vpoint"]
                        )}${CURRENCY}`,
                        disabled: true,
                      },
                      {
                        key: "status",
                        icon: <EyeOutlined />,
                        label: `${i18n_menu(
                          "accountStatus"
                        )}：${i18n_status_code(`${agentInfo?.status}`)}`,
                        disabled: true,
                      },

                      {
                        type: "divider",
                      },
                      {
                        key: "profile",
                        icon: <ProfileOutlined />,
                        label: i18n_menu("profile"),
                        onClick: () => {
                          dispatch(setPopType("detail"));
                          setOpenProfile(true);
                        },
                      },
                      {
                        key: "password",
                        icon: <LockOutlined />,
                        label: i18n_menu("resetPassword"),
                        onClick: () => {
                          setOpenResetPassword(true);
                        },
                      },

                      {
                        key: "logout",
                        icon: <LogoutOutlined />,
                        label: i18n_menu("logout"),
                        onClick: () => {
                          sessionStorage.removeItem("token");
                          navigate("/signin");
                        },
                      },
                    ],
                  }}
                >
                  {dom}
                </Dropdown>
              );
            },
          }}
          actionsRender={(props) => {
            if (props.isMobile) return [];
            return [
              props.layout !== "side" ? (
                <div
                  key="SearchOutlined"
                  aria-hidden
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginInlineEnd: 24,
                  }}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                  className="gap-x-[10px]"
                >
                  <LanguageSelect />
                  <CurrencySelect />
                  <AgentBalance />
                </div>
              ) : undefined,
            ];
          }}
          menuFooterRender={(props) => {
            if (props?.collapsed) return undefined;
            return (
              <div
                style={{
                  textAlign: "center",
                  paddingBlockStart: 12,
                }}
              >
                <div>© {YEAR} Made</div>
                <div>by {APP_NAME}</div>
                <div>Version {VERSION}</div>
              </div>
            );
          }}
          footerRender={(props) => {
            if (props.isMobile)
              return (
                <div
                  key="SearchOutlined"
                  aria-hidden
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginInlineEnd: 24,
                  }}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                  className="gap-[10px] px-[20px]"
                >
                  <LanguageSelect />
                  <CurrencySelect />
                </div>
              );
          }}
          onMenuHeaderClick={(e) => console.log(e)}
          menuItemRender={(item, dom) => {
            return (
              <div
                onClick={() => {
                  const locationPath = location.pathname;
                  dispatch(initHasSearched());
                  dispatch(clearTotalRecords());
                  localStorage.setItem(
                    "lastPath",
                    item.path.split("/")[item.path.split("/").length - 1]
                  );
                  if (locationPath.includes(item.path)) {
                    return;
                  }
                  navigate(item.path || "/");
                }}
              >
                {dom}
              </div>
            );
          }}
          {...settings}
        >
          <PageContainer
            className="!bg-white"
            header={{
              style: {
                maxWidth: "85vw",
                margin: "auto",
              },
              title: "",
              breadcrumbRender: (props, originBreadcrumb) => {
                if (
                  location.pathname.includes("home") ||
                  location.pathname === "/"
                ) {
                  return "";
                }
                if (apiCalling || globalLoading) {
                  return [
                    <Skeleton.Input
                      className="!w-[200px] h-[20px]"
                      active
                      size="small"
                    />,
                  ];
                }
                return (
                  originBreadcrumb || (
                    <Skeleton.Input
                      className="!w-[200px] h-[20px]"
                      active
                      size="small"
                    />
                  )
                );
              },
              extra: [<TimeInformation />],
            }}
          >
            <ProCard
              className="md:w-[80vw] w-[100vw]"
              style={{
                minHeight: 800,
                margin: "auto",
              }}
            >
              <Outlet />
              {apiCalling || globalLoading ? null : <Divider />}
            </ProCard>
          </PageContainer>
        </ProLayout>
      </div>
      {agentInfo.name_set == 0 && <LoginNameSetting />}
      {openProfile && (
        <Profile isModalOpen={openProfile} setIsModalOpen={setOpenProfile} />
      )}
      {openResetPassword && (
        <Password
          isModalOpen={openResetPassword}
          setIsModalOpen={setOpenResetPassword}
        />
      )}
    </>
  );
};

export default CommonLayout;
