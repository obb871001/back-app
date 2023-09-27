import React, { useEffect } from "react";
import CustomModal from "../../../../components/modal/customModal";
import { ProForm } from "@ant-design/pro-components";
import { Divider } from "antd";
import PromotionForm from "../form/promotionForm";
import { useForm } from "antd/es/form/Form";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { convertLanguage } from "../../../../utils/convertLanguage";
import i18next from "i18next";

const ViewPromotion = () => {
  const { t } = useTranslation();
  const i18n = (key) => t(`page.systemsetting.promotions.${key}`);

  const [form] = useForm();

  const commonDetail = useSelector((state) => state.commonDetail);

  useEffect(() => {
    form.setFieldsValue({
      title_zhs: commonDetail.title_zhs,
      title_en: commonDetail.title_en,
      content_zhs: commonDetail.content_zhs,
      content_en: commonDetail.content_en,
      start_time: dayjs(commonDetail.start_time),
      end_time: dayjs(commonDetail.end_time),
      show_carousel: commonDetail.show_carousel == 1,
      promotion_type: commonDetail.promotion_type,
    });
  }, []);
  return (
    <CustomModal
      modalProps={{
        title: (
          <p>
            {i18n("title")} -{" "}
            {commonDetail?.[`title_${convertLanguage(i18next.language)}`]}
          </p>
        ),
      }}
      modalTrigger={true}
    >
      <ProForm form={form}>
        <Divider />
        <PromotionForm form={form} />
      </ProForm>
    </CustomModal>
  );
};

export default ViewPromotion;
