import { ProTable } from "@ant-design/pro-components";
import { ConfigProvider, Space, Tag, theme } from "antd";

import { useState } from "react";
import enUSIntl from "antd/lib/locale/en_US";

const CommonTable = ({
  dataSource,
  columns,
  tableProps,
  summary,
  tableLoading,
  setTrigger,
}) => {
  const { title } = tableProps || {};

  return (
    <ConfigProvider locale={enUSIntl}>
      <ProTable
        columns={columns}
        dataSource={dataSource}
        headerTitle={title}
        cardBordered
        loading={tableLoading}
        scroll={{ x: "max-content" }}
        search={false}
        options={{
          reload: () => {
            setTrigger((prev) => !prev);
          },
        }}
        pagination={{
          pageSize: 20,
          onChange: (page) => console.log(page),
        }}
        summary={summary}
      />
    </ConfigProvider>
  );
};

export default CommonTable;
