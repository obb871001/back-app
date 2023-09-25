import { Button, Form } from "antd";
import CommonModal from "../../../../components/modal/commonModal";
import MenuPermissions from "../../../../components/permissionComponents/menuPermissions";
import MenuForm from "../form/menuForm";
import { TagsOutlined } from "@ant-design/icons";
import { createTag } from "../../../../api/methods/postApi";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useForm } from "antd/es/form/Form";
import CustomModal from "../../../../components/modal/customModal";

const ViewMenuAuth = () => {
  const [form] = useForm();

  const commonDetail = useSelector((state) => state.commonDetail);

  useEffect(() => {
    form.setFieldsValue({
      tag_name: commonDetail.tag_name,
      menu_permission: JSON.parse(commonDetail.menu_permission_json),
      menu_editable: JSON.parse(commonDetail.menu_editable_json),
    });
  }, []);

  const handleSubmit = async (formData) => {
    try {
      await createTag({
        paramsData: {
          tag_type: "menu",
          tag_name: formData.tag_name,
          menu_permission_json: formData.menu_permission,
          menu_editable_json: formData.menu_editable,
        },
      });
    } catch (err) {
      throw err;
    }
  };

  return (
    <CustomModal
      submitFunction={handleSubmit}
      modalProps={{
        title: (
          <p>
            <TagsOutlined />
            選單權限標籤
          </p>
        ),
      }}
      modalTrigger={true}
    >
      <Form form={form}>
        <MenuForm form={form} i18nKeyWord={`menuAuth`} />
        <MenuPermissions hiddenTitle type="detail" form={form} />
      </Form>
    </CustomModal>
  );
};

export default ViewMenuAuth;
