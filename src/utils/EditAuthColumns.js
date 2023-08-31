import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { filterMenuKeys } from "../helpers/aboutAuth/filterMenuKeys";

const EditAuthColumns = ({ children }) => {
  const location = useLocation();

  const editableAuth = useSelector((state) => state.agentInfo.menu_editable);

  const [canEdit, setCanEdit] = useState(false);

  useEffect(() => {
    const filterKeys = filterMenuKeys(editableAuth);
    const isEditableNow = filterKeys.some((menuItem) =>
      location.pathname.includes(menuItem)
    );
    if (!isEditableNow) {
      setCanEdit(false);
    } else {
      setCanEdit(true);
    }
  }, [editableAuth, location.pathname]);

  return canEdit ? <>{children}</> : null;
};

export default EditAuthColumns;
