import { ClockCircleOutlined, UserOutlined } from "@ant-design/icons";
import { Modal, Space } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storeNowTime } from "../../redux/action/common/action";
import { useTranslation } from "react-i18next";
import CustomModal from "../modal/customModal";
import OnlinePlayerList from "./components/onlinePlayerList";

const TimeInformation = () => {
  const { t } = useTranslation();
  const i18n_unit = (key) => t(`unit.${key}`);
  const i18n_modal = (key) => t(`commonModal.${key}`);
  const dispatch = useDispatch();

  const time = useSelector((state) => state.nowTime);
  const agentInfo = useSelector((state) => state.agentInfo);

  const [openUserPop, setOpenUserPop] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(storeNowTime(dayjs().format("YYYY-MM-DD (dddd) HH:mm:ss")));
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Space>
        <Space>
          <UserOutlined />
          <span>
            <span
              className="text-blue-500 underline cursor-pointer mr-[5px]"
              onClick={() => {
                setOpenUserPop(true);
              }}
            >{`${agentInfo.activePlayer}`}</span>
            <span className="">{i18n_unit("people")}</span>
          </span>
        </Space>
        <Space>
          <ClockCircleOutlined />
          <span>{time}</span>
        </Space>
      </Space>
      {openUserPop && (
        <OnlinePlayerList
          openUserPop={openUserPop}
          setOpenUserPop={setOpenUserPop}
        />
      )}
    </>
  );
};

export default TimeInformation;
