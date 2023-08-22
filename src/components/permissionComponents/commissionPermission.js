import { ProFormDigit } from "@ant-design/pro-components";
import { Card, Form, Space, Typography } from "antd";
import { useSelector } from "react-redux";

import CommonTitle from "../form/commonTitle";
import { CopyTwoTone } from "@ant-design/icons";

const CommissionPermission = ({ hiddenTitle, form }) => {
  const gameList = useSelector((state) => state.gameList.gamePlatform);

  const copyCommission = () => {
    const commission = form.getFieldValue("game_commission");
    const commissionValue = Object.values(commission);
    const commissionKey = Object.values(gameList);
    const commissionObj = {};
    commissionKey.forEach((key, index) => {
      commissionObj[key] = commissionValue[0];
    });
    form.setFieldsValue({ game_commission: commissionObj });
  };

  return (
    <Form.Item label={hiddenTitle || <CommonTitle title="佣金設定" />}>
      <Space className="!flex" direction="vertical" size="large">
        {gameList?.map((game, index) => {
          return (
            // <Card key={game}>
            //   <Card.Meta
            //     title={
            //       <section className="flex items-center">
            //         <Typography.Title
            //           className="!mb-0 !mt-0 w-[125px] mr-[20px]"
            //           italic
            //           level={3}
            //         >
            //           {game}
            //         </Typography.Title>
            //         <div className="flex items-center gap-[10px] custom-form-mb-0">
            //           <Typography.Text>設定{game}的返佣</Typography.Text>
            //           <ProFormDigit
            //             width={200}
            //             name={["gameCommission", game]}
            //             placeholder={"最小為0,最大為100"}
            //             rules={[{ required: true, message: "請輸入返佣比例" }]}
            //             fieldProps={{
            //               addonAfter: "%",
            //               min: 0,
            //               max: 100,
            //             }}
            //           />
            //         </div>
            //         <div></div>
            //       </section>
            //     }
            //    />
            // </Card>
            <section key={game} className="flex items-center">
              <Typography.Title
                className="!mb-0 !mt-0 w-[125px] mr-[20px]"
                italic
                level={4}
              >
                {game}
              </Typography.Title>
              <div className="flex items-center gap-[10px] custom-form-mb-0">
                <ProFormDigit
                  width={200}
                  name={["game_commission", game]}
                  placeholder={"最小為0,最大為100"}
                  rules={[{ required: true, message: "請輸入返佣比例" }]}
                  fieldProps={{
                    addonAfter: "%",
                    min: 0,
                    max: 100,
                  }}
                />
              </div>
              <div>
                {index === 0 && (
                  <CopyTwoTone
                    className="cursor-pointer ml-[10px] text-xl"
                    onClick={() => {
                      copyCommission();
                    }}
                  />
                )}
              </div>
            </section>
          );
        })}
      </Space>
    </Form.Item>
  );
};

export default CommissionPermission;
