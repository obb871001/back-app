import { ProFormDigit } from "@ant-design/pro-components";
import { Button, Space, notification } from "antd";
import React, { useEffect, useState } from "react";
import CommonTooltip from "../../../../../components/hint/commonTooltip";
import { DollarCircleOutlined, SwapOutlined } from "@ant-design/icons";
import UseMergeableSearchParams from "../../../../../hooks/useMergeableSearchParams";
import { useSelector } from "react-redux";
import {
  depositToPlayer,
  withdrawToPlayer,
} from "../../../../../api/methods/postApi";
import { CURRENCY } from "../../../../../constant";

const Balance = () => {
  const [searchParams, setSearchParams] = UseMergeableSearchParams();
  const { playeruid, tabKey } = searchParams;

  const playerDetail = useSelector((state) => state.commonDetail);

  const [editBalance, setEditBalance] = useState(false);
  const [setBalance, setSetBalance] = useState({
    vpoint: playerDetail.vpoint || 0,
    washCheck: 0,
  });
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    //切換頁籤重置欄位
    setSetBalance({
      vpoint: playerDetail.vpoint || 0,
      washCheck: 0,
    });
    setEditBalance(false);
  }, [tabKey]);

  const handleDepositToPlayer = (methodType) => {
    const action =
      methodType === "deposit" ? depositToPlayer : withdrawToPlayer;
    const params = {
      uid: playeruid,
      vpoint: setBalance.vpoint,
      useBank: "Bank",
      ...(methodType === "deposit" && { washCheck: setBalance.washCheck }),
    };
    setButtonLoading(true);
    action(params)
      .then((res) => {
        console.log(res);
        notification.success({
          message: "提交成功",
        });
        setEditBalance(false);
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
    <section className="custom-form-mb-0">
      <Space direction="vertical" size={"middle"}>
        <ProFormDigit
          label={`帳戶餘額`}
          value={playerDetail.vpoint}
          readonly
          fieldProps={{
            addonAfter: CURRENCY,
          }}
        />

        {editBalance && (
          <>
            <ProFormDigit
              label={`金額`}
              name="vpoint"
              value={setBalance.vpoint}
              onChange={(value) =>
                setSetBalance((prev) => ({ ...prev, vpoint: value }))
              }
              min={0}
              readonly={!editBalance}
              fieldProps={{
                addonAfter: CURRENCY,
              }}
            />
            <ProFormDigit
              label={
                <CommonTooltip
                  title="存款洗碼量"
                  tooltip="提款無需輸入此欄位"
                />
              }
              min={0}
              placeholder={`提款無需輸入此欄位`}
              value={setBalance.washCheck}
              onChange={(value) =>
                setSetBalance((prev) => ({ ...prev, washCheck: value }))
              }
              name="vpoint"
              readonly={!editBalance}
              fieldProps={{
                addonAfter: CURRENCY,
              }}
            />
          </>
        )}
        <Space>
          {editBalance && (
            <>
              <Button
                icon={<DollarCircleOutlined />}
                onClick={() => handleDepositToPlayer("deposit")}
                type="dashed"
                loading={buttonLoading}
              >
                存款
              </Button>
              <Button
                icon={<SwapOutlined />}
                onClick={() => handleDepositToPlayer("withdraw")}
                type="dashed"
                loading={buttonLoading}
              >
                提款
              </Button>
            </>
          )}

          <Button
            onClick={() => setEditBalance((prev) => !prev)}
            type={editBalance ? "primary" : "default"}
            danger={editBalance}
            loading={buttonLoading}
          >
            {editBalance ? "取消" : "編輯餘額"}
          </Button>
        </Space>
      </Space>
    </section>
  );
};

export default Balance;
