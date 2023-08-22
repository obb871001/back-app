import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { fakeMenu } from "../constant";
import ErrorPage from "../components/hint/ErrorPage";
import { filterMenuKeys } from "../helpers/aboutAuth/filterMenuKeys";
import SkeletonPageLoading from "../components/skeleton/skeletonPageLoading";

const AuthPage = ({ children, controllIndex }) => {
  const location = useLocation();

  const systemMenu = useSelector(
    (state) => state.agentInfo.menuPermission || fakeMenu
  );
  const globalLoading = useSelector((state) => state.globalLoading);

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
  console.log(isAuthorized);

  return (
    <>
      {preLoading || globalLoading ? (
        <SkeletonPageLoading />
      ) : isAuthorized ? (
        children
      ) : (
        <ErrorPage />
      )}
    </>
  );
};

export default AuthPage;
