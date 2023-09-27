import { useEffect, useState } from "react";
import CreatePromotion from "./modal/createPromotion";
import { getPromotionList } from "../../../api/methods/getApi";
import CreateButton from "../../../components/button/createButton";
import CommonPageTitle from "../../../components/layout/CommonPageTitle";
import Wrapper from "../../../components/layout/Wrapper";
import SearchTool from "../../../components/searchTool/searchTool";
import TableWrapper from "../../../components/layout/TableWrapper";
import CommonTable from "../../../components/table/commonTable";
import i18next from "i18next";
import { convertLanguage } from "../../../utils/convertLanguage";
import { Image, Modal, Tag, message, notification } from "antd";
import RelativeTimeCol from "../../../components/tableColumns/relativeTimeCol";
import { useDispatch, useSelector } from "react-redux";
import ActionCol from "../../../components/tableColumns/actionCol";
import { allowClick } from "../../../assets/style/styleConfig";
import {
  apiCalled,
  apiCalling,
  storeDetail,
  storeTotalRecords,
  trigger,
} from "../../../redux/action/common/action";
import { deletePromotion } from "../../../api/methods/deleteApi";
import { useTranslation } from "react-i18next";
import { commonPromotionType } from "../../../constant";
import UseMergeableSearchParams from "../../../hooks/useMergeableSearchParams";
import { ContactsOutlined } from "@ant-design/icons";

const Promotions = () => {
  const { t } = useTranslation();
  const i18n = (key) => t(`page.systemsetting.promotions.${key}`);
  const i18n_common = (key) => t(`common.${key}`);
  const i18n_modal = (key, props) => t(`commonModal.${key}`, { ...props });
  const i18n_switch = (key) => t(`switch.${key}`);

  const [searchParams, setSearchParams] = UseMergeableSearchParams();
  const { create_ts, current_page, per_page } = searchParams;

  const nowTime = useSelector((state) => state.nowTime);
  const triggerReducers = useSelector((state) => state.trigger);
  const dispatch = useDispatch();

  const [promotionList, setPromotionList] = useState([]);
  const [imagesProps, setImagesProps] = useState({
    visible: false,
    src: "",
  });
  const { visible } = imagesProps;
  const [tableLoading, setTableLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    setTableLoading(true);
    if (initialRender) {
      dispatch(apiCalling());
    }

    getPromotionList({
      paramsData: {
        ...searchParams,
      },
    })
      .then((data) => {
        setPromotionList(data.data.list);
        dispatch(storeTotalRecords(data.data.pagination));
      })
      .catch((err) => {
        const data = err.response.data;
      })
      .finally(() => {
        setTableLoading(false);
        setInitialRender(false);
        dispatch(apiCalled());
      });
  }, [triggerReducers, create_ts, current_page, per_page]);

  const deleteConfirmModal = ({ uid }) => {
    Modal.confirm({
      title: i18n_modal("deleteConfirm", { title: i18n("title") }),
      content: i18n_modal("deleteConfirmContent"),
      okText: i18n_modal("delete"),
      okType: "primary",
      okButtonProps: {
        danger: true,
        loading: buttonLoading,
      },
      onOk: () => {
        message.loading({ content: i18n_common("loading") });
        deletePromotion({
          uid: uid,
        })
          .then((res) => {
            message.destroy();
            notification.success({
              message: i18n_modal("deleteSuccess"),
            });
            dispatch(trigger());
          })
          .finally(() => {
            setButtonLoading(false);
          });
      },
    });
  };

  const columns = [
    {
      title: i18n("col.number"),
      dataIndex: "uid",
      key: "uid",
    },
    {
      title: i18n("col.creator"),
      dataIndex: "cagent",
      key: "cagent",
      search: true,
      ex: "agent001",
    },
    {
      title: i18n("col.createTime"),
      dataIndex: "create_ts",
      key: "create_ts",
      render: (row) => {
        return <RelativeTimeCol timeStr={row} unix now={nowTime} />;
      },
    },
    {
      title: i18n("col.promotionTitle"),
      dataIndex: `title_${convertLanguage(i18next.language)}`,
      key: `title_${convertLanguage(i18next.language)}`,
      search: true,
      ex: "promotion title",
    },
    {
      title: i18n("col.promotionImage"),
      dataIndex: `images_${convertLanguage(i18next.language)}`,
      key: `images_${convertLanguage(i18next.language)}`,
      render: (row) => {
        return (
          <p
            onClick={() => {
              setImagesProps({
                visible: true,
                src: row,
              });
            }}
            className={`my-0 ${allowClick} underline`}
          >
            {i18n("col.viewImage")}
          </p>
        );
      },
    },

    {
      title: i18n("col.promotionStartTime"),
      dataIndex: "start_time",
      key: "start_time",
      search: true,
      type: "date",
    },
    {
      title: i18n("col.promotionEndTime"),
      dataIndex: "end_time",
      key: "end_time",
    },
    {
      title: i18n("col.isShowOnHomeCarousel"),
      dataIndex: "show_carousel",
      key: "show_carousel",
      render: (row) => {
        return (
          <Tag color={row ? "green" : "red"}>
            {row ? i18n_switch("open") : i18n_switch("close")}
          </Tag>
        );
      },
      search: true,
      type: "radio",
      radioProps: {
        options: [
          { label: i18n_switch("open"), value: "1" },
          { label: i18n_switch("close"), value: "0" },
        ],
      },
    },
    {
      title: i18n("col.promotionType"),
      dataIndex: "promotion_type",
      key: "promotion_type",
      render: (value) => {
        return i18n(`modal.${value}`);
      },
      search: true,
      type: "select",
      selectProps: {
        options: commonPromotionType,
      },
    },
    {
      title: "",
      render: (row) => {
        return (
          <ActionCol
            callApi={() => {
              dispatch(storeDetail(row));
            }}
            callDeleteApi={() => {
              deleteConfirmModal({ uid: row.uid });
            }}
            apiUid={row.uid}
            openEdit
            openDetail
            openDelete
          />
        );
      },
    },
  ];
  return (
    <>
      <CommonPageTitle pagePath="promotion" />
      <Wrapper>
        <SearchTool columns={columns} />
        <TableWrapper>
          <CommonTable
            tableLoading={tableLoading}
            tableProps={{
              title: (
                <CreateButton
                  icon={<ContactsOutlined />}
                  type={i18n("title")}
                />
              ),
            }}
            columns={columns}
            dataSource={promotionList}
          />
        </TableWrapper>
      </Wrapper>
      <Image
        width={200}
        style={{
          display: "none",
        }}
        src={`${process.env.REACT_APP_IMAGE_URL}${imagesProps.src}`}
        preview={{
          visible,
          src: `${process.env.REACT_APP_IMAGE_URL}${imagesProps.src}`,
          onVisibleChange: (value) => {
            setImagesProps({
              visible: value,
              src: "",
            });
          },
        }}
      />
    </>
  );
};

export default Promotions;
