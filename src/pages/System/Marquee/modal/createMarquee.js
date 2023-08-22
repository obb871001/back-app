import { Button } from "antd";
import CommonModal from "../../../../components/modal/commonModal";
import { SoundOutlined } from "@ant-design/icons";
import MarqueeForm from "../form/marqueeForm";

const CreateMarquee = () => {
  return (
    <CommonModal
      modalProps={{
        title: (
          <p>
            <SoundOutlined />
            新增跑馬燈
          </p>
        ),
      }}
      useButton={
        <Button icon={<SoundOutlined />} type="primary">
          新增跑馬燈
        </Button>
      }
    >
      <MarqueeForm />
    </CommonModal>
  );
};

export default CreateMarquee;
