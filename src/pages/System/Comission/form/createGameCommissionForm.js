import React, { useEffect } from "react";
import MenuPermissions from "../../../../components/permissionComponents/menuPermissions";
import { useSelector } from "react-redux";
import { parseSomething } from "../../../../utils/parseSomething";
import GamePermission from "../../../../components/permissionComponents/gamePermission";
import MenuForm from "../../MenuAuth/form/menuForm";
import GameCommission from "../../../Agent/AgentList/step/gameCommission";
import CommissionPermission from "../../../../components/permissionComponents/commissionPermission";

const CreateGameCommissionForm = ({ form }) => {
  const commonDetail = useSelector((state) => state.commonDetail);

  useEffect(() => {
    if (commonDetail) {
      form.setFieldsValue({
        tag_name: commonDetail.tag_name,
        game_per: commonDetail.game_per,
      });
    }
  }, []);
  return (
    <>
      <MenuForm form={form} i18nKeyWord={`gameCommission`} />
      <CommissionPermission prefix="per" form={form} />
    </>
  );
};

export default CreateGameCommissionForm;
