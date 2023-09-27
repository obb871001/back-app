import { Button } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { setPopType } from "../../redux/action/common/action";
import { useTranslation } from "react-i18next";

const CreateButton = ({ type, icon }) => {
  const { t } = useTranslation();
  const i18n = (key) => t(`commonModal.${key}`);
  //type 為 創建種類 ex:代理
  const dispatch = useDispatch();
  const location = useLocation();

  const navigate = useNavigate();
  return (
    <Button
      htmlType="button"
      onClick={() => {
        dispatch(setPopType("create"));
        navigate(`create${location.search}`);
      }}
      className="mb-[20px]"
      type="primary"
      icon={icon}
    >
      {i18n("create")}
      {type}
    </Button>
  );
};

export default CreateButton;
