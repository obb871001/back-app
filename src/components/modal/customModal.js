import { Modal } from "antd";
import { useState } from "react";

const CustomModal = ({ modalProps, children, setIsModalOpen, isModalOpen }) => {
  const { title, width } = modalProps || {};

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      width={width || 700}
      title={title}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="關閉"
      cancelButtonProps={{ style: { display: "none" } }}
      destroyOnClose
    >
      {children}
    </Modal>
  );
};

export default CustomModal;
