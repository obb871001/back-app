import { ProFormGroup, ProFormText } from "@ant-design/pro-components";
import { Divider } from "antd";
import { useSelector } from "react-redux";

const MenuForm = ({ form }) => {
  const popType = useSelector((state) => state.popType);
  return (
    <>
      <ProFormGroup>
        <ProFormText
          tooltip="此設定為創建代理時可直接選取標籤來更方便的設定權限"
          label="選單權限標籤名稱"
          name="tag_name"
          readonly={popType === "detail"}
        />
      </ProFormGroup>
    </>
  );
};

export default MenuForm;
