import { Checkbox, Divider, Form, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import CommonTitle from "../form/commonTitle";
import { storeForm } from "../../redux/action/form/action";
import { filterMenuKeys } from "../../helpers/aboutAuth/filterMenuKeys";
import { useTranslation } from "react-i18next";

const GamePermission = ({ form, hiddenTitle }) => {
  const { t } = useTranslation();
  const i18n = (key) => t(`permission.game.${key}`);

  const gameList = useSelector(
    (state) => state.gameList.gamePlatform || ["MWSlot", "JILI"]
  );
  const dispatch = useDispatch();
  const formDetail = useSelector((state) => state.formReducers);
  const agentDetail = useSelector((state) => state.commonDetail);
  const popType = useSelector((state) => state.popType);

  const [gamePermission, setGamePermission] = useState(
    formDetail.game_permission || []
  );
  const [indeterminate, setIndeterminate] = useState(false);
  const [checkAll, setCheckAll] = useState(false);

  useEffect(() => {
    if (popType === "edit") {
      setGamePermission(filterMenuKeys(agentDetail.game_permission) || []);
    }
    if (form.getFieldValue("game_permission")) {
      setGamePermission(form.getFieldValue("game_permission"));
    }
  }, [agentDetail]);

  useEffect(() => {
    dispatch(storeForm({ ...formDetail, ...gamePermission }));
  }, [gamePermission]);

  useEffect(() => {
    setCheckAll(gamePermission.length === gameList.length);
    setIndeterminate(
      gamePermission.length > 0 && gamePermission.length < gameList.length
    );
  }, [form, gamePermission]);

  const handleCheckAllChange = (e) => {
    setGamePermission(e.target.checked ? gameList : []);
    form.setFieldsValue({
      game_permission: e.target.checked ? gameList : [],
    });
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  const handleGroupChange = (checkedList) => {
    setGamePermission(checkedList);
    form.setFieldsValue({
      game_permission: checkedList,
    });
    setIndeterminate(
      checkedList.length > 0 && checkedList.length < gameList.length
    );
    setCheckAll(checkedList.length === gameList.length);
  };

  return (
    <Form.Item
      name="game_permission"
      label={hiddenTitle ? "" : <CommonTitle title={i18n("title")} />}
      valuePropName="checked"
    >
      <Checkbox
        indeterminate={indeterminate}
        onChange={handleCheckAllChange}
        checked={checkAll}
        className="mb-[10px]"
        disabled={popType === "detail"}
      >
        {i18n("selectAll")}
      </Checkbox>

      <Checkbox.Group
        value={form.getFieldValue("game_permission")}
        className="flex flex-col gap-[10px] items-start"
        onChange={handleGroupChange}
      >
        {gameList?.map((item) => {
          return (
            <Checkbox disabled={popType === "detail"} key={item} value={item}>
              {item}
            </Checkbox>
          );
        })}
      </Checkbox.Group>
    </Form.Item>
  );
};

export default GamePermission;
