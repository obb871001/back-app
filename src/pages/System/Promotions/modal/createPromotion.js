import { Button, Divider, Typography } from "antd";
import CommonModal from "../../../../components/modal/commonModal";
import { ContactsOutlined } from "@ant-design/icons";
import PromotionForm from "../form/promotionForm";
import { createPromotion } from "../../../../api/methods/postApi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { updatePromotions } from "../../../../api/methods/patchApi";
import { trigger } from "../../../../redux/action/common/action";
import { useTranslation } from "react-i18next";

const CreatePromotion = ({ type }) => {
  const { t } = useTranslation();
  const i18n = (key) => t(`page.systemsetting.promotions.${key}`);

  const popType = useSelector((state) => state.popType);
  const commonDetail = useSelector((state) => state.commonDetail);
  const dispatch = useDispatch();

  const handleSubmit = async (formData) => {
    let bodyFormData = new FormData();

    for (let key in formData) {
      if (key.includes("images")) {
        bodyFormData.append(key, formData[key][0].originFileObj || null);
      } else if (typeof formData[key] === "boolean") {
        bodyFormData.append(key, formData[key] ? 1 : 0);
      } else {
        bodyFormData.append(key, formData[key]);
      }
    }
    try {
      if (popType === "edit") {
        bodyFormData.append("uid", commonDetail.uid);
        await updatePromotions({
          uid: commonDetail.uid,
          formData: bodyFormData,
        });
      } else {
        await createPromotion({
          formData: bodyFormData,
        });
      }
      dispatch(trigger());
    } catch (err) {
      throw err;
    }
  };
  return (
    <CommonModal
      modalProps={{
        title: (
          <Typography.Title level={4} italic className="mt-[0px]">
            <ContactsOutlined />
            {i18n("create")}
          </Typography.Title>
        ),
        width: 800,
      }}
      modalTrigger={true}
      submitFunction={handleSubmit}
      antdModalProps={{
        okText: popType === "edit" ? i18n("modal.edit") : i18n("modal.create"),
      }}
    >
      <Divider />
      <PromotionForm />
    </CommonModal>
  );
};

export default CreatePromotion;
