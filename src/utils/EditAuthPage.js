import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { filterMenuKeys } from "../helpers/aboutAuth/filterMenuKeys";
import { usePreviousPagePath } from "../hooks/usePreviousPagePath";
import { message } from "antd";

const EditAuthPage = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const previousPath = usePreviousPagePath();

  const editableAuth = useSelector((state) => state.agentInfo.menu_editable);
  const agentStatusCode = useSelector((state) => state.agentInfo?.status);

  useEffect(() => {
    if (agentStatusCode === 2) {
      message.error("無編輯權限");
      navigate(previousPath);
      return;
    }
    const filterKeys = filterMenuKeys(editableAuth);
    const isEditableNow = filterKeys.some((menuItem) =>
      location.pathname.includes(menuItem)
    );
    if (!isEditableNow) {
      message.error("無編輯權限");
      navigate(previousPath);
    }
  }, [editableAuth, location.pathname, previousPath, navigate]);

  return <>{children}</>;
};

export default EditAuthPage;
