import { ProForm } from "@ant-design/pro-components";
import { useForm } from "antd/es/form/Form";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { fakeBetlimit } from "../../../../constant";
import {
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Row,
  Space,
  Typography,
  notification,
} from "antd";
import { updatePlayerBetLimit } from "../../../../api/methods/postApi";
import UseMergeableSearchParams from "../../../../hooks/useMergeableSearchParams";

const PlayerBetLimit = () => {
  const [searchParams, setSearchParams] = UseMergeableSearchParams();
  const { playeruid } = searchParams;

  const [form] = useForm();

  const playerDetail = useSelector((state) => state.commonDetail);
  const baseTableLimit = useSelector(
    (state) => state.betLimitDetail || fakeBetlimit
  );

  const [data, setData] = useState({}); //儲存限紅value
  const [buttonLoading, setButtonLoading] = useState(false);

  const detailKeys = useMemo(() => {
    //處理限紅文字
    const result = {};

    Object.keys(data).forEach((key) => {
      const platformName = key.replace("_limit", "");
      const modifiedPlatform = `${platformName}_limit`;

      const limitArray = data[key];

      baseTableLimit
        .filter((item) => item.platform === platformName)
        .forEach((item) => {
          const filteredOptions = item.options.filter((optionItem) => {
            return limitArray?.includes(optionItem.value);
          });
          console.log(filteredOptions);

          if (filteredOptions.length > 0) {
            if (!result[modifiedPlatform]) {
              result[modifiedPlatform] = [];
            }
            filteredOptions.forEach((optionItem) => {
              result[modifiedPlatform].push(optionItem.detail);
            });
          }
        });
    });

    return result;
  }, [data]);

  const onFinish = (values) => {
    setButtonLoading(true);
    const result = !Object.values(values).some((value) => value) ? {} : values;

    updatePlayerBetLimit({
      uid: playeruid,
      bet_limit: result,
    })
      .then((res) => {
        console.log(res);
        notification.success({
          message: "提交成功",
        });
        form.resetFields();
      })
      .catch((err) => {
        const data = err.response.data;
        notification.error({
          message: "提交失敗",
        });
      })
      .finally(() => {
        setButtonLoading(false);
      });
  };

  return (
    <Form
      form={form}
      onValuesChange={(values, allValues) => {
        console.log(allValues);
        setData(allValues);
      }}
      onFinish={onFinish}
    >
      {baseTableLimit.map((game) => {
        return (
          <>
            <Form.Item
              key={game.platform}
              name={`${game.platform}_limit`}
              label={
                <Typography.Title className="!my-0" level={5} italic>
                  {game.platform}
                </Typography.Title>
              }
            >
              <Checkbox.Group>
                <Row>
                  <Col span={24}>
                    {game[`options`].map((item) => {
                      return (
                        <Checkbox key={item.detail} value={item.value}>
                          {item.detail}
                        </Checkbox>
                      );
                    })}
                  </Col>
                </Row>
              </Checkbox.Group>
            </Form.Item>
            <Divider />
          </>
        );
      })}
      <div className="flex flex-col gap-[5px] mb-[20px]">
        <Typography.Title level={4}>
          設定對象：{playerDetail.memId}
        </Typography.Title>
        {Object.keys(detailKeys).map((game) => {
          return (
            <div className="flex items-center gap-[10px]">
              <p className="text-lg font-bold my-0">{game}：</p>
              {detailKeys[`${game}`].map((item, index) => {
                return (
                  <Typography.Text>
                    {item}
                    {index + 1 === detailKeys[game]?.length || ","}
                  </Typography.Text>
                );
              })}
            </div>
          );
        })}
      </div>
      <Space>
        <Button loading={buttonLoading} htmlType="submit" type="primary">
          提交表單
        </Button>
        <Button
          loading={buttonLoading}
          onClick={() => {
            form.resetFields();
            setData({});
          }}
          htmlType="button"
        >
          重置
        </Button>
      </Space>
    </Form>
  );
};

export default PlayerBetLimit;
