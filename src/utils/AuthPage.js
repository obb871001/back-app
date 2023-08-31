import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { fakeMenu } from "../constant";
import ErrorPage from "../components/hint/ErrorPage";
import { filterMenuKeys } from "../helpers/aboutAuth/filterMenuKeys";
import SkeletonPageLoading from "../components/skeleton/skeletonPageLoading";
import SkeletonPageLoadingHorizontal from "../components/skeleton/SkeletonPageLoadingHorizontal";
import { motion } from "framer-motion";

const AuthPage = ({ children, controllIndex }) => {
  const location = useLocation();

  const systemMenu = useSelector(
    (state) => state.agentInfo.menu_permission || fakeMenu
  );
  const globalLoading = useSelector((state) => state.globalLoading);
  const apiCalling = useSelector((state) => state.apiCalling);

  const [editableMenu, setEditableMenu] = useState([]);
  const [preLoading, setPreLoading] = useState(true);

  useEffect(() => {
    setPreLoading(true);
    const filterKeys = filterMenuKeys(systemMenu);
    setEditableMenu(filterKeys);
    setPreLoading(false);
  }, [systemMenu]);

  const isAuthorized = useMemo(() => {
    return editableMenu.some((menuItem) =>
      location.pathname.includes(menuItem)
    );
  }, [editableMenu]);

  return (
    <>
      {globalLoading || preLoading ? (
        <main className="relative">
          <SkeletonPageLoadingHorizontal absolute />
        </main>
      ) : isAuthorized ? (
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
