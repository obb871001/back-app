import { useEffect, useMemo, useState } from "react";
import {
  BrowserRouter,
  HashRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { ConfigProvider, Modal, notification } from "antd";

import "./App.css";
import "./i18n/i18n";
import "dayjs/locale/zh-cn";
import "dayjs/locale/en";

import CommonLayout from "./components/layout/CommonLayout";
import Signin from "./pages/SignIn/SignIn";
import routesProps from "./utils/layoutConfig/routes";
import { GodMod } from "./utils/GodMod";
import Permission from "./utils/Permission";
import { useDispatch, useSelector } from "react-redux";
import { InitializeApi } from "./api/initializeApi";
import { BasicApi } from "./api/basicApi";
import { antdLocalePackage } from "./antdLocale";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import DetailPlayer from "./pages/Admin/PlayerSearch/modal/detailPlayer";
import { filterMenuKeys } from "./helpers/aboutAuth/filterMenuKeys";
import { fakeGameArray, fakeMenu } from "./constant";
import GameHistory from "./pages/Reports/GameHistory";
import ReportDetail from "./pages/Reports/modal/reportDetail";
import Home from "./pages/Home/Home";
import NotFoundPage from "./components/permissionComponents/notFoundPage";
import AuthPage from "./utils/AuthPage";

function App() {
  const [api, contextHolder] = notification.useNotification();
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();
  const agentMenu = useSelector((state) =>
    filterMenuKeys(state.agentInfo.menu_permission)
  );
  const editableMenu = useSelector((state) =>
    filterMenuKeys(state.agentInfo.menu_editable)
  );

  const gamePlatform = useSelector(
    (state) => state.gameList.gamePlatform || fakeGameArray
  );
  const systemMenu = useSelector(
    (state) => state.basicConfig?.menu || fakeMenu
  );

  const navigate = useNavigate();

  useEffect(() => {
    BasicApi(dispatch)();
    dispatch({ type: "INITIALIZE_API", navigate });
  }, []);

  const router = routesProps.route.routes;
  function filterRoutes(routes, systemArray) {
    return routes?.reduce((filtered, route) => {
      const newRoute = { ...route };

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
      if (newRoute.routes && newRoute.controllSubmenu !== 1) {
        newRoute.routes.unshift({
          path: newRoute?.path,
          redirectTo: `${newRoute?.path}/${newRoute?.routes[0]?.path}`,
        });
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

  const generateRoutes = (routes) => {
    return routes?.map((route, i) => {
      if (route.redirectTo) {
        return (
          <Route
            key={route.path}
            path={route.path}
            element={<Navigate to={route.redirectTo} replace />}
          />
        );
      } else if (route.routes) {
        return (
          <>
            <Route
              key={route.path}
              path={route.path}
              element={
                <>
                  {route.component}
                  <Outlet />
                </>
              }
            >
              {generateRoutes(route.routes)}
              <Route path="memberdetail/:uid" element={<DetailPlayer />} />
            </Route>
          </>
        );
      } else {
        return (
          <Route
            key={route.path}
            path={route.path}
            element={
              <>
                {route.component}
                <Outlet />
              </>
            }
          >
            {" "}
            <Route path="memberdetail/:uid" element={<DetailPlayer />} />
          </Route>
        );
      }
    });
  };

  useEffect(() => {
    dayjs.locale(i18n.language === "zh_cn" ? "zh-cn" : i18n.language);
  }, [i18n.language]);

  return (
    <ConfigProvider locale={antdLocalePackage[i18n.language]}>
      <main>
        {contextHolder}
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route
            path="/"
            element={
              <Permission>
                <CommonLayout />
              </Permission>
            }
          >
            <Route
              path="*"
              element={
                <AuthPage>
                  <Home />
                </AuthPage>
              }
            />
            <Route
              path="/"
              element={
                <AuthPage>
                  <Home />
                </AuthPage>
              }
            />
            {generateRoutes(filteredRoutes.route.routes)}
          </Route>
        </Routes>
      </main>
    </ConfigProvider>
  );
}

export default App;
