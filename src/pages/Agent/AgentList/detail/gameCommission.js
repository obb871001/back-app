import React from "react";
import CustomModal from "../../../../components/modal/customModal";

const GameCommission = ({ isModalOpen, setIsModalOpen, props }) => {
  const { game_commission } = props;
  return (
    <CustomModal
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      modalProps={{ title: "代理佔成詳情", width: 500 }}
    >
      <section className="flex flex-col gap-[10px]">
        {Object.keys(game_commission).map((item) => {
          return (
            <section className="flex items-center gap-[20px]">
              <div className="w-[100px] font-bold">{item}：</div>
              <div>{game_commission?.[item]}%</div>
            </section>
          );
        })}
      </section>
    </CustomModal>
  );
};

export default GameCommission;
