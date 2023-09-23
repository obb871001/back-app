import { ProTable } from "@ant-design/pro-components";
import { Alert, Button, Space, Tag, theme } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { useState } from "react";
import { FileAddOutlined } from "@ant-design/icons";
import CustomModal from "../modal/customModal";
import CsvForm from "../csv/csvForm";
import { trigger } from "../../redux/action/common/action";
import UseMergeableSearchParams from "../../hooks/useMergeableSearchParams";
import { useTranslation } from "react-i18next";
import { cardTitleClass } from "../../constant";

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
  expandable,
  rowKey,
  closeTimeOptional, //配合searchTool的時間選項
  closeHeader,
}) => {
  const { t } = useTranslation();
  const i18n = (key) => t(`commonTable.${key}`);

  const [searchParams, setSearchParams] = UseMergeableSearchParams();
  const { per_page = 20, current_page = 1 } = searchParams;

  const { title } = tableProps || {};

  const [openCsvPop, setOpenCsvPop] = useState(false);

  const dispatch = useDispatch();
  const hasSearched = useSelector((state) => state.hasSearched);
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
    <section className="min-h-[700px]">
      {closeHeader || (
        <section
          className={`${cardTitleClass} py-[10px] px-[15px] rounded-t font-semibold`}
        >
          {i18n("searchResult")}
        </section>
      )}
      {closeTimeOptional ? (
        hasSearched ? (
          <ProTable
            size="small"
            className="w-full "
            columns={columns?.filter((col) => !col.columnsHidden)}
            dataSource={dataSource}
            headerTitle={title || false}
            bordered={bordered}
            rowKey={rowKey}
            loading={tableLoading}
            expandable={expandable}
            scroll={{ x: "max-content" }}
            search={false}
            options={{
              reload: () => {
                dispatch(trigger());
              },
            }}
            locale={{
              emptyText: hasSearched ? "沒有找到數據" : "請先進行搜索",
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
                  {i18n("export")}
                </Button>
              ),
            ]}
            pagination={
              customPagination
                ? customPagination
                : {
                    pageSize: per_page,
                    onChange: (page, pageSize) => {
                      setSearchParams({
                        current_page: page,
                        per_page: pageSize,
                      });
                    },
                    total: total_records,
                    showSizeChanger: true,
                    current: Number(current_page),
                  }
            }
            summary={summary}
          />
        ) : (
          <section className="px-[10px] py-[20px]">
            <Alert
              message={i18n("pleaseInputSearchCondition")}
              className="font-semibold !py-[20px]"
              type="info"
              showIcon
            />
          </section>
        )
      ) : (
        <ProTable
          size="small"
          className="w-full "
          columns={columns?.filter((col) => !col.columnsHidden)}
          dataSource={dataSource}
          headerTitle={false}
          bordered={bordered}
          rowKey={rowKey}
          loading={tableLoading}
          expandable={expandable}
          scroll={{ x: "max-content" }}
          search={false}
          options={{
            reload: () => {
              dispatch(trigger());
            },
          }}
          locale={{
            emptyText: hasSearched
              ? i18n("notData")
              : i18n("pleaseInputSearchCondition"),
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
                {i18n("export")}
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
      )}
      <CustomModal
        modalProps={{ title: i18n("export"), width: 500 }}
        isModalOpen={openCsvPop}
        setIsModalOpen={setOpenCsvPop}
      >
        <CsvForm csvApi={csvApi} columns={columns} csvParams={csvParams} />
      </CustomModal>
    </section>
  );
};

export default CommonTable;
