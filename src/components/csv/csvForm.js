import { useForm } from "antd/es/form/Form";
import CustomForm from "../form/customForm";
import ProForm from "@ant-design/pro-form";
import { Button, Form, Popover, Space, message } from "antd";
import { DownloadOutlined, FileSearchOutlined } from "@ant-design/icons";
import { CSVLink } from "react-csv";
import { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toTimeStamp } from "../../utils/toTimeStamp";
import dayjs from "dayjs";

const CsvForm = ({ columns, csvApi, csvParams }) => {
  const { t } = useTranslation();
  const i18n = (key, total) => t(`commonTable.${key}`, { total });

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
        key: item.dataIndex,
        label: item.title,
        name: item.key,
      };
    });

  const basicForm = [
    { label: i18n("fileName"), name: "filename", type: "text", required: true },
    { label: i18n("timeRange"), name: "create_ts", type: "date" },
    ...formatColumns,
  ];

  //   useEffect(() => {
  //     if (csvData && csvData.length > 0) {
  //       csvRef.current.link.click();
  //     }
  //   }, [csvData]);

  const handleDownloadCsv = () => {
    const timeRegex = /^\d{4}-\d{2}-\d{2}$/;

    setButtonLoading(true);
    const values = form.getFieldsValue();
    const formatValues = Object.entries(values).reduce((acc, [key, value]) => {
      if (Array.isArray(value)) {
        if (value.every((item) => dayjs.isDayjs(item))) {
          acc[key] = `${toTimeStamp(value[0])},${toTimeStamp(value[1])}`;
        } else {
          acc[key] = value.join(",");
        }
      } else {
        if (key === "filename") {
        } else {
          acc[key] = value;
        }
      }
      return acc;
    }, {});
    const params = {
      ...formatValues,
      ...csvParams,
      no_limit_data: 1,
    };
    csvApi({ paramsData: params })
      .then((res) => {
        const columnsFormat = formatColumns
          ?.filter((item) => item.csvTurn)
          ?.reduce((acc, cur) => {
            acc[cur.key] = {
              render: cur.csvRender ? cur.csvRender : cur.render,
            };
            return acc;
          }, {});

        const processedData = res.data.list?.map((item) => {
          return Object.fromEntries(
            Object.entries(item).map(([key, value]) => {
              if (columnsFormat[key]?.render) {
                value = columnsFormat[key]?.render(value, item);
              }
              return [key, value === null ? "-" : value];
            })
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
        span: 9,
      }}
      wrapperCol={{
        span: 15,
      }}
      onValuesChange={(changedValues, allValues) => {}}
      onFinish={() => {
        handleDownloadCsv();
      }}
      submitter={{
        render: (props, doms) => {
          return (
            <Form.Item label={i18n("action")}>
              <Space>
                <Button
                  loading={buttonLoading}
                  key="search"
                  icon={<FileSearchOutlined />}
                  htmlType="submit"
                >
                  {i18n("search")}
                </Button>
                <Popover content={i18n("pleaseSearchData")}>
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
                    {i18n("download")}
                  </Button>
                </Popover>
                <span>{`${i18n("totalData", pagination?.total_records)}`}</span>
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
        {i18n("Download")}
      </CSVLink>
    </ProForm>
  );
};

export default CsvForm;
