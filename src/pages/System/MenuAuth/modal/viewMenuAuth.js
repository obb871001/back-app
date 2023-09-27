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
import { useParams } from "react-router";
import { getFunctionTag } from "../../../../api/methods/getApi";
import { parseSomething } from "../../../../utils/parseSomething";

const ViewMenuAuth = () => {
  const [form] = useForm();

  const { uid } = useParams();

  useEffect(() => {
    getFunctionTag({
      paramsData: { tag_type: "menu" },
      pathParams: uid,
    }).then((data) => {
      form.setFieldsValue({
        tag_name: data.tag_name,
        menu_permission: parseSomething(data.menu_permission_json),
        menu_editable: parseSomething(data.menu_editable_json),
      });
    });
  }, []);

  return (
    <CustomModal
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
