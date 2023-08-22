import React from "react";
import CommonModal from "../../../../components/modal/commonModal";
import { Button } from "antd";
import { TrademarkCircleOutlined } from "@ant-design/icons";
import RouletteForm from "../form/rouletteForm";

const CreateRoulette = () => {
  return (
    <CommonModal
      modalProps={{ title: "創建輪盤", width: 700 }}
      useButton={
        <Button icon={<TrademarkCircleOutlined />} type="primary">
          創建輪盤
        </Button>
      }
    >
      <RouletteForm />
    </CommonModal>
  );
};

export default CreateRoulette;
