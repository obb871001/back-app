import { ClockCircleOutlined, UserOutlined } from "@ant-design/icons";
import { Space } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storeNowTime } from "../../redux/action/common/action";

const TimeInformation = () => {
  const dispatch = useDispatch();

  const time = useSelector((state) => state.nowTime);

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(storeNowTime(dayjs().format("YYYY-MM-DD (dddd) HH:mm:ss")));
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Space>
      <Space>
        <UserOutlined />
        <span>
          <span className="text-blue-500 underline cursor-pointer mr-[5px]">{`15`}</span>
          <span className="">人</span>
        </span>
      </Space>
      <Space>
        <ClockCircleOutlined />
        <span>{time}</span>
      </Space>
    </Space>
  );
};

export default TimeInformation;
