import { Button, Form } from "antd";
import { TagsOutlined } from "@ant-design/icons";
import { createTag } from "../../../../api/methods/postApi";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useForm } from "antd/es/form/Form";
import CustomModal from "../../../../components/modal/customModal";
import { useTranslation } from "react-i18next";
import GamePermission from "../../../../components/permissionComponents/gamePermission";
import MenuForm from "../../MenuAuth/form/menuForm";
import { parseSomething } from "../../../../utils/parseSomething";

const ViewGameAuth = () => {
  const { t } = useTranslation();
  const i18n = (key) => t(`page.systemsetting.gameAuth.${key}`);
  const [form] = useForm();

  const commonDetail = useSelector((state) => state.commonDetail);

  useEffect(() => {
    form.setFieldsValue({
      tag_name: commonDetail.tag_name,
      game_permission: parseSomething(commonDetail.game_permission_json),
    });
  }, []);

  return (
    <CustomModal
      modalProps={{
        title: (
          <p>
            <TagsOutlined />
            {i18n("title")}
          </p>
        ),
      }}
      modalTrigger={true}
    >
      <Form form={form}>
        <MenuForm form={form} i18nKeyWord={`gameAuth`} />
        <GamePermission hiddenTitle type="detail" form={form} />
      </Form>
    </CustomModal>
  );
};

export default ViewGameAuth;
