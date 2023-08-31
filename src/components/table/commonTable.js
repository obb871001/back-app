import { ProTable } from "@ant-design/pro-components";
import { Button, Space, Tag, theme } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { useState } from "react";
import { FileAddOutlined } from "@ant-design/icons";
import CustomModal from "../modal/customModal";
import CsvForm from "../csv/csvForm";
import { trigger } from "../../redux/action/common/action";
import UseMergeableSearchParams from "../../hooks/useMergeableSearchParams";

const CommonTable = ({
  dataSource,
  columns,
  tableProps,
  summary,
  tableLoading,
  csvApi,
  customPagination,
  bordered,
  csvParams,
}) => {
  const [searchParams, setSearchParams] = UseMergeableSearchParams();
  const { per_page = 20, current_page = 1 } = searchParams;

  const { title } = tableProps || {};

  const [openCsvPop, setOpenCsvPop] = useState(false);

  const dispatch = useDispatch();
  const { last_page, total_records } = useSelector(
    (state) => state.totalDataRecords
  );

  const headers = [
    { label: "First Name", key: "firstname" },
    { label: "Last Name", key: "lastname" },
    { label: "Email", key: "email" },
  ];
  const data = [
    { firstname: "Ahmed", lastname: "Tomi", email: "ah@smthing.co.com" },
    { firstname: "Raed", lastname: "Labes", email: "rl@smthing.co.com" },
    { firstname: "Yezzi", lastname: "Min l3b", email: "ymin@cocococo.com" },
  ];
  return (
    <>
      <ProTable
        size="small"
        className="w-full"
        columns={columns.filter((col) => !col.columnsHidden)}
        dataSource={dataSource}
        headerTitle={title}
        cardBordered
        bordered={bordered}
        loading={tableLoading}
        scroll={{ x: "max-content" }}
        search={false}
        options={{
          reload: () => {
            dispatch(trigger());
          },
        }}
        toolBarRender={() => [
          csvApi && (
            <Button
              key="primary"
              type="primary"
              htmlType="button"
              onClick={() => {
                setOpenCsvPop(true);
              }}
            >
              <FileAddOutlined />
              導出
            </Button>
          ),
        ]}
        pagination={
          customPagination
            ? customPagination
            : {
                pageSize: per_page,
                onChange: (page, pageSize) => {
                  setSearchParams({ current_page: page, per_page: pageSize });
                },
                total: total_records,
                showSizeChanger: true,
                current: Number(current_page),
              }
        }
        summary={summary}
      />
      <CustomModal
        modalProps={{ title: "導出表單", width: 500 }}
        isModalOpen={openCsvPop}
        setIsModalOpen={setOpenCsvPop}
      >
        <CsvForm csvApi={csvApi} columns={columns} csvParams={csvParams} />
      </CustomModal>
    </>
  );
};

export default CommonTable;
