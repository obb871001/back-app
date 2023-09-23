import React, { useEffect } from "react";
import MenuForm from "./menuForm";
import MenuPermissions from "../../../../components/permissionComponents/menuPermissions";
import { useSelector } from "react-redux";
import { parseSomething } from "../../../../utils/parseSomething";

const CreateMenuForm = ({ form }) => {
  const commonDetail = useSelector((state) => state.commonDetail);

  useEffect(() => {
    if (commonDetail) {
      form.setFieldsValue({
        tag_name: commonDetail.tag_name,
        menu_permission: commonDetail.menu_permission,
        menu_editable: commonDetail.menu_editable,
      });
    }
  }, []);
  return (
    <>
      <MenuForm form={form} />
      <MenuPermissions form={form} />
    </>
  );
};

export default CreateMenuForm;
