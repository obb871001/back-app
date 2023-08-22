import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { filterMenuKeys } from "../../helpers/aboutAuth/filterMenuKeys";
import { setPopType } from "../../redux/action/common/action";

const ActionCol = ({ callApi, apiUid }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const editableAuth = useSelector((state) => state.agentInfo.menuEditable);
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
      <p
        className={`${
          isEditable
            ? "text-blue-500 cursor-pointer"
            : "text-[#d0d0d0] cursor-not-allowed"
        } underline`}
        onClick={() => {
          if (!isEditable) return;
          callApi();
          dispatch(setPopType("edit"));
          navigate(`edit?uid=${apiUid}`);
        }}
      >
        編輯
      </p>
    </section>
  );
};

export default ActionCol;
