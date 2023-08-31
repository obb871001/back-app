import { useForm } from "antd/es/form/Form";
import CustomForm from "../form/customForm";
import ProForm from "@ant-design/pro-form";
import { Button, Form, Popover, Space, message } from "antd";
import { DownloadOutlined, FileSearchOutlined } from "@ant-design/icons";
import { CSVLink } from "react-csv";
import { useRef, useState, useEffect } from "react";

const CsvForm = ({ columns, csvApi, csvParams }) => {
  const [form] = useForm();

  const csvRef = useRef();

  const [csvData, setCsvData] = useState([]);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [canDownload, setCanDownload] = useState(false);
  const [pagination, setPagination] = useState({
    total_records: 0,
    per_page: 0,
    last_page: 0,
    current_page: 0,
  });

  const formatColumns = columns
    .filter((item) => item.search)
    .map((item) => {
      return {
        ...item,
        label: item.title,
        name: item.key,
      };
    });

  const basicForm = [
    { label: "檔案名稱", name: "filename", type: "text", required: true },
    { label: "時間範圍", name: "create_ts", type: "date" },
    ...formatColumns,
  ];

  //   useEffect(() => {
  //     if (csvData && csvData.length > 0) {
  //       csvRef.current.link.click();
  //     }
  //   }, [csvData]);

  const handleDownloadCsv = () => {
    setButtonLoading(true);
    const values = form.getFieldsValue();
    const params = {
      ...values,
      ...csvParams,
      no_limit_data: 1,
    };
    csvApi({ paramsData: params })
      .then((res) => {
        const processedData = res.data.list.map((item) => {
          return Object.fromEntries(
            Object.entries(item).map(([key, value]) => [
              key,
              value === null ? "-" : value,
            ])
          );
        });
        setCsvData(processedData);
        setPagination(res.data.pagination);
        setCanDownload(true);
      })
      .catch((err) => {
        message.error(err.response.data.message);
      })
      .finally(() => {
        setButtonLoading(false);
      });
  };
  return (
    <ProForm
      form={form}
      layout="horizontal"
      labelCol={{
        span: 5,
      }}
      wrapperCol={{
        span: 15,
      }}
      onValuesChange={(changedValues, allValues) => {
        console.log(allValues);
      }}
      onFinish={() => {
        handleDownloadCsv();
      }}
      submitter={{
        render: (props, doms) => {
          return (
            <Form.Item label="操作">
              <Space>
                <Button
                  loading={buttonLoading}
                  key="search"
                  icon={<FileSearchOutlined />}
                  htmlType="submit"
                >
                  查詢
                </Button>
                <Popover content="請先查詢資料">
                  <Button
                    loading={buttonLoading}
                    disabled={!canDownload}
                    icon={<DownloadOutlined />}
                    type="primary"
                    htmlType="button"
                    onClick={() => {
                      csvRef.current.link.click();
                    }}
                  >
                    下載
                  </Button>
                </Popover>
                <span>{`共(${pagination?.total_records})筆`}</span>
              </Space>
            </Form.Item>
          );
        },
      }}
    >
      {basicForm.map((item) => {
        return <CustomForm {...item} />;
      })}
      <CSVLink
        ref={csvRef}
        data={csvData}
        headers={formatColumns}
        filename={form.getFieldValue("filename")}
        className="hidden"
      >
        Download
      </CSVLink>
    </ProForm>
  );
};

export default CsvForm;
