import { UploadOutlined } from "@ant-design/icons";
import { ProForm } from "@ant-design/pro-components";
import { Button, Upload, message } from "antd";
import React, { useState } from "react";

const UploadImage = ({ name, langLabel }) => {
  const [fileList, setFileList] = useState([]);

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const props = {
    name: "file",
    action: "https://newams.91url.cc/",
    headers: {
      authorization: "authorization-text",
    },
    multiple: false,
    maxCount: 1,
    beforeUpload: (file) => {
      setFileList([file]);
      return false;
    },
    onRemove: () => {
      setFileList([]);
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <ProForm.Item
      getValueFromEvent={normFile}
      valuePropName="fileList"
      label={`活動圖片${langLabel && `(${langLabel})`}`}
      name={name}
    >
      <Upload fileList={fileList} {...props}>
        <Button icon={<UploadOutlined />}>點擊上傳圖片</Button>
      </Upload>
    </ProForm.Item>
  );
};

export default UploadImage;
