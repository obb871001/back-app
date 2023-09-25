import React, { useEffect, useState } from "react";
import CreateCommissionTag from "./modal/createCommissionTag";
import LittleWrapper from "../../../components/layout/LittleWrapper";
import CommonPageTitle from "../../../components/layout/CommonPageTitle";
import CreateButton from "../../../components/button/createButton";
import CommonTable from "../../../components/table/commonTable";
import { useTranslation } from "react-i18next";
import TableWrapper from "../../../components/layout/TableWrapper";
import ActionCol from "../../../components/tableColumns/actionCol";
import { useDispatch, useSelector } from "react-redux";
import {
  apiCalled,
  apiCalling,
  storeDetail,
  trigger,
} from "../../../redux/action/common/action";
import { parseSomething } from "../../../utils/parseSomething";
import { Modal, message, notification } from "antd";
import { deleteCagentTags } from "../../../api/methods/deleteApi";
import { getFunctionTag } from "../../../api/methods/getApi";
import { TagsOutlined } from "@ant-design/icons";

const Commission = () => {
  const { t } = useTranslation();
  const i18n = (key) => t(`page.systemsetting.gameCommission.${key}`);
  const i18n_modal = (key, props) => t(`commonModal.${key}`, { ...props });
  const i18n_common = (key) => t(`common.${key}`);

  const dispatch = useDispatch();
  const triggerReducers = useSelector((state) => state.trigger);

  const [tableLoading, setTableLoading] = useState(false);
  const [gameTagList, setGameTagList] = useState([]);

  useEffect(() => {
    setTableLoading(true);
    dispatch(apiCalling());

    getFunctionTag({ paramsData: { tag_type: "game_per" } })
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
          .finally(() => {});
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
                  game_per: parseSomething(row.game_per_json),
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
        <CommonPageTitle pagePath="comission" commonHint={i18n("titleHint")} />
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

export default Commission;
