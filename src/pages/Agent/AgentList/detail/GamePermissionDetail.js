import React from "react";
import CustomModal from "../../../../components/modal/customModal";
import GamePermission from "../../../../components/permissionComponents/gamePermission";

const GamePermissionDetail = ({ isModalOpen, setIsModalOpen, form }) => {
  return (
    <CustomModal
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      modalProps={{ title: "遊戲權限", width: 500 }}
    >
      <GamePermission hiddenTitle form={form} />
    </CustomModal>
  );
};

export default GamePermissionDetail;
