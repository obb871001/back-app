import { Button } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setPopType } from "../../redux/action/common/action";

const CreateButton = ({ type }) => {
  //type 為 創建種類 ex:代理
  const dispatch = useDispatch();

  const navigate = useNavigate();
  return (
    <Button
      htmlType="button"
      onClick={() => {
        dispatch(setPopType("create"));
        navigate("create");
      }}
      className="mb-[20px]"
      type="primary"
    >
      創建{type}
    </Button>
  );
};

export default CreateButton;
