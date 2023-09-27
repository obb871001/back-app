import {
  ProForm,
  ProFormCheckbox,
  ProFormGroup,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
} from "@ant-design/pro-components";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { formats, modules } from "../../../../utils/quill/modules";
import { DatePicker, Divider, Image } from "antd";
import UploadImage from "../../../../utils/quill/uploadImage";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { useParams } from "react-router";
import { getPromotionList } from "../../../../api/methods/getApi";
import { PASSWORD_EXPRESSION, USERNAME_EXPRESSION } from "../../../../regex";
import { commonPromotionType } from "../../../../constant";

const languages = ["zhs", "en"];

const PromotionForm = ({ form }) => {
  const { t } = useTranslation();
  const i18n_common = (key) => t(`common.${key}`);
  const i18n = (key) => t(`page.systemsetting.promotions.modal.${key}`);
  const i18n_express = (key) => t(`expressHint.${key}`);

  const { uid } = useParams();

  const popType = useSelector((state) => state.popType);
  const commonDetail = useSelector((state) => state.commonDetail);
  const [readOnly, setReadOnly] = useState(false);

  const [imagesView, setImagesView] = useState({
    zhs: false,
    en: false,
  });

  useEffect(() => {
    if (uid) {
      if (popType === "detail") {
        setReadOnly(true);
      }
      getPromotionList({
        pathParams: uid,
      }).then((data) => {
        form.setFieldsValue({
          title_zhs: data.title_zhs,
          title_en: data.title_en,
          content_zhs: data.content_zhs,
          content_en: data.content_en,
          start_time: dayjs(data.start_time),
          end_time: dayjs(data.end_time),
          show_carousel: data.show_carousel == 1,
          promotion_type: data.promotion_type,
        });
      });
    }
  }, [uid, popType]);

  const [quillValue, setQuillValue] = useState({
    zhs: "",
    en: "",
  });
  return (
    <>
      <ProFormGroup>
        {languages.map((lang) => {
          return (
            <ProFormText
              rules={[
                {
                  required: true,
                  message: i18n("titleHint"),
                },
                {
                  pattern: PASSWORD_EXPRESSION,
                  message: i18n_express("passwordHint"),
                },
              ]}
              label={`${i18n("title")}(${i18n_common(lang)})`}
              name={`title_${lang}`}
              readonly={readOnly}
            />
          );
        })}
      </ProFormGroup>
      {languages.map((lang) => {
        return (
          <>
            <UploadImage
              form={form}
              langLabel={i18n_common(lang)}
              name={`images_${popType === "edit" ? "update_" : ""}${lang}`}
              readOnly={readOnly}
            />
            {commonDetail?.[`images_${lang}`] ? (
              <Image
                src={`${process.env.REACT_APP_IMAGE_URL}${
                  commonDetail?.[`images_${lang}`]
                }`}
                className="shadow"
                preview={{
                  visible: imagesView[lang],
                  src: `${process.env.REACT_APP_IMAGE_URL}${
                    commonDetail?.[`images_${lang}`]
                  }`,
                  onVisibleChange: (visible) => {
                    setImagesView({
                      ...imagesView,
                      [lang]: visible,
                    });
                  },
                }}
              />
            ) : null}
            <Divider className="mt-[5px]" />
          </>
        );
      })}
      <ProForm.Item
        rules={[
          {
            required: true,
            message: i18n("start_timeHint"),
          },
        ]}
        label={i18n("start_time")}
        name="start_time"
        readOnly={readOnly}
      >
        <DatePicker />
      </ProForm.Item>
      <ProForm.Item
        rules={[
          {
            required: true,
            message: i18n("end_timeHint"),
          },
        ]}
        label={i18n("end_time")}
        name="end_time"
        readOnly={readOnly}
      >
        <DatePicker />
      </ProForm.Item>

      <ProFormGroup>
        <ProForm.Item
          label={i18n("showOnHomeCarousel")}
          name="show_carousel"
          valuePropsName="checked"
          readOnly={readOnly}
        >
          <ProFormSwitch />
        </ProForm.Item>

        <ProForm.Item
          rules={[
            {
              required: true,
              message: i18n("promotion_typeHint"),
            },
          ]}
          label={i18n("promotion_type")}
          name="promotion_type"
          readOnly={readOnly}
        >
          <ProFormSelect width={200} options={commonPromotionType} />
        </ProForm.Item>
      </ProFormGroup>

      <Divider className="mt-[0px]" />
      {languages.map((lang) => {
        return (
          <ProForm.Item
            label={`${i18n("promotionContent")}(${i18n_common(lang)})`}
            name={`content_${lang}`}
          >
            <ReactQuill
              value={form.getFieldValue(`content_${lang}`)}
              readOnly={readOnly}
              onChange={(content) => {
                // setQuillValue({
                //   ...quillValue,
                //   [lang]: content,
                // });
                form.setFieldValue({
                  [`content_${lang}`]: content,
                });
              }}
              modules={modules}
              formats={formats}
            />
          </ProForm.Item>
        );
      })}
      {/* </ProForm.Item> */}
    </>
  );
};

export default PromotionForm;
