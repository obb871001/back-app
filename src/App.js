import { useEffect } from "react";
import { HashRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { notification } from "antd";

import "./App.css";

import CommonLayout from "./components/layout/CommonLayout";
import Signin from "./pages/SignIn/SignIn";
import routesProps from "./utils/layoutConfig/routes";
import { GodMod } from "./utils/GodMod";
import Permission from "./utils/Permission";
import { useDispatch } from "react-redux";
import { InitializeApi } from "./api/initializeApi";
import { BasicApi } from "./api/basicApi";

function App() {
  const [api, contextHolder] = notification.useNotification();

  const dispatch = useDispatch();

  useEffect(() => {
    BasicApi(dispatch)();
    InitializeApi(dispatch)();
  }, []);

  const router = routesProps.route.routes;
  const generateRoutes = (routes) => {
    return routes.map((route, i) => {
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
          </Route>
        );
      } else {
        return (
          <Route key={route.path} path={route.path} element={route.component} />
        );
      }
    });
  };

  return (
    <main>
      {contextHolder}
      <HashRouter>
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
            {generateRoutes(router)}
          </Route>
        </Routes>
      </HashRouter>
    </main>
  );
}

export default App;
