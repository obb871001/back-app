import { Button, Divider, Typography } from "antd";
import CommonModal from "../../../../components/modal/commonModal";
import { TagsOutlined } from "@ant-design/icons";
import GameForm from "../form/gameForm";
import GamePermission from "../../../../components/permissionComponents/gamePermission";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { updateTag } from "../../../../api/methods/patchApi";
import { createTag } from "../../../../api/methods/postApi";
import { trigger } from "../../../../redux/action/common/action";
import CreateGameForm from "../form/createGameForm";

const CreateGameAuth = () => {
  const { t } = useTranslation();
  const i18n = (key) => t(`page.systemsetting.gameAuth.${key}`);

  const popType = useSelector((state) => state.popType);
  const commonDetail = useSelector((state) => state.commonDetail);
  const dispatch = useDispatch();

  const handleSubmit = async (formData) => {
    try {
      if (popType === "edit") {
        await updateTag({
          uid: commonDetail.uid,
          patchData: {
            tag_type: "game_permission",
            tag_name: formData.tag_name,
            game_permission_json: JSON.stringify(formData.game_permission),
          },
        });
      } else {
        await createTag({
          paramsData: {
            tag_type: "game_permission",
            tag_name: formData.tag_name,
            game_permission_json: formData.game_permission,
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
      <CreateGameForm />
    </CommonModal>
  );
};

export default CreateGameAuth;
