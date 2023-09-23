import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import NumberColumns from "../../table/numberColumns";
import { Divider, Modal, Table } from "antd";
import { relativeFromTime } from "../../../utils/getDay";
import dayjs from "dayjs";
import { getActivePlayer, getMemberList } from "../../../api/methods/getApi";
import { ProTable } from "@ant-design/pro-components";
import NavigatePlayer from "../../table/navigatePlayer";

const OnlinePlayerList = ({ openUserPop, setOpenUserPop }) => {
  const { t } = useTranslation();
  const i18n = (key) => t(`page.admin.playersearch.${key}`);
  const i18n_modal = (key) => t(`commonModal.${key}`);

  const [onlineList, setOnlineList] = useState([]);

  const nowTimestamp = dayjs().unix();
  const halfHourAgoTimestamp = dayjs().subtract(30, "minute").unix();

  useEffect(() => {
    getActivePlayer({
      paramsData: {
        create_ts: `${halfHourAgoTimestamp},${nowTimestamp}`,
      },
    })
      .then((data) => {
        setOnlineList(data);
      })
      .catch((err) => {
        const data = err.response.data;
      })
      .finally(() => {});
  }, []);

  const columns = [
    {
      title: i18n("col.number"),
      dataIndex: "uid",
      key: "uid",
      width: 50,
      type: "number",
      ex: "1",
    },
    {
      title: i18n("col.agent"),
      dataIndex: "cagent_belong",
      key: "cagent_belong",
      ex: "agent01",
    },

    {
      title: i18n("col.playerId"),
      dataIndex: "memId",
      key: "memId",
      render: (value, row) => {
        return <NavigatePlayer uid={row.uid} player={value} />;
      },
    },
    {
      title: i18n("col.accountBalance"),
      dataIndex: "balance",
      key: "balance",
      render: (row, value) => <NumberColumns number={row} />,
    },

    {
      title: i18n("col.mobile"),
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: i18n("col.email"),
      dataIndex: "email",
      key: "email",
    },
    {
      title: i18n("col.truename"),
      dataIndex: "true_name",
      key: "true_name",
    },

    {
      title: i18n("col.oauthTime"),
      dataIndex: "oauth_ts",
      key: "oauth_ts",
      render: (row) => relativeFromTime(row, { unix: true }),
    },
    {
      title: i18n("col.country"),
      dataIndex: "country",
      key: "country",
    },
  ];

  return (
    <Modal
      open={openUserPop}
      width={700}
      onCancel={() => {
        setOpenUserPop(false);
      }}
      onOk={() => {
        setOpenUserPop(false);
      }}
      okText={i18n_modal("close")}
      cancelButtonProps={{ style: { display: "none" } }}
      destroyOnClose
      title={i18n("onlinePlayerListonTime")}
    >
      <Divider />
      <ProTable
        size="small"
        scroll={{ x: "max-content" }}
        columns={columns}
        dataSource={onlineList}
        headerTitle={false}
        toolBarRender={false}
        search={false}
      />
    </Modal>
  );
};

export default OnlinePlayerList;
