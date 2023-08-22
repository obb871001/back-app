import { ProForm, ProFormGroup, ProFormText } from "@ant-design/pro-components";
import { Divider } from "antd";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import { formats, modules } from "../../../../utils/quill/modules";

const InboxForm = () => {
  const [quillValue, setQuillValue] = useState("");
  return (
    <>
      <ProFormGroup>
        <ProFormText
          label="發送對象"
          name="target"
          width={300}
          placeholder="若發送給所有人則無須填寫欄位"
        />
      </ProFormGroup>
      <ProFormGroup>
        <ProFormText width={300} label="站內信標題" name="title" />
      </ProFormGroup>

      <ProForm.Item label="站內信文案" name="content">
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

export default InboxForm;
