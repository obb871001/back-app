import React, { useEffect, useState } from "react";
import LittleWrapper from "../../../components/layout/LittleWrapper";
import CommonPageTitle from "../../../components/layout/CommonPageTitle";
import CreateButton from "../../../components/button/createButton";
import TableWrapper from "../../../components/layout/TableWrapper";
import CommonTable from "../../../components/table/commonTable";
import { CrownFilled } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getVipList } from "../../../api/methods/getApi";
import ActionCol from "../../../components/tableColumns/actionCol";
import { storeDetail } from "../../../redux/action/common/action";
import useEditStatus from "../../../utils/EditStatus";
import { allowClick } from "../../../assets/style/styleConfig";
import { Button, Col, Divider, Popover, Row } from "antd";

const Vip = () => {
  const { t } = useTranslation();
  const i18n = (key) => t(`page.systemsetting.vipList.${key}`);
  const i18n_modal = (key, props) => t(`commonModal.${key}`, { ...props });
  const i18n_common = (key) => t(`commonModal.${key}`);

  const [tableLoading, setTableLoading] = useState(false);
  const [vipTagList, setVipTagList] = useState([]);
  const [popoverVisible, setPopoverVisible] = useState(null);

  const canEdit = useEditStatus();

  const triggerReducers = useSelector((state) => state.trigger);
  const vipGameList = useSelector((state) => state.vipList?.game);
  const dispatch = useDispatch();

  useEffect(() => {
    setTableLoading(true);
    getVipList()
      .then((data) => {
        setVipTagList(data?.vipinfo);
      })
      .finally(() => {
        setTableLoading(false);
      });
  }, [triggerReducers]);

  const columns = [
    {
      title: i18n("col.number"),
      dataIndex: "uid",
      key: "uid",
    },
    {
      title: i18n("col.name"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: i18n("col.level"),
      dataIndex: "level",
      key: "level",
    },
    {
      title: i18n("col.TableLimitGroupName"),
      dataIndex: "TableLimitGroupName",
      key: "TableLimitGroupName",
      render: (row, value) => {
        return (
          <Popover
            content={
              <>
                <Divider className="my-[5px]" />
                <Row>
                  <Col span={6}>{i18n("form.platform")}</Col>
                  <Col span={6}>{i18n("form.betMinLimit")}</Col>
                  <Col span={6}>{i18n("form.betMaxLimit")}</Col>
                  <Col span={6}>{i18n("form.betLimit")}</Col>

                  {vipGameList?.map((item) => {
                    return (
                      <>
                        <Col span={6}>{item.platform}</Col>
                        <Col span={6}>{value?.[`${item?.uid}min_limit`]}</Col>
                        <Col span={6}>{value?.[`${item?.uid}max_limit`]}</Col>
                        <Col span={6}>{value?.[`${item?.uid}win_limit`]}</Col>
                      </>
                    );
                  })}
                </Row>
                <Divider className="my-[5px]" />

                <Button
                  type="primary"
                  onClick={() => {
                    setPopoverVisible(null);
                  }}
                >
                  {i18n_common("close")}
                </Button>
              </>
            }
            title={`${i18n("col.TableLimitGroupName")}:${row}`}
            open={popoverVisible === value.uid + "tableLimit"}
          >
            <span
              onClick={() => {
                if (canEdit) {
                  setPopoverVisible(value.uid + "tableLimit");
                  return;
                }
              }}
              className={`${canEdit && allowClick} ${
                canEdit && "cursor-pointer underline"
              } font-bold`}
            >
              {row}
            </span>
          </Popover>
        );
      },
    },
    {
      title: i18n("col.RebateGroupName"),
      dataIndex: "RebateGroupName",
      key: "RebateGroupName",
      render: (row, value) => (
        <Popover
          content={
            <>
              <Divider className="my-[5px]" />
              <Row>
                <Col span={6}>{i18n("form.platform")}</Col>
                <Col span={9}>{i18n("form.rebatePercent")}</Col>
                <Col span={9}>{i18n("form.rebatePeriod")}</Col>

                {vipGameList?.map((item) => {
                  return (
                    <>
                      <Col span={6}>{item.platform}</Col>
                      <Col span={9}>{value?.[`${item?.uid}rebate`]}</Col>
                      <Col span={9}>{value?.[`${item?.uid}rebate`]}</Col>
                    </>
                  );
                })}
              </Row>
              <Divider className="my-[5px]" />

              <Button
                type="primary"
                onClick={() => {
                  setPopoverVisible(null);
                }}
              >
                {i18n_common("close")}
              </Button>
            </>
          }
          title={`${i18n("col.RebateGroupName")}:${row}`}
          open={popoverVisible === value.uid + "rebate"}
        >
          <span
            onClick={() => {
              if (canEdit) {
                setPopoverVisible(value.uid + "rebate");
                return;
              }
            }}
            className={`${canEdit && allowClick} ${
              canEdit && "cursor-pointer underline"
            } font-bold`}
          >
            {row}
          </span>
        </Popover>
      ),
    },
    {
      title: "",
      render: (row) => {
        return (
          <ActionCol
            callApi={() => {
              dispatch(storeDetail(row));
            }}
            //   callDeleteApi={() => {
            //     deleteConfirmModal({ uid: row.uid });
            //   }}
            apiUid={row.uid}
            openEdit
          />
        );
      },
    },
  ];

  return (
    <LittleWrapper>
      <CommonPageTitle
        pagePath="createvip"
        // commonHint={`此處創建VIP等級設置`}
      />
      {/* <EditAuthColumns> */}
      <CreateButton icon={<CrownFilled />} type={i18n("title")} />
      {/* </EditAuthColumns> */}
      <TableWrapper>
        <CommonTable
          tableLoading={tableLoading}
          columns={columns}
          dataSource={vipTagList}
        />
      </TableWrapper>
    </LittleWrapper>
  );
};

export default Vip;
