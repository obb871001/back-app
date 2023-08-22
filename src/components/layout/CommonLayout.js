import {
  Routes,
  Route,
  useNavigate,
  Outlet,
  useParams,
  useLocation,
} from "react-router";
import {
  LogoutOutlined,
  PlusCircleFilled,
  SearchOutlined,
} from "@ant-design/icons";
import { PageContainer, ProCard, ProLayout } from "@ant-design/pro-components";
import { Button, Input, notification } from "antd";
import { useEffect, useState } from "react";

import routesProps from "../../utils/layoutConfig/routes";
import locationProps from "../../utils/layoutConfig/location";
import {
  API_RELOAD,
  APP_NAME,
  YEAR,
  fakeGameArray,
  fakeMenu,
} from "../../constant";
import Permission from "../../utils/Permission";
import LoginNameSetting from "../../pages/Home/modal/loginNameSetting";
import SearchTool from "../searchTool/searchTool";
import { useDispatch, useSelector } from "react-redux";
import { updateDataPeriodically } from "../../api/updateDataPeriodically";
import AuthPage from "../../utils/AuthPage";

const CommonLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const gamePlatform = useSelector(
    (state) => state.gameList.gamePlatform || fakeGameArray
  );
  const agentInfo = useSelector((state) => state.agentInfo);
  const systemMenu = useSelector(
    (state) => state.basicConfig?.menu || fakeMenu
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      window.sessionStorage.removeItem("token");
      notification.error({
        message: "登入逾時，請重新登入",
      });
      setTimeout(() => {
        navigate("/signin");
      }, 1500);
    }
    setPathname(location.pathname || "/");
  }, [location.pathname]);

  useEffect(() => {
    updateDataPeriodically(dispatch)();

    const apiInterval = setInterval(() => {
      updateDataPeriodically(dispatch)();
    }, API_RELOAD);

    return () => clearInterval(apiInterval);
  }, []);

  const settings = {
    fixSiderbar: true,
    layout: "mix",
    splitMenus: true,
  };

  const [pathname, setPathname] = useState(location.pathname);

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

      if (route.routes && route.controllSubmenu !== 1) {
        newRoute.routes = filterRoutes(route.routes, systemArray);
        newRoute.routes = newRoute.routes.filter((route) =>
          systemArray.includes(route.path)
        );

        if (route.path === "/reports/gamehistory") {
          newRoute.routes = gamePlatform.map((gameId) => ({
            path: gameId,
            name: gameId,
          }));
        }
        if (newRoute.routes.length === 0) {
          return filtered;
        }
      }

      if (route.routes && route.routes.length === 0) {
        return filtered;
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

  function addNewRoutes(routesProps) {
    const newRoutesProps = { ...routesProps };

    // 找gameHistory路由
    const gameHistoryRoute = newRoutesProps.route.routes.find(
      (route) => route.path === "/reports"
    );

    // 找到了就在它的子路由中添加新的路由
    if (gameHistoryRoute) {
      gameHistoryRoute.routes.find((route) => {
        if (route.path === "gamehistory") {
          route.routes = gamePlatform.map((gameId) => ({
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
      });
    }
    return newRoutesProps;
  }

  const newRoutesProps = addNewRoutes(routesProps);
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
            title: agentInfo?.cagent,
          }}
          actionsRender={(props) => {
            if (props.isMobile) return [];
            return [
              props.layout !== "side" && document.body.clientWidth > 1400 ? (
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
                >
                  <Input
                    style={{
                      borderRadius: 4,
                      marginInlineEnd: 12,
                      backgroundColor: "rgba(0,0,0,0.03)",
                    }}
                    prefix={
                      <SearchOutlined
                        style={{
                          color: "rgba(0, 0, 0, 0.15)",
                        }}
                      />
                    }
                    placeholder="搜索方案"
                    bordered={false}
                  />
                  <PlusCircleFilled
                    style={{
                      color: "var(--ant-primary-color)",
                      fontSize: 24,
                    }}
                  />
                </div>
              ) : undefined,
              <LogoutOutlined
                onClick={() => {
                  sessionStorage.removeItem("token");
                  navigate("/signin");
                }}
              />,
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
              </div>
            );
          }}
          onMenuHeaderClick={(e) => console.log(e)}
          menuItemRender={(item, dom) => (
            <div
              onClick={() => {
                navigate(item.path || "/");
              }}
            >
              {dom}
            </div>
          )}
          {...settings}
        >
          <PageContainer>
            <ProCard
              style={{
                minHeight: 800,
              }}
            >
              <Outlet />
            </ProCard>
          </PageContainer>
        </ProLayout>
      </div>
      {agentInfo.loginname == 0 && <LoginNameSetting />}
    </>
  );
};

export default CommonLayout;
