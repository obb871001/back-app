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
import GameCommission from "../../../Agent/AgentList/step/gameCommission";
import CommissionPermission from "../../../../components/permissionComponents/commissionPermission";

const ViewGameCommission = () => {
  const { t } = useTranslation();
  const i18n = (key) => t(`page.systemsetting.gameCommission.${key}`);
  const [form] = useForm();

  const commonDetail = useSelector((state) => state.commonDetail);

  useEffect(() => {
    form.setFieldsValue({
      tag_name: commonDetail.tag_name,
      game_per: commonDetail.game_per,
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
        <MenuForm form={form} i18nKeyWord={`gameCommission`} />
        <CommissionPermission
          prefix="per"
          hiddenTitle
          type="detail"
          form={form}
        />
      </Form>
    </CustomModal>
  );
};

export default ViewGameCommission;
