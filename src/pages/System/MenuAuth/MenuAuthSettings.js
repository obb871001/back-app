import React, { useEffect, useState } from "react";
import CreateMenuAuth from "./modal/createMenuAuth";
import { getFunctionTag } from "../../../api/methods/getApi";
import CommonTable from "../../../components/table/commonTable";
import { allowClick } from "../../../assets/style/styleConfig";
import ActionCol from "../../../components/tableColumns/actionCol";
import { useDispatch, useSelector } from "react-redux";
import {
  apiCalled,
  apiCalling,
  storeDetail,
  trigger,
} from "../../../redux/action/common/action";
import EditAuthColumns from "../../../utils/EditAuthColumns";
import CreateButton from "../../../components/button/createButton";
import { parseSomething } from "../../../utils/parseSomething";
import { deleteCagentTags } from "../../../api/methods/deleteApi";
import { Modal, message, notification } from "antd";
import { useTranslation } from "react-i18next";
import CommonPageTitle from "../../../components/layout/CommonPageTitle";
import TableWrapper from "../../../components/layout/TableWrapper";
import LittleWrapper from "../../../components/layout/LittleWrapper";
import { TagsOutlined } from "@ant-design/icons";

const MenuAuthSettings = () => {
  const { t } = useTranslation();
  const i18n = (key) => t(`page.systemsetting.menuAuth.${key}`);
  const i18n_modal = (key, props) => t(`commonModal.${key}`, { ...props });
  const i18n_common = (key) => t(`common.${key}`);

  const dispatch = useDispatch();
  const triggerReducers = useSelector((state) => state.trigger);

  const [menuTagList, setMenuTagList] = useState([]);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);

  useEffect(() => {
    setTableLoading(true);
    dispatch(apiCalling());

    getFunctionTag({ paramsData: { tag_type: "menu" } })
      .then((data) => {
        setMenuTagList(data);
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
                  menu_permission: parseSomething(row.menu_permission_json),
                  menu_editable: parseSomething(row.menu_editable_json),
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
    <LittleWrapper>
      <CommonPageTitle
        pagePath="menupermissions"
        commonHint={i18n("titleHint")}
      />
      {/* <EditAuthColumns> */}
      <CreateButton icon={<TagsOutlined />} type={i18n("title")} />
      {/* </EditAuthColumns> */}
      <TableWrapper>
        <CommonTable
          tableLoading={tableLoading}
          columns={columns}
          dataSource={menuTagList}
        />
      </TableWrapper>
    </LittleWrapper>
  );
};

export default MenuAuthSettings;
