import { Button, Divider, Typography } from "antd";
import CommonModal from "../../../../components/modal/commonModal";
import { CrownFilled, TagsOutlined } from "@ant-design/icons";
import CommissionForm from "../form/commissionForm";
import CommissionPermission from "../../../../components/permissionComponents/commissionPermission";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { updateTag } from "../../../../api/methods/patchApi";
import { createTag } from "../../../../api/methods/postApi";
import { trigger } from "../../../../redux/action/common/action";
import CreateGameCommissionForm from "../form/createGameCommissionForm";

const CreateCommissionTag = () => {
  const { t } = useTranslation();
  const i18n = (key) => t(`page.systemsetting.gameCommission.${key}`);

  const popType = useSelector((state) => state.popType);
  const commonDetail = useSelector((state) => state.commonDetail);
  const dispatch = useDispatch();

  const handleSubmit = async (formData) => {
    try {
      if (popType === "edit") {
        await updateTag({
          uid: commonDetail.uid,
          patchData: {
            tag_type: "game_per",
            tag_name: formData.tag_name,
            game_per_json: JSON.stringify(formData.game_per),
          },
        });
      } else {
        await createTag({
          paramsData: {
            tag_type: "game_per",
            tag_name: formData.tag_name,
            game_per_json: formData.game_per,
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
          <Typography.Title level={4} italic className="mt-[0px]">
            <TagsOutlined />
            {i18n("create")}
          </Typography.Title>
        ),
      }}
      modalTrigger={true}
    >
      <Divider />
      <CreateGameCommissionForm />
    </CommonModal>
  );
};

export default CreateCommissionTag;
