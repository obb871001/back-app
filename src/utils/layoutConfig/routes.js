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
  DatabaseOutlined,
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
  UserAddOutlined,
  UserOutlined,
  UsergroupAddOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import Home from "../../pages/Home/Home";
import PlayerSearch from "../../pages/Admin/PlayerSearch";
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
import CreateChild from "../../pages/Agent/ChildList/modal/createChild";
import DetailAgent from "../../pages/Agent/AgentList/modal/detailAgent";
import PlayerLog from "../../pages/Admin/PlayerLog";
import PlatformSetting from "../../pages/System/PlatformSetting/PlatformSetting";
import CreatePlayer from "../../pages/Admin/PlayerSearch/modal/createPlayer";
import PlayerWalletLog from "../../pages/Admin/PlayerWalletLog";
import CreateAgentDashBoard from "../../pages/Agent/AgentList/modal/createAgentDashboard";
import CreateChildDashBoard from "../../pages/Agent/ChildList/modal/createChildDashBoard";
import CreateMenuAuth from "../../pages/System/MenuAuth/modal/createMenuAuth";
import ViewMenuAuth from "../../pages/System/MenuAuth/modal/viewMenuAuth";
import CommonPageTitle from "../../components/layout/CommonPageTitle";

export default {
  route: {
    path: "/home",
    routes: [
      {
        path: "/home",
        name: "首頁",
        icon: <HomeOutlined />,
        component: (
          <AuthPage>
            <Home />
          </AuthPage>
        ),
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
            controllSubmenu: 1,
            component: (
              <AuthPage>
                <PlayerSearch />
              </AuthPage>
            ),
            routes: [
              {
                path: "detail/:uid",
                component: <DetailPlayer />,
              },
              {
                path: "create",
                component: <CreatePlayer />,
              },
            ],
          },
          {
            path: "createplayer",
            name: "新增玩家",
            icon: <UserAddOutlined />,
            hidden_permission: true,
            component: (
              <AuthPage>
                <CreatePlayer />
              </AuthPage>
            ),
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
                path: "detail/:uid",
                component: <DetailAgent type="agent" />,
              },
            ],
          },
          {
            path: "createagent",
            name: "新增代理商",
            icon: <UsergroupAddOutlined />,
            hidden_permission: true,
            level_limit: window.getbaseconfig?.level_limit,
            component: (
              <AuthPage>
                <CreateAgentDashBoard />
              </AuthPage>
            ),
          },
        ],
      },
      // {
      //   name: "代理信息",
      //   icon: <ApartmentOutlined />,
      //   path: "/agentinfomation",
      //   main: true,
      //   routes: [
      //     {
      //       path: "/agentinfomation",
      //       redirectTo: "/agentinfomation/agentlist",
      //     },
      //     {
      //       path: "sublist",
      //       name: "子帳號列表",
      //       icon: <SolutionOutlined />,
      //       component: (
      //         <AuthPage>
      //           <ChildList />{" "}
      //         </AuthPage>
      //       ),
      //       controllSubmenu: 1,
      //       routes: [
      //         {
      //           path: "edit",
      //           component: (
      //             <EditAuthPage>
      //               <CreateChild />
      //             </EditAuthPage>
      //           ),
      //         },
      //         {
      //           path: "create",
      //           component: (
      //             <EditAuthPage>
      //               <CreateChild />
      //             </EditAuthPage>
      //           ),
      //         },
      //         {
      //           path: "detail",
      //           component: <DetailAgent type="child" />,
      //         },
      //       ],
      //     },
      //   ],
      // },
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
            controllSubmenu: 1,
            routes: [
              {
                path: ":gameId",
                component: <GameHistory />,
              },
            ],
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
          {
            path: "memberlog",
            name: "會員操作紀錄",
            icon: <FileSearchOutlined />,
            component: (
              <AuthPage>
                <PlayerLog />
              </AuthPage>
            ),
          },
          {
            path: "memberwalletlog",
            name: "錢包記錄",
            icon: <WalletOutlined />,
            component: (
              <AuthPage>
                <PlayerWalletLog />
              </AuthPage>
            ),
          },
        ],
      },
      {
        path: "/systemsetting",
        name: "系統設定",
        icon: <SettingOutlined />,
        main: true,
        routes: [
          // {
          //   path: "/systemsetting",
          //   redirectTo: "/systemsetting/memberlevelsettings",
          // },
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
            path: "sublist",
            name: "子帳號列表",
            icon: <SolutionOutlined />,
            component: (
              <AuthPage>
                <ChildList />{" "}
              </AuthPage>
            ),
            controllSubmenu: 1,
            routes: [
              {
                path: "edit",
                component: (
                  <EditAuthPage>
                    <CreateChild />
                  </EditAuthPage>
                ),
              },
              {
                path: "detail/:uid",
                component: <DetailAgent type="child" />,
              },
            ],
          },
          {
            path: "createchild",
            name: "新增子帳號",
            icon: <UserAddOutlined />,
            hidden_permission: true,
            level_limit: window.getbaseconfig?.level_limit,
            component: (
              <AuthPage>
                <CreateChildDashBoard />
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
            controllSubmenu: 1,
            routes: [
              {
                path: "create",
                component: (
                  <EditAuthPage>
                    <CreateMenuAuth />
                  </EditAuthPage>
                ),
              },
              {
                path: "edit",
                component: <CreateMenuAuth />,
              },
              {
                path: "detail/:uid",
                component: <ViewMenuAuth />,
              },
            ],
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
          {
            path: "platformsetting",
            name: "站台系統設置",
            hidden_editable: true,
            icon: <DatabaseOutlined />,
            component: <PlatformSetting />,
          },
        ],
      },
    ],
  },
};
