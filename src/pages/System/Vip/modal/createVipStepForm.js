import React, { useEffect, useState } from "react";
import CommonModal from "../../../../components/modal/commonModal";
import { Divider, Typography } from "antd";
import { CrownFilled } from "@ant-design/icons";
import {
  getVipGameRebateGroup,
  getVipTableLimitGroup,
} from "../../../../api/methods/getApi";
import { useSelector } from "react-redux";
import { createVipLevel } from "../../../../api/methods/postApi";
import CreateVipStep from "../form/createVipStep";
import CustomForm from "../../../../components/form/customForm";
import CustomModal from "../../../../components/modal/customModal";

const CreateVipStepForm = () => {
  const [rebateAndTableLimitOptions, setRebateAndTableLimitOptions] = useState({
    rebateOptions: [],
    tableLimitOptions: [],
  });

  useEffect(() => {
    getVipTableLimitGroup().then((data) => {
      setRebateAndTableLimitOptions((prev) => {
        return {
          ...prev,
          tableLimitOptions: data?.map((item) => ({
            label: item.group_name,
            value: item.uid,
          })),
        };
      });
    });

    getVipGameRebateGroup().then((data) => {
      setRebateAndTableLimitOptions((prev) => {
        return {
          ...prev,
          rebateOptions: data?.map((item) => ({
            label: item.group_name,
            value: item.uid,
          })),
        };
      });
    });
  }, []);

  console.log(rebateAndTableLimitOptions);

  return (
    <CustomModal
      modalProps={{
        width: 800,
        title: (
          <Typography.Title level={4} className="mt-[0px]" italic>
            <CrownFilled />
            創建VIP等級設置
          </Typography.Title>
        ),
      }}
      isModalOpen={true}
    >
      <CreateVipStep rebateAndTableLimitOptions={rebateAndTableLimitOptions} />
    </CustomModal>
  );
};

export default CreateVipStepForm;
