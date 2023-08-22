import {
  AccountBookOutlined,
  ApartmentOutlined,
  BankOutlined,
  BarsOutlined,
  CalculatorOutlined,
  CalendarOutlined,
  ChromeFilled,
  ContactsOutlined,
  CrownFilled,
  DollarCircleOutlined,
  DollarOutlined,
  FieldTimeOutlined,
  FileSearchOutlined,
  FileTextOutlined,
  GiftOutlined,
  HomeOutlined,
  MailOutlined,
  MenuOutlined,
  NodeExpandOutlined,
  OrderedListOutlined,
  SearchOutlined,
  SettingOutlined,
  ShareAltOutlined,
  SmileFilled,
  SolutionOutlined,
  SoundOutlined,
  SwapOutlined,
  TabletFilled,
  TeamOutlined,
  TrademarkOutlined,
  TransactionOutlined,
  TranslationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Home from "../../pages/Home/Home";
import PlayerSearch from "../../pages/Admin/PlayerSearch/PlayerSearch";
import AgentList from "../../pages/Agent/AgentList";
import MenuAuthSettings from "../../pages/System/MenuAuth/MenuAuthSettings";
import MemberLevelSettings from "../../pages/System/MemberLevelSettings/MemberLevelSettings";
import EventList from "../../pages/System/EventsList/EventList";
import CheckIn from "../../pages/System/EventsList/checkIn";
import Task from "../../pages/System/EventsList/task";
import Roulette from "../../pages/System/EventsList/roulette";
import Commission from "../../pages/System/Comission/Commission";
import GameAuthSettings from "../../pages/System/GameAuth/GameAuth";
import DetailPlayer from "../../pages/Admin/PlayerSearch/modal/detailPlayer";
import WloseReports from "../../pages/Reports/WloseReports";
import AgentReport from "../../pages/Reports/AgentReport";
import AuthPage from "../AuthPage";
import ChildList from "../../pages/Agent/ChildList";
import Promotions from "../../pages/System/Promotions/Promotions";
import Inbox from "../../pages/System/Inbox/Inbox";
import ReferralCode from "../../pages/System/ReferralCode/ReferralCode";
import Marquee from "../../pages/System/Marquee/Marquee";
import Gift from "../../pages/System/Gift/Gift";
import GameHistory from "../../pages/Reports/GameHistory";
import CreateAgent from "../../pages/Agent/AgentList/modal/createAgent";
import EditAuthPage from "../EditAuthPage";
import AgentLog from "../../pages/Agent/AgentLog";

export default {
  route: {
    path: "/home",
    routes: [
      {
        path: "/home",
        name: "首頁",
        icon: <HomeOutlined />,
        component: <Home />,
        index: true,
        main: true,
      },
      {
        path: "/admin",
        name: "玩家管理页",
        icon: <UserOutlined />,
        main: true,
        routes: [
          {
            path: "/admin",
            redirectTo: "/admin/playersearch",
          },
          {
            path: "playersearch",
            name: "玩家一般查詢",
            icon: <SearchOutlined />,
            component: (
              <AuthPage>
                <PlayerSearch />
              </AuthPage>
            ),
          },
          {
            path: "memberlog",
            name: "會員操作紀錄",
            icon: <FileSearchOutlined />,
            component: "./Welcome",
          },
        ],
      },
      {
        name: "代理信息",
        icon: <ApartmentOutlined />,
        path: "/agentinfomation",
        main: true,
        routes: [
          {
            path: "/agentinfomation",
            redirectTo: "/agentinfomation/agentlist",
          },
          {
            path: "agentlist",
            name: "下線代理列表",
            icon: <TeamOutlined />,
            component: (
              <AuthPage>
                <AgentList />{" "}
              </AuthPage>
            ),
            controllSubmenu: 1,
            routes: [
              {
                path: "edit",
                component: (
                  <EditAuthPage>
                    <CreateAgent />
                  </EditAuthPage>
                ),
              },
              {
                path: "create",
                component: (
                  <EditAuthPage>
                    <CreateAgent />
                  </EditAuthPage>
                ),
              },
            ],
          },
          {
            path: "sublist",
            name: "子帳號列表",
            icon: <SolutionOutlined />,
            component: (
              <AuthPage>
                <ChildList />{" "}
              </AuthPage>
            ),
          },
          {
            path: "agentlog",
            name: "代理操作紀錄",
            icon: <BarsOutlined />,
            component: (
              <AuthPage>
                <AgentLog />{" "}
              </AuthPage>
            ),
          },
        ],
      },
      {
        path: "/cashflowinfomation",
        name: "現金流管理",
        icon: <DollarCircleOutlined />,
        main: true,
        routes: [
          {
            path: "fundinout",
            name: "資金進出",
            icon: <SwapOutlined />,
            component: "資金進出",
          },
          {
            path: "depositlist",
            name: "金流儲值清單",
            icon: <DollarOutlined />,
            component: "金流儲值清單",
          },
          {
            path: "withdrawlist",
            name: "提款清單",
            icon: <NodeExpandOutlined />,
            component: "金流提款清單",
          },
          {
            path: "cashflowstatus",
            name: "金流狀態",
            icon: <OrderedListOutlined />,
            component: "金流狀態",
          },
        ],
      },
      {
        path: "/reports",
        name: "報表",
        icon: <FileTextOutlined />,
        main: true,
        routes: [
          {
            path: "/reports",
            redirectTo: "/reports/playerreport",
          },
          {
            path: "playerreport",
            name: "代理報表",
            icon: <UserOutlined />,
            component: (
              <AuthPage>
                <AgentReport />
              </AuthPage>
            ),
          },
          {
            path: "winlossreport",
            name: "輸贏報表",
            icon: <CalculatorOutlined />,
            component: (
              <AuthPage>
                {" "}
                <WloseReports />{" "}
              </AuthPage>
            ),
          },
          {
            path: "gamehistory",
            name: "遊戲歷史",
            icon: <FieldTimeOutlined />,
            // component: "遊戲歷史",
            controllSubmenu: 1,
            routes: [
              {
                path: ":gameId",
                component: <GameHistory />,
              },
            ],
          },
        ],
      },
      {
        path: "/systemsetting",
        name: "系統設定",
        icon: <SettingOutlined />,
        main: true,
        routes: [
          {
            path: "/systemsetting",
            redirectTo: "/systemsetting/memberlevelsettings",
          },
          {
            path: "memberlevelsettings",
            name: "會員等級設定",
            icon: <CrownFilled />,
            component: (
              <AuthPage>
                <MemberLevelSettings />
              </AuthPage>
            ),
          },
          {
            path: "menupermissions",
            name: "菜單權限設定",
            icon: <BarsOutlined />,
            component: (
              <AuthPage>
                <MenuAuthSettings />{" "}
              </AuthPage>
            ),
          },

          {
            path: "comission",
            name: "遊戲佣金設定",
            icon: <TransactionOutlined />,
            component: (
              <AuthPage>
                <Commission />{" "}
              </AuthPage>
            ),
          },
          {
            path: "gamepermissions",
            name: "遊戲權限設定",
            icon: <MenuOutlined />,
            component: (
              <AuthPage>
                <GameAuthSettings />{" "}
              </AuthPage>
            ),
          },

          {
            path: "eventlist",
            name: "活動列表",
            icon: <AccountBookOutlined />,
            component: <EventList />,
            controllSubmenu: 1,
            routes: [
              {
                path: "checkin",
                name: "每日簽到",
                icon: <CalendarOutlined />,
                component: (
                  <AuthPage controllIndex={2}>
                    <CheckIn />{" "}
                  </AuthPage>
                ),
              },
              {
                path: "task",
                name: "任務",
                icon: <ContactsOutlined />,
                component: (
                  <AuthPage controllIndex={2}>
                    <Task />{" "}
                  </AuthPage>
                ),
              },
              {
                path: "roulette",
                name: "輪盤",
                icon: <TrademarkOutlined />,
                component: (
                  <AuthPage controllIndex={2}>
                    <Roulette />{" "}
                  </AuthPage>
                ),
              },
            ],
          },
          {
            path: "refercode",
            name: "推廣碼",
            icon: <ShareAltOutlined />,
            component: <ReferralCode />,
          },
          {
            path: "marquee",
            name: "跑馬燈設定",
            icon: <SoundOutlined />,
            component: <Marquee />,
          },
          {
            path: "gift",
            name: "禮包創建、查詢",
            icon: <GiftOutlined />,
            component: <Gift />,
          },
          {
            path: "promotion",
            name: "促銷活動設定",
            icon: <ContactsOutlined />,
            component: <Promotions />,
          },
          {
            path: "inbox",
            name: "站內信",
            icon: <MailOutlined />,
            component: <Inbox />,
          },
          {
            path: "bankaccount",
            name: "銀行帳戶設定",
            icon: <BankOutlined />,
            component: "銀行帳戶設定",
          },
        ],
      },
    ],
  },
};