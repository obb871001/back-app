import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { filterMenuKeys } from "../helpers/aboutAuth/filterMenuKeys";

const useEditStatus = () => {
  const location = useLocation();
  const editableAuth = useSelector((state) => state.agentInfo.menu_editable);
  const agentStatusCode = useSelector((state) => state.agentInfo?.status);

  const [canEdit, setCanEdit] = useState(false);

  const filterKeys = useMemo(
    () => filterMenuKeys(editableAuth),
    [editableAuth]
  );
  const isEditableNow = useMemo(
    () => filterKeys.some((menuItem) => location.pathname.includes(menuItem)),
    [filterKeys, location.pathname]
  );

  useEffect(() => {
    if (agentStatusCode === 2) {
      setCanEdit(false);
      return;
    }
    if (isEditableNow !== canEdit) {
      setCanEdit(isEditableNow);
    }
  }, [isEditableNow, canEdit]);

  return canEdit;
};

export default useEditStatus;
