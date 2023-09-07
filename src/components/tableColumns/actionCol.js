import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { filterMenuKeys } from "../../helpers/aboutAuth/filterMenuKeys";
import { setPopType } from "../../redux/action/common/action";
import { allowClick, notAllowClick } from "../../assets/style/styleConfig";
import { useTranslation } from "react-i18next";

const ActionCol = ({ callApi, apiUid, openEdit, openDetail }) => {
  const { t } = useTranslation();
  const i18n = (key) => t(`actionCol.${key}`);

  const location = useLocation();
  const navigate = useNavigate();

  const editableAuth = useSelector((state) => state.agentInfo.menu_editable);
  const dispatch = useDispatch();

  const [editableMenu, setEditableMenu] = useState([]);

  useEffect(() => {
    const filterKeys = filterMenuKeys(editableAuth);
    setEditableMenu(filterKeys);
  }, [editableAuth]);

  const isEditable = editableMenu.some((menuItem) =>
    location.pathname.includes(menuItem)
  );

  return (
    <section className="flex items-center gap-[10px]">
      {openEdit && (
        <p
          className={`${isEditable ? allowClick : notAllowClick} underline`}
          onClick={() => {
            if (!isEditable) return;
            callApi();
            dispatch(setPopType("edit"));
            navigate(`edit?commonUid=${apiUid}`);
          }}
        >
          {i18n("edit")}
        </p>
      )}
      {openDetail && (
        <p
          className={`${allowClick} underline`}
          onClick={() => {
            callApi();
            dispatch(setPopType("detail"));
            navigate(`detail?commonUid=${apiUid}`);
          }}
        >
          {i18n("view")}
        </p>
      )}
    </section>
  );
};

export default ActionCol;
