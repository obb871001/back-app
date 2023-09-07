import React from "react";
import CustomModal from "../../../../components/modal/customModal";
import GamePermission from "../../../../components/permissionComponents/gamePermission";
import { useTranslation } from "react-i18next";

const GamePermissionDetail = ({ isModalOpen, setIsModalOpen, form }) => {
  const { t } = useTranslation();
  const i18n = (key) => t(`page.agentinfomation.agentlist.modal.${key}`);

  return (
    <CustomModal
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      modalProps={{ title: i18n("gamePermissionDetail"), width: 500 }}
    >
      <GamePermission hiddenTitle form={form} />
    </CustomModal>
  );
};

export default GamePermissionDetail;
