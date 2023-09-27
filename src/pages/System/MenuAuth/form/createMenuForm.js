import React, { useEffect } from "react";
import MenuForm from "./menuForm";
import MenuPermissions from "../../../../components/permissionComponents/menuPermissions";
import { useSelector } from "react-redux";
import { parseSomething } from "../../../../utils/parseSomething";
import { useParams } from "react-router";
import { getFunctionTag } from "../../../../api/methods/getApi";

const CreateMenuForm = ({ form }) => {
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
    <>
      <MenuForm form={form} i18nKeyWord={`menuAuth`} />
      <MenuPermissions form={form} />
    </>
  );
};

export default CreateMenuForm;
