import { Button, Divider, Typography } from "antd";
import CommonModal from "../../../../components/modal/commonModal";
import MenuPermissions from "../../../../components/permissionComponents/menuPermissions";
import MenuForm from "../form/menuForm";
import { TagsOutlined } from "@ant-design/icons";
import { createTag } from "../../../../api/methods/postApi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useForm } from "antd/es/form/Form";
import CreateMenuForm from "../form/createMenuForm";
import { trigger } from "../../../../redux/action/common/action";
import { updateTag } from "../../../../api/methods/patchApi";
import { useTranslation } from "react-i18next";

const CreateMenuAuth = () => {
  const { t } = useTranslation();
  const i18n = (key) => t(`page.systemsetting.menuAuth.${key}`);

  const commonDetail = useSelector((state) => state.commonDetail);
  const popType = useSelector((state) => state.popType);
  const dispatch = useDispatch();

  const handleSubmit = async (formData) => {
    try {
      if (popType === "edit") {
        await updateTag({
          uid: commonDetail.uid,
          patchData: {
            tag_type: "menu",
            tag_name: formData.tag_name,
            menu_permission_json: JSON.stringify(formData.menu_permission),
            menu_editable_json: JSON.stringify(formData.menu_editable),
          },
        });
      } else {
        await createTag({
          paramsData: {
            tag_type: "menu",
            tag_name: formData.tag_name,
            menu_permission_json: formData.menu_permission,
            menu_editable_json: formData.menu_editable,
          },
        });
      }
      dispatch(trigger());
    } catch (err) {
      throw err;
    }
  };

  return (
    <CommonModal
      submitFunction={handleSubmit}
      modalProps={{
        title: (
          <Typography.Title level={4} className="mt-[0px]" italic>
            <TagsOutlined />
            {i18n("create")}
          </Typography.Title>
        ),
      }}
      modalTrigger={true}
    >
      <Divider />
      <CreateMenuForm />
    </CommonModal>
  );
};

export default CreateMenuAuth;
