import { useEffect, useState } from "react";
import CreateAgent from "./AgentList/modal/createAgent";
import { agentInfo, getAgentList } from "../../api/methods/getApi";
import SearchTool from "../../components/searchTool/searchTool";
import CommonTable from "../../components/table/commonTable";
import UseMergeableSearchParams from "../../hooks/useMergeableSearchParams";
import { MehOutlined, SettingTwoTone, SmileOutlined } from "@ant-design/icons";
import DetailAgent from "./AgentList/modal/detailAgent";
import CreateAgentTwo from "./AgentList/modal/createAgent2";
import ActionCol from "../../components/tableColumns/actionCol";
import CreateButton from "../../components/button/createButton";
import { useDispatch, useSelector } from "react-redux";
import { storeDetail } from "../../redux/action/member/action";
import CustomSearchInput from "../../components/searchTool/customSearchInput";
import {
  Col,
  Divider,
  Input,
  InputNumber,
  Modal,
  Row,
  Space,
  Switch,
  Tag,
  Typography,
  message,
  notification,
} from "antd";
import Wrapper from "../../components/layout/Wrapper";
import TableWrapper from "../../components/layout/TableWrapper";
import EditAuthColumns from "../../utils/EditAuthColumns";
import { relativeFromTime } from "../../utils/getDay";
import {
  apiCalled,
  apiCalling,
  storeTotalRecords,
} from "../../redux/action/common/action";
import useEditStatus from "../../utils/EditStatus";
import { switchAgentStatus } from "../../api/methods/postApi";
import { useTranslation } from "react-i18next";
import { color } from "./AgentList/utils/statusCodeColor";
import NumberColumns from "../../components/table/numberColumns";
import { allowClick } from "../../assets/style/styleConfig";
import { formatNumber } from "../../utils/formatNumber";
import CustomModal from "../../components/modal/customModal";
import AdjustBalance from "./AgentList/modal/adjustBalance";
import AgentTree from "./components/agentTree";
import { levelOptions } from "../../components/form/levelOption";
import CommonPageTitle from "../../components/layout/CommonPageTitle";

