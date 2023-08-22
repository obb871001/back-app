import {
  ProForm,
  ProFormCheckbox,
  ProFormGroup,
  ProFormSwitch,
  ProFormText,
} from "@ant-design/pro-components";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { formats, modules } from "../../../../utils/quill/modules";
import { Divider } from "antd";
import UploadImage from "../../../../utils/quill/uploadImage";

const PromotionForm = () => {
  const [quillValue, setQuillValue] = useState("");
  return (
    <>
      <ProFormGroup>
        <ProFormText label="活動標題" name="title" />
      </ProFormGroup>
      <UploadImage langLabel="中文" name="images_zhs" />
      <UploadImage langLabel="英文" name="images_en" />
      <ProForm.Item label="顯示在輪播上" name="showCarousel">
        <ProFormSwitch />
      </ProForm.Item>
      <Divider dashed />
      <ProForm.Item label="活動內容文案" name="content">
        <ReactQuill
          value={quillValue}
          onChange={(content) => {
            setQuillValue(content);
          }}
          modules={modules}
          formats={formats}
        />
      </ProForm.Item>
    </>
  );
};

export default PromotionForm;
