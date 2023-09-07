import React from "react";
import CustomModal from "../../../../components/modal/customModal";
import MenuPermissions from "../../../../components/permissionComponents/menuPermissions";
import { useTranslation } from "react-i18next";

const MenuPermission = ({ isModalOpen, setIsModalOpen, form }) => {
  const { t } = useTranslation();
  const i18n = (key) => t(`page.agentinfomation.agentlist.modal.${key}`);

  return (
    <CustomModal
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      modalProps={{ title: i18n("menuPermissionDetail"), width: 500 }}
    >
      <MenuPermissions type="detail" hiddenTitle form={form} />
    </CustomModal>
  );
};

export default MenuPermission;
