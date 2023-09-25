import { ProFormGroup, ProFormText } from "@ant-design/pro-components";
import { Divider } from "antd";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const MenuForm = ({ form, i18nKeyWord }) => {
  const { t } = useTranslation();
  const i18n = (key) => t(`page.systemsetting.${i18nKeyWord}.${key}`);
  const popType = useSelector((state) => state.popType);
  return (
    <>
      <ProFormGroup>
        <ProFormText
          tooltip={i18n("hint")}
          label={i18n("tagName")}
          name="tag_name"
          readonly={popType === "detail"}
          rules={[
            {
              required: true,
              message: i18n("tagNameRule"),
            },
          ]}
          placeholder={i18n("tagNamePlaceholder")}
        />
      </ProFormGroup>
    </>
  );
};

export default MenuForm;
