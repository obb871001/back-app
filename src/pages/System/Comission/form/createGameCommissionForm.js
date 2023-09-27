import React, { useEffect } from "react";
import MenuPermissions from "../../../../components/permissionComponents/menuPermissions";
import { useSelector } from "react-redux";
import { parseSomething } from "../../../../utils/parseSomething";
import GamePermission from "../../../../components/permissionComponents/gamePermission";
import MenuForm from "../../MenuAuth/form/menuForm";
import GameCommission from "../../../Agent/AgentList/step/gameCommission";
import CommissionPermission from "../../../../components/permissionComponents/commissionPermission";
import { useParams } from "react-router";
import { getFunctionTag } from "../../../../api/methods/getApi";

const CreateGameCommissionForm = ({ form }) => {
  const commonDetail = useSelector((state) => state.commonDetail);

  const { uid } = useParams();

  useEffect(() => {
    getFunctionTag({
      paramsData: { tag_type: "game_per" },
      pathParams: uid,
    }).then((data) => {
      form.setFieldsValue({
        tag_name: data.tag_name,
        game_per: parseSomething(data.game_per_json),
      });
    });
  }, []);

  return (
    <>
      <MenuForm form={form} i18nKeyWord={`gameCommission`} />
      <CommissionPermission prefix="per" form={form} />
    </>
  );
};

export default CreateGameCommissionForm;
