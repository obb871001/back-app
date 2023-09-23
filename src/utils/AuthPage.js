import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { fakeEditableMenu, fakeMenu } from "../constant";
import ErrorPage from "../components/hint/ErrorPage";
import { filterMenuKeys } from "../helpers/aboutAuth/filterMenuKeys";
import SkeletonPageLoading from "../components/skeleton/skeletonPageLoading";
import SkeletonPageLoadingHorizontal from "../components/skeleton/SkeletonPageLoadingHorizontal";
import { motion } from "framer-motion";

const AuthPage = ({ children, controllIndex }) => {
  const location = useLocation();

  const agentPermissionMenu = useSelector(
    (state) => state.agentInfo.menu_permission || fakeMenu
  );
  const agentEditableMenu = useSelector(
    (state) => state.agentInfo.menu_editable || fakeEditableMenu
  );
  const globalLoading = useSelector((state) => state.globalLoading);
  const apiCalling = useSelector((state) => state.apiCalling);

  const [permissionMenu, setPermissionMenu] = useState([]);
  const [editableMenu, setEditableMenu] = useState([]);
  const [preLoading, setPreLoading] = useState(true);

  useEffect(() => {
    setPreLoading(true);
    const permissionMenu = filterMenuKeys(agentPermissionMenu);
    const editableMenu = filterMenuKeys(agentEditableMenu);
    setPermissionMenu(permissionMenu);
    setEditableMenu(editableMenu);
    setPreLoading(false);
  }, [agentPermissionMenu]);

  const isPermissionAuthorized = useMemo(() => {
    const isInPermissionMenu = permissionMenu.some((menuItem) =>
      location.pathname.includes(menuItem)
    );

    return isInPermissionMenu;
  }, [permissionMenu]);
  const isEditableAuthorized = useMemo(() => {
    const isInEditableMenu = editableMenu.some((menuItem) =>
      location.pathname.includes(menuItem)
    );

    return isInEditableMenu;
  }, [editableMenu]);

  return (
    <>
      {globalLoading || preLoading ? (
        <main className="relative">
          <SkeletonPageLoadingHorizontal absolute />
        </main>
      ) : isEditableAuthorized ? (
        <main className="relative ">
          {apiCalling && <SkeletonPageLoadingHorizontal absolute />}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: apiCalling ? 0 : 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {children}
          </motion.section>
        </main>
      ) : isPermissionAuthorized ? (
        <main className="relative ">
          {apiCalling && <SkeletonPageLoadingHorizontal absolute />}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: apiCalling ? 0 : 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {children}
          </motion.section>
        </main>
      ) : (
        <ErrorPage />
      )}
    </>
  );
};

export default AuthPage;
