import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";

import CustomModal from "../../../../components/modal/customModal";
import { getMemberList } from "../../../../api/methods/getApi";
import { storeDetail } from "../../../../redux/action/member/action";
import PlayerBasic from "../detail/playerBasic";
import UseMergeableSearchParams from "../../../../hooks/useMergeableSearchParams";
import PlayerPassword from "../detail/playerPassword";
import PlayerBetLimit from "../detail/playerBetLimit";
import { useNavigate, useParams } from "react-router";
import { useTranslation } from "react-i18next";

const DetailPlayer = ({ setIsModalOpen, isModalOpen }) => {
  const { t } = useTranslation();
  const i18n = (key) => t(`page.admin.playersearch.${key}`);

  const { uid } = useParams();

  const dispatch = useDispatch();
  const trigger = useSelector((state) => state.trigger);

  const navigate = useNavigate();

  const [tab, setTab] = useState("1");

  useEffect(() => {
    if (uid) {
      getMemberList({
        paramsData: { uid: uid },
      }).then((res) => {
        dispatch(storeDetail(res.data.list[0]));
      });
    }
  }, [trigger, uid]);

  const handleTabChange = (key) => {
    setTab(`${key}`);
  };

  const tabs = [
    {
      key: "1",
      label: i18n("tabs.basicInfo"),
      children: <PlayerBasic />,
    },
    {
      key: "2",
      label: i18n("tabs.resetPassword"),
      children: <PlayerPassword />,
    },
    // {
    //   key: "3",
    //   label: i18n("tabs.betLimitSettings"),
    //   children: <PlayerBetLimit />,
    // },
  ];
  return (
    <CustomModal
      previousIndex={2}
      modalProps={{ title: i18n("tabs.playerDetail") }}
    >
      <Tabs
        defaultActiveKey={tab}
        activeKey={tab}
        onChange={handleTabChange}
        items={tabs}
      />
    </CustomModal>
  );
};

export default DetailPlayer;
