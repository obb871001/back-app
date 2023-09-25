import { useTranslation } from "react-i18next";
import CreateButton from "../../../components/button/createButton";
import CommonPageTitle from "../../../components/layout/CommonPageTitle";
import LittleWrapper from "../../../components/layout/LittleWrapper";
import TableWrapper from "../../../components/layout/TableWrapper";
import CommonTable from "../../../components/table/commonTable";
import CreateGameAuth from "./modal/createGameAuth";
import ActionCol from "../../../components/tableColumns/actionCol";
import { useDispatch, useSelector } from "react-redux";
import {
  apiCalled,
  apiCalling,
  storeDetail,
  trigger,
} from "../../../redux/action/common/action";
import { Modal, message, notification } from "antd";
import { deleteCagentTags } from "../../../api/methods/deleteApi";
import { useEffect, useState } from "react";
import { getFunctionTag } from "../../../api/methods/getApi";
import { parseSomething } from "../../../utils/parseSomething";
import { TagsOutlined } from "@ant-design/icons";

const GameAuthSettings = () => {
  const { t } = useTranslation();
  const i18n = (key) => t(`page.systemsetting.gameAuth.${key}`);
  const i18n_modal = (key, props) => t(`commonModal.${key}`, { ...props });
  const i18n_common = (key) => t(`common.${key}`);

  const [buttonLoading, setButtonLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [gameTagList, setGameTagList] = useState([]);

  const dispatch = useDispatch();
  const triggerReducers = useSelector((state) => state.trigger);

  useEffect(() => {
    setTableLoading(true);
    dispatch(apiCalling());

    getFunctionTag({ paramsData: { tag_type: "game_permission" } })
      .then((data) => {
        setGameTagList(data);
      })
      .finally(() => {
        setTableLoading(false);
        dispatch(apiCalled());
      });
  }, [triggerReducers]);

  const deleteConfirmModal = ({ uid }) => {
    Modal.confirm({
      title: i18n_modal("deleteConfirm", { title: i18n("title") }),
      content: i18n_modal("deleteConfirmContent"),
      okText: i18n_modal("delete"),
      okType: "primary",
      okButtonProps: {
        danger: true,
      },
      onOk: () => {
        message.loading({ content: i18n_common("loading") });
        deleteCagentTags({
          uid: uid,
        })
          .then((res) => {
            message.destroy();
            notification.success({
              message: i18n_modal("deleteSuccess"),
            });
            dispatch(trigger());
          })
          .finally(() => {
            setButtonLoading(false);
          });
      },
    });
  };

  const columns = [
    {
      title: i18n("col.number"),
      dataIndex: "uid",
      key: "uid",
    },
    {
      title: i18n("col.authName"),
      dataIndex: "tag_name",
      key: "tag_name",
    },

    {
      title: "",
      dataIndex: "",
      key: "",
      render: (value, row) => {
        return (
          <ActionCol
            callApi={() => {
              dispatch(
                storeDetail({
                  ...row,
                  game_permission: parseSomething(row.game_permission_json),
                })
              );
            }}
            callDeleteApi={() => {
              deleteConfirmModal({ uid: row.uid });
            }}
            apiUid={row.uid}
            openDetail
            openEdit
            openDelete
          />
        );
      },
    },
  ];

  return (
    <>
      <LittleWrapper>
        <CommonPageTitle
          pagePath="gamepermissions"
          commonHint={i18n("titleHint")}
        />
        {/* <EditAuthColumns> */}
        <CreateButton icon={<TagsOutlined />} type={i18n("title")} />
        {/* </EditAuthColumns> */}
        <TableWrapper>
          <CommonTable
            tableLoading={tableLoading}
            columns={columns}
            dataSource={gameTagList}
          />
        </TableWrapper>
      </LittleWrapper>
    </>
  );
};

export default GameAuthSettings;