const AgentList = () => {
  const { t } = useTranslation();
  const i18n = (key, props) =>
    t(`page.agentinfomation.agentlist.${key}`, { ...props });
  const i18n_common = (key) => t(`common.${key}`);

  const i18n_switch = (key) => t(`switch.${key}`);
  const i18n_unit = (key) => t(`unit.${key}`);
  const i18n_statusCode = (key) => t(`status_code.${key}`);
  const i18n_tree = (key) => t(`page.reports.playerreport.${key}`);
  const i18n_cagent_level = (key) => t(`cagent_level.${key}`);

  const [searchParams, setSearchParams] = UseMergeableSearchParams();
  const { current_page, per_page, agentUid } = searchParams;

  const canEdit = useEditStatus();

  const dispatch = useDispatch();
  const basicConfig = useSelector((state) => state.basicConfig);
  const { statusCode = [], is_credit } = basicConfig;
  const trigger = useSelector((state) => state.trigger);
  const CURRENCY = useSelector((state) => state.CURRENCY);
  const hasSearched = useSelector((state) => state.hasSearched);
  const agentLevel = useSelector((state) => state.agentInfo?.level);
  const agentNameList = useSelector((state) => state.agentNameList);

  const [confirmButtonLoading, setConfirmButtonLoading] = useState(false);
  const [agentList, setAgentList] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);
  const [initialRender, setInitialRender] = useState(true);
  const [openBalanceModal, setOpenBalanceModal] = useState(false);
  const [agentData, setAgentData] = useState({});
  const [timeOption, setTimeOption] = useState(false);
  const [agentTree, setAgentTree] = useState([]);
  const [treeApiCalling, setTreeApiCalling] = useState(false);

  useEffect(() => {
    if (treeApiCalling) {
      message.loading({ content: i18n_common("loading") });
    }
    if (hasSearched) {
      setTableLoading(true);
      getAgentList({
        paramsData: {
          ...searchParams,
          create_ts: timeOption ? searchParams.create_ts : undefined,
          ...(agentUid && { tree_uid: agentUid }),
        },
      })
        .then((data) => {
          setAgentList(data.data.list);
          setAgentTree(data.data.tree);
          dispatch(storeTotalRecords(data.data.pagination));
        })
        .catch((err) => {
          const data = err.response.data;
        })
        .finally(() => {
          setTableLoading(false);
          dispatch(apiCalled());
          setInitialRender(false);

          message.destroy();
          setTreeApiCalling(false); //讀取cagent tree結束
        });
    }
  }, [trigger, agentUid, current_page, per_page]);

  const columns = [
    {
      title: i18n("col.number"),
      dataIndex: "uid",
      key: "uid",
      search: true,
      type: "number",
      ex: "1",
    },
    {
      title: i18n("col.agentLine"),
      dataIndex: "cagent_belong",
      key: "cagent_belong",
      search: true,
      type: "autoComplete",
      autoCompleteProps: {
        options: agentNameList?.map((item) => {
          return { value: item };
        }),
      },
      ex: "agent001",
    },

    {
      title: i18n("col.agent"),
      dataIndex: "cagent",
      key: "search_cagent",
      render: (row, value) => (
        <p
          onClick={() => {
            if (treeApiCalling) {
              return;
            }
            setTreeApiCalling(true);
            setSearchParams({ agentUid: value.uid });
          }}
          className={`my-0 ${allowClick} underline ${
            treeApiCalling && "!cursor-not-allowed"
          }`}
        >
          {row}
        </p>
      ),
      csvTurn: true,
      csvRender: (row) => {
        return `${row}`;
      },
      search: true,
      type: "text",
      ex: "agent01",
      searchOrder: 1,
    },
    {
      title: i18n("col.loginName"),
      dataIndex: "login_name",
      key: "login_name",
      render: (row) => {
        return row || i18n("col.loginNotyet");
      },
      search: true,
      type: "text",
      ex: "Jason Han",
    },
    {
      title: i18n("col.level"),
      dataIndex: "level",
      key: "search_level",
      search: true,
      type: "select",
      selectProps: {
        options: levelOptions({
          Lv: agentLevel,
        }),
      },
      render: (row) => {
        return i18n_cagent_level(`${row}`);
      },
      csvTurn: true,
    },
    {
      title: i18n("col.nickname"),
      dataIndex: "nick_name",
      key: "nick_name",
      search: true,
      type: "text",
      ex: "Godtone",
    },
    {
      title: i18n("col.truename"),
      dataIndex: "true_name",
      key: "true_name",
      search: true,
      type: "text",
      ex: "Chang Chia-Hang",
    },
    {
      title: `${i18n("col.balance")}`,
      dataIndex: is_credit === 1 ? "credit" : "vpoint",
      key: is_credit === 1 ? "credit" : "vpoint",
      render: (value, row) => {
        return (
          <span
            onClick={() => {
              if (canEdit) {
                setOpenBalanceModal(true);
                setAgentData(row);
              }
            }}
            className={`${canEdit && allowClick} ${
              canEdit && "cursor-pointer underline"
            } font-bold`}
          >
            {CURRENCY}
            {formatNumber(value)}
          </span>
        );
      },
    },

    {
      title: i18n("col.mobile"),
      dataIndex: "mobile",
      key: "mobile",
      search: true,
      type: "text",
      ex: "0912345678",
      columnsHidden: true,
    },
    {
      title: i18n("col.birthday"),
      dataIndex: "birthday",
      key: "birthday",
      search: true,
      type: "text",
      ex: "1998-10-01",
      columnsHidden: true,
    },
    {
      title: i18n("col.email"),
      dataIndex: "email",
      key: "email",
      search: true,
      type: "text",
      ex: "abc@gmail.com",
      columnsHidden: true,
    },
    {
      title: i18n("col.playerNumber"),
      dataIndex: "pnum",
      key: "pnum",
    },
    {
      title: i18n("col.createTime"),
      dataIndex: "create_time",
      key: "create_ts",
      search: false,
      type: "date",
    },
    {
      title: i18n("col.lastLoginTime"),
      dataIndex: "oauth_ts",
      key: "oauth_ts",
      render: (row) => relativeFromTime(row, { unix: true }),
      search: true,
      type: "date",
    },
    {
      title: i18n("col.accountStatus"),
      dataIndex: "status",
      key: "status",
      render: (value, row) => {
        return <Tag color={color(value)}>{i18n_statusCode(`${value}`)}</Tag>;
      },
      csvRender: (row) => {
        return i18n_statusCode(`${row}`);
      },
      csvTurn: true,
      search: true,
      type: "select",
      selectProps: {
        options: statusCode.map((code) => {
          return {
            label: i18n_statusCode(`${code}`),
            value: code,
          };
        }),
      },
    },
    {
      title: i18n("col.action"),
      key: "action",
      render: (row) => {
        return (
          <ActionCol
            callApi={() => {
              agentInfo({ agentUid: row.uid }).then((data) => {
                dispatch(storeDetail(data));
              });
            }}
            apiUid={row.uid}
            openDetail
            openEdit
          />
        );
      },
    },
  ];
  return (
    <>
      <CommonPageTitle pagePath="agentlist" />
      <Wrapper>
        <SearchTool
          timeOptional={{
            enabled: true,
            open: timeOption,
            setOpen: setTimeOption,
          }}
          columns={columns}
          priorityList={[i18n_tree("treeText"), i18n("col.agent")]}
          closeTimeOptional
        />
        {/* <CreateAgent /> */}
        <TableWrapper>
          {/* <EditAuthColumns>
          <CreateButton type={i18n("col.agent")} />
        </EditAuthColumns> */}
          <CommonTable
            tableProps={{
              title: <AgentTree agentTree={agentTree} />,
            }}
            csvApi={getAgentList}
            tableLoading={tableLoading}
            columns={columns}
            dataSource={agentList}
            closeTimeOptional
          />
        </TableWrapper>
        {openBalanceModal && (
          <AdjustBalance
            openBalanceModal={openBalanceModal}
            setOpenBalanceModal={setOpenBalanceModal}
            agentData={agentData}
          />
        )}
      </Wrapper>
    </>
  );
};

export default AgentList;
