import { useEffect, useState } from "react";
import { SettingTwoTone } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

import {
  agentInfo,
  getAgentList,
  getChildList,
} from "../../api/methods/getApi";
import CreateChild from "./ChildList/modal/createChild";
import SearchTool from "../../components/searchTool/searchTool";
import CommonTable from "../../components/table/commonTable";
import UseMergeableSearchParams from "../../hooks/useMergeableSearchParams";
import DetailChild from "./ChildList/modal/detailChild";
import CreateButton from "../../components/button/createButton";
import Wrapper from "../../components/layout/Wrapper";
import ActionCol from "../../components/tableColumns/actionCol";
import {
  apiCalled,
  apiCalling,
  storeDetail,
  storeTotalRecords,
} from "../../redux/action/common/action";
import { filterAgentLevel } from "../../utils/oldUtils/filterAgentLevel";
import TableWrapper from "../../components/layout/TableWrapper";
import AdvanceComponents from "../../components/searchTool/advanceComponents";
import EditAuthColumns from "../../utils/EditAuthColumns";
import { relativeFromTime } from "../../utils/getDay";
import { useTranslation } from "react-i18next";
import { Tag } from "antd";
import CommonPageTitle from "../../components/layout/CommonPageTitle";

const ChildList = () => {
  const { t } = useTranslation();
  const i18n = (key) => t(`page.agentinfomation.sublist.${key}`);
  const i18n_switch = (key) => t(`switch.${key}`);
  const i18n_unit = (key) => t(`unit.${key}`);
  const i18n_statusCode = (key) => t(`status_code.${key}`);

  const [searchParams, setSearchParams] = UseMergeableSearchParams();
  const { current_page, per_page } = searchParams;

  const dispatch = useDispatch();
  const basicConfig = useSelector((state) => state.basicConfig);
  const { statusCode = [] } = basicConfig;
  const trigger = useSelector((state) => state.trigger);
  const agentNameList = useSelector((state) => state.agentNameList);

  const [childList, setChildList] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);
  const [initialRender, setInitialRender] = useState(true);
  const [timeOption, setTimeOption] = useState(false);

  useEffect(() => {
    setTableLoading(true);
    if (initialRender) {
      dispatch(apiCalling());
    }

    getChildList({
      paramsData: {
        ...searchParams,
        create_ts: timeOption ? searchParams.create_ts : undefined,
      },
    })
      .then((data) => {
        setChildList(data.data.list);
        dispatch(storeTotalRecords(data.data.pagination));
      })
      .catch((err) => {
        const data = err.response.data;
      })
      .finally(() => {
        setTableLoading(false);
        dispatch(apiCalled());
        setInitialRender(false);
      });
  }, [trigger, current_page, per_page]);
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
      key: "cagent_belong",
      render: (row) => {
        return filterAgentLevel(row);
      },
      search: true,
      type: "autoComplete",
      autoCompleteProps: {
        options: agentNameList?.map((item) => {
          return { value: item };
        }),
      },
      ex: "agent01",
    },
    {
      title: i18n("col.subAccount"),
      dataIndex: "cagent",
      key: "search_cagent",
      search: true,
      type: "text",
      ex: "child01",
      searchOrder: 1,
    },
    {
      title: i18n("col.level"),
      dataIndex: "level",
      key: "search_level",
      search: true,
      type: "number",
      ex: "1",
      inputProps: {
        addonAfter: i18n_unit("level"),
      },
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
      title: i18n("col.mobile"),
      dataIndex: "mobile",
      key: "mobile",
      search: true,
      type: "text",
      ex: "0912345678",
    },
    {
      title: i18n("col.birthday"),
      dataIndex: "birthday",
      key: "birthday",
      search: true,
      type: "text",
      ex: "1998-10-01",
    },
    {
      title: i18n("col.email"),
      dataIndex: "email",
      key: "email",
      search: true,
      type: "text",
      ex: "abc@gmail.com",
    },
    {
      title: i18n("col.createDate"),
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
        const color = (code) => {
          switch (code) {
            case 1:
              return "green";
            case 0:
              return "red";
            case 2:
              return "blue";
            case 3:
              return "volcano";
            default:
              return "gray";
          }
        };
        return <Tag color={color(value)}>{i18n_statusCode(`${value}`)}</Tag>;
      },
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
            openEdit
            openDetail
          />
        );
      },
    },
  ];

  return (
    <>
      <CommonPageTitle pagePath="sublist" />
      <Wrapper>
        <SearchTool
          timeOptional={{
            enabled: true,
            open: timeOption,
            setOpen: setTimeOption,
          }}
          columns={columns}
          closeTimeOptional
        />
        <TableWrapper>
          {/* <EditAuthColumns>
          <CreateButton type={i18n("col.subAccount")} />
        </EditAuthColumns> */}
          <CommonTable
            tableLoading={tableLoading}
            csvApi={getChildList}
            columns={columns}
            dataSource={childList}
            closeTimeOptional
          />
        </TableWrapper>
      </Wrapper>
    </>
  );
};

export default ChildList;
