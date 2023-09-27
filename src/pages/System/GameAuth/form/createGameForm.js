import React, { useEffect } from "react";
import MenuPermissions from "../../../../components/permissionComponents/menuPermissions";
import { useSelector } from "react-redux";
import { parseSomething } from "../../../../utils/parseSomething";
import GamePermission from "../../../../components/permissionComponents/gamePermission";
import MenuForm from "../../MenuAuth/form/menuForm";
import { useParams } from "react-router";
import { getFunctionTag } from "../../../../api/methods/getApi";

const CreateGameForm = ({ form }) => {
  const commonDetail = useSelector((state) => state.commonDetail);

  const { uid } = useParams();

  useEffect(() => {
    getFunctionTag({
      paramsData: { tag_type: "game_permission" },
      pathParams: uid,
    }).then((data) => {
      form.setFieldsValue({
        tag_name: data.tag_name,
        game_permission: parseSomething(data.game_permission_json),
      });
    });
  }, []);
  return (
    <>
      <MenuForm form={form} i18nKeyWord={`gameAuth`} />
      <GamePermission form={form} />
    </>
  );
};

export default CreateGameForm;
