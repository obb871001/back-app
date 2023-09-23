import React, { useEffect, useState } from "react";
import CreateMenuAuth from "./modal/createMenuAuth";
import { getFunctionTag } from "../../../api/methods/getApi";
import CommonTable from "../../../components/table/commonTable";
import { allowClick } from "../../../assets/style/styleConfig";
import ActionCol from "../../../components/tableColumns/actionCol";
import { useDispatch, useSelector } from "react-redux";
import { storeDetail } from "../../../redux/action/common/action";
import EditAuthColumns from "../../../utils/EditAuthColumns";
import CreateButton from "../../../components/button/createButton";
import { parseSomething } from "../../../utils/parseSomething";

const MenuAuthSettings = () => {
  const dispatch = useDispatch();
  const trigger = useSelector((state) => state.trigger);

  const [menuTagList, setMenuTagList] = useState([]);

  useEffect(() => {
    getFunctionTag({ paramsData: { tag_type: "menu" } }).then((data) => {
      setMenuTagList(data);
    });
  }, [trigger]);

  const columns = [
    {
      title: "序號",
      dataIndex: "uid",
      key: "uid",
    },
    {
      title: "名稱",
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
            apiUid={row.uid}
            openDetail
            openEdit
          />
        );
      },
    },
  ];
  return (
    <>
      {/* <EditAuthColumns> */}
      <CreateButton type={`選單權限`} />
      {/* </EditAuthColumns> */}

      <section>
        <CommonTable closeHeader columns={columns} dataSource={menuTagList} />
      </section>
    </>
  );
};

export default MenuAuthSettings;
