import React from "react";
import CustomModal from "../../../../components/modal/customModal";
import MenuPermissions from "../../../../components/permissionComponents/menuPermissions";

const MenuPermission = ({ isModalOpen, setIsModalOpen, form }) => {
  return (
    <CustomModal
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      modalProps={{ title: "代理選單權限", width: 500 }}
    >
      <MenuPermissions type="detail" hiddenTitle form={form} />
    </CustomModal>
  );
};

export default MenuPermission;
