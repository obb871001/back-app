import { ProFormGroup, ProFormText } from "@ant-design/pro-components";
import { Divider } from "antd";

const GameForm = () => {
  return (
    <>
      <ProFormGroup>
        <ProFormText
          tooltip="此設定為創建代理時可直接選取標籤來更方便的設定權限"
          label="遊戲權限標籤名稱"
          name="loginName"
        />
      </ProFormGroup>
    </>
  );
};

export default GameForm;
