import { Button, Checkbox, Col, Modal, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  fakeGameArray,
  fakeGameType,
  fakeTypeAndPlatform,
} from "../../../../constant";
import { useForm } from "antd/es/form/Form";
import { ProFormCheckbox } from "@ant-design/pro-components";

const BetGametypeLimit = ({ form, fieldKey }) => {
  const gamePlatform = useSelector(
    (state) => state.gameList.gamePlatform || fakeGameArray
  );
  const gametype = useSelector(
    (state) => state.gameList.gameType || fakeGameType
  );
  const gamePlatformAndType = useSelector(
    (state) => state.gameList.gameTypeAndPlatform || fakeTypeAndPlatform
  );

  const gameKey = Object.keys(gametype || []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectType, setSelectType] = useState(gameKey[0]);
  const [selectItems, setSelectItems] = useState([]);
  const [readOnly, setReadOnly] = useState(false);

  useEffect(() => {
    const newCheckedValues = {};
    selectItems.forEach((item) => {
      Object.keys(gamePlatformAndType)
        .slice(2)
        .forEach((key) => {
          if (gamePlatformAndType[key].includes(item)) {
            newCheckedValues[key] = [...(newCheckedValues[key] || []), item];
          }
        });
    });
    form.setFieldsValue({
      checkDetail: {
        [fieldKey]: {
          gameType: newCheckedValues,
        },
      },
    });
  }, [selectItems, gamePlatformAndType]);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setReadOnly(false);
  };

  const handleSelectType = (gameType) => {
    if (selectItems.includes(gameType)) {
      setSelectItems(selectItems.filter((item) => item !== gameType));
    } else {
      setSelectItems([...selectItems, gameType]);
    }
  };

  return (
    <>
      <Space>
        <Button type="primary" onClick={() => showModal()}>
          開啟
        </Button>
        <Button
          onClick={() => {
            showModal();
            setReadOnly(true);
          }}
        >
          查看
        </Button>
      </Space>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose
      >
        <section className="grid grid-cols-4 gap-[5px] mb-[30px]">
          {gameKey?.map((item, index) => {
            return (
              <Button
                onClick={() => {
                  setSelectType(item);
                  handleSelectType(item);
                }}
                className="!flex justify-center"
                key={item}
                type={selectType === item && "primary"}
              >
                {item}
              </Button>
            );
          })}
        </section>
        {gamePlatform.map((platform) => {
          const platformName = gamePlatformAndType[platform];
          return (
            <div
              key={`${platform}-${platformName}`}
              className="flex items-center gap-[10px] mb-[20px] pb-[5px] custom-form-mb-0"
            >
              <Col span={5}>
                <Typography.Text level={4} italic strong>
                  {platform}：
                </Typography.Text>
              </Col>
              <Col span={19}>
                <ProFormCheckbox.Group
                  readonly={readOnly}
                  value={form.getFieldValue([
                    "checkDetail",
                    fieldKey,
                    "gameType",
                    platform,
                  ])}
                  options={platformName?.map((item) => {
                    return { label: item, value: item };
                  })}
                  name={["gameType", platform]}
                />
              </Col>
            </div>
          );
        })}
      </Modal>
    </>
  );
};

export default BetGametypeLimit;
