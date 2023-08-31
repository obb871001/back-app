import { Divider, Modal } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router";
import { usePreviousPagePath } from "../../hooks/usePreviousPagePath";
import { useDispatch } from "react-redux";
import { clearPopType } from "../../redux/action/common/action";

const CustomModal = ({ modalProps, children, setIsModalOpen, isModalOpen }) => {
  const { title, width } = modalProps || {};

  const previousPath = usePreviousPagePath();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const isModalOpenPassed = isModalOpen !== undefined && isModalOpen !== null;

  const handleOk = () => {
    if (typeof setIsModalOpen === "function") {
      setIsModalOpen(false);
    } else {
      dispatch(clearPopType());
      navigate(previousPath);
    }
  };

  const handleCancel = () => {
    if (typeof setIsModalOpen === "function") {
      setIsModalOpen(false);
    } else {
      dispatch(clearPopType());
      navigate(previousPath);
    }
  };

  return (
    <Modal
      width={width || 700}
      title={title}
      open={isModalOpenPassed ? isModalOpen : true}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="關閉"
      cancelButtonProps={{ style: { display: "none" } }}
      destroyOnClose
    >
      <Divider />
      {children}
    </Modal>
  );
};

export default CustomModal;
