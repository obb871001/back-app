import React, { useEffect } from "react";
import MenuPermissions from "../../../../components/permissionComponents/menuPermissions";
import { useSelector } from "react-redux";
import { parseSomething } from "../../../../utils/parseSomething";
import GamePermission from "../../../../components/permissionComponents/gamePermission";
import MenuForm from "../../MenuAuth/form/menuForm";

const CreateGameForm = ({ form }) => {
  const commonDetail = useSelector((state) => state.commonDetail);

  useEffect(() => {
    if (commonDetail) {
      form.setFieldsValue({
        tag_name: commonDetail.tag_name,
        game_permission: commonDetail.game_permission,
      });
    }
  }, []);
  return (
    <>
      <MenuForm form={form} i18nKeyWord={`gameAuth`} />
      <GamePermission form={form} />
    </>
  );
};

export default CreateGameForm;
