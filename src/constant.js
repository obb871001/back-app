export const CURRENCY = "₱";
export const YEAR = "2023";
export const APP_NAME = window.getbaseconfig?.web_name || "WEBNAME";
export const COMMON_PAGE = 30;
export const API_RELOAD = 20000;
export const VERSION = "0.0.3";

export const fakeGameArray = [
  "MWSlot",
  "FC",
  "FTG",
  "TIB",
  "YEEBET",
  "CQ9",
  "KA",
  "MW",
  "JILI",
  "DCS",
  "PG",
  "JDB",
  "DG",
  "SEXYBCRT",
  "EVO",
];
export const fakeCurrency = [
  {
    iso_code: "CNY",
    iso_num: 156,
    prefix: "cny_",
    status_front: 0,
    status_backend: 1,
    symbol: "¥",
    decimal: 4,
  },
  {
    iso_code: "ETH",
    iso_num: null,
    prefix: "eth_",
    status_front: 0,
    status_backend: 1,
    symbol: "Ξ",
    decimal: 4,
    is_crypto: 1,
  },
  {
    iso_code: "JPY",
    iso_num: 392,
    prefix: "jpy_",
    status_front: 0,
    status_backend: 1,
    symbol: "¥",
    decimal: 4,
  },
  {
    iso_code: "PHP",
    iso_num: 608,
    prefix: "php_",
    status_front: 0,
    status_backend: 1,
    symbol: "₱",
    decimal: 4,
  },
  {
    iso_code: "TWD",
    iso_num: 158,
    prefix: "twd_",
    status_front: 1,
    status_backend: 1,
    symbol: "$",
    decimal: 4,
  },
  {
    iso_code: "USD",
    iso_num: 840,
    prefix: "usd_",
    status_front: 0,
    status_backend: 1,
    symbol: "$",
    decimal: 4,
  },
  {
    iso_code: "USDT",
    iso_num: null,
    prefix: "usdt_",
    status_front: 0,
    status_backend: 1,
    symbol: "$",
    decimal: 4,
    is_crypto: 1,
  },
  {
    iso_code: "VND",
    iso_num: 704,
    prefix: "vnd_",
    status_front: 0,
    status_backend: 1,
    symbol: "₫",
    decimal: 4,
  },
];
export const fakeGameType = {
  EGAME: ["MWSlot", "FC", "FTG", "CQ9", "KA", "MW", "DCS", "JDB"],
  SLOT: ["MWSlot", "FC", "FTG", "CQ9", "KA", "MW", "JILI", "DCS", "PG", "JDB"],
  istatus: [
    "MWSlot",
    "FC",
    "FTG",
    "TIB",
    "YEEBET",
    "CQ9",
    "KA",
    "MW",
    "JILI",
    "DCS",
    "PG",
    "JDB",
    "DG",
    "SEXYBCRT",
    "EVO",
  ],
  FH: ["FC", "CQ9", "KA", "JILI", "JDB"],
  TABLE: ["FTG", "CQ9", "KA", "JILI", "DCS", "PG"],
  SPORT: ["TIB"],
  LIVE: ["YEEBET", "CQ9", "DG", "SEXYBCRT", "EVO"],
};
export const fakeTypeAndPlatform = {
  MWSlot: ["EGAME", "SLOT", "istatus"],
  FC: ["FH", "SLOT", "EGAME", "istatus"],
  FTG: ["EGAME", "TABLE", "SLOT", "istatus"],
  TIB: ["SPORT", "istatus"],
  YEEBET: ["LIVE", "istatus"],
  CQ9: ["LIVE", "TABLE", "SLOT", "EGAME", "FH", "istatus"],
  KA: ["FH", "SLOT", "TABLE", "EGAME", "istatus"],
  MW: ["EGAME", "SLOT", "istatus"],
  JILI: ["FH", "SLOT", "TABLE", "istatus"],
  DCS: ["EGAME", "SLOT", "TABLE", "istatus"],
  PG: ["SLOT", "TABLE", "istatus"],
  JDB: ["SLOT", "FH", "EGAME", "istatus"],
  DG: ["LIVE", "istatus"],
  SEXYBCRT: ["LIVE", "istatus"],
  EVO: ["LIVE", "istatus"],
};
export const fakeBetlimit = [
  {
    uid: 1,
    platform: "TIB",
    options: [
      {
        name: "option1",
        value:
          "%7B%22Sport%22%3A%7B%22MinBet%22%3A1%2C%22MaxBet%22%3A10000%2C%22MaxWin%22%3A20000%7D%7D",
        detail: "1-10000,MaxWin20000",
      },
      {
        name: "option2",
        value:
          "%7B%22Sport%22%3A%7B%22MinBet%22%3A1%2C%22MaxBet%22%3A20000%2C%22MaxWin%22%3A40000%7D%7D",
        detail: "1-20000,MaxWin40000",
      },
      {
        name: "option3",
        value:
          "%7B%22Sport%22%3A%7B%22MinBet%22%3A50%2C%22MaxBet%22%3A100000%2C%22MaxWin%22%3A200000%7D%7D",
        detail: "50-100000,MaxWin200000",
      },
    ],
  },
  {
    uid: 2,
    platform: "YEEBET",
    options: [
      {
        name: "option1",
        value: "7",
        detail: "100-5000",
      },
      {
        name: "option2",
        value: "388",
        detail: "1500-75000",
      },
      {
        name: "option3",
        value: "389",
        detail: "6000-300000",
      },
    ],
  },
  {
    uid: 3,
    platform: "DG",
    options: [
      {
        name: "option1",
        value: "A",
        detail: "50-5000",
      },
      {
        name: "option2",
        value: "B",
        detail: "50-10000",
      },
      {
        name: "option3",
        value: "C",
        detail: "100-10000",
      },
      {
        name: "option4",
        value: "D",
        detail: "100-20000",
      },
      {
        name: "option5",
        value: "E",
        detail: "100-50000",
      },
      {
        name: "option6",
        value: "F",
        detail: "100-300000",
      },
      {
        name: "option7",
        value: "G",
        detail: "250-25000",
      },
      {
        name: "option8",
        value: "H",
        detail: "1000-50000",
      },
      {
        name: "option9",
        value: "I",
        detail: "2500-100000",
      },
    ],
  },
  {
    uid: 4,
    platform: "SEXYBCRT",
    options: [
      {
        name: "option1",
        value: "132002",
        detail: "50-15000",
      },
      {
        name: "option2",
        value: "132003",
        detail: "100-25000",
      },
      {
        name: "option3",
        value: "132004",
        detail: "100-50000",
      },
      {
        name: "option4",
        value: "132005",
        detail: "20-5000",
      },
    ],
  },
  {
    uid: 5,
    platform: "WM_Baccarat",
    options: [
      {
        name: "option1",
        value: "1",
        detail: "10~1k",
      },
      {
        name: "option2",
        value: "2",
        detail: "30~3k",
      },
      {
        name: "option3",
        value: "3",
        detail: "50~5k",
      },
      {
        name: "option4",
        value: "4",
        detail: "100~10k",
      },
      {
        name: "option5",
        value: "21",
        detail: "200~20k",
      },
      {
        name: "option6",
        value: "22",
        detail: "300~30k",
      },
      {
        name: "option7",
        value: "30",
        detail: "500~50k",
      },
      {
        name: "option8",
        value: "31",
        detail: "1k~100k",
      },
      {
        name: "option9",
        value: "32",
        detail: "2k~200k",
      },
    ],
  },
  {
    uid: 6,
    platform: "WM_DragonTiger",
    options: [
      {
        name: "option1",
        value: "5",
        detail: "10~1k",
      },
      {
        name: "option2",
        value: "6",
        detail: "30~3k",
      },
      {
        name: "option3",
        value: "7",
        detail: "50~5k",
      },
      {
        name: "option4",
        value: "8",
        detail: "100~10k",
      },
      {
        name: "option5",
        value: "23",
        detail: "200~20k",
      },
      {
        name: "option6",
        value: "24",
        detail: "300~30k",
      },
      {
        name: "option7",
        value: "33",
        detail: "500~50k",
      },
      {
        name: "option8",
        value: "34",
        detail: "1k~100k",
      },
      {
        name: "option9",
        value: "35",
        detail: "2k~200k",
      },
    ],
  },
  {
    uid: 7,
    platform: "WM_Roulette",
    options: [
      {
        name: "option1",
        value: "10",
        detail: "10~1k",
      },
      {
        name: "option2",
        value: "11",
        detail: "30~3k",
      },
      {
        name: "option3",
        value: "12",
        detail: "50~5k",
      },
      {
        name: "option4",
        value: "13",
        detail: "100~10k",
      },
      {
        name: "option5",
        value: "25",
        detail: "200~20k",
      },
      {
        name: "option6",
        value: "26",
        detail: "300~30k",
      },
      {
        name: "option7",
        value: "42",
        detail: "500~50k",
      },
      {
        name: "option8",
        value: "254",
        detail: "1k~100k",
      },
      {
        name: "option9",
        value: "43",
        detail: "2k~200k",
      },
    ],
  },
  {
    uid: 8,
    platform: "WM_Sicbo",
    options: [
      {
        name: "option1",
        value: "14",
        detail: "10~1k",
      },
      {
        name: "option2",
        value: "15",
        detail: "30~3k",
      },
      {
        name: "option3",
        value: "16",
        detail: "50~5k",
      },
      {
        name: "option4",
        value: "17",
        detail: "100~10k",
      },
      {
        name: "option5",
        value: "27",
        detail: "200~20k",
      },
      {
        name: "option6",
        value: "28",
        detail: "300~30k",
      },
      {
        name: "option7",
        value: "45",
        detail: "500~50k",
      },
      {
        name: "option8",
        value: "255",
        detail: "1k~100k",
      },
      {
        name: "option9",
        value: "46",
        detail: "2k~200k",
      },
    ],
  },
  {
    uid: 9,
    platform: "WM_NiuNiu",
    options: [
      {
        name: "option1",
        value: "48",
        detail: "10~1k",
      },
      {
        name: "option2",
        value: "56",
        detail: "30~3k",
      },
      {
        name: "option3",
        value: "57",
        detail: "50~5k",
      },
      {
        name: "option4",
        value: "58",
        detail: "100~10k",
      },
      {
        name: "option5",
        value: "172",
        detail: "200~20k",
      },
    ],
  },
  {
    uid: 10,
    platform: "WM_Fantan",
    options: [
      {
        name: "option1",
        value: "111",
        detail: "10~1k",
      },
      {
        name: "option2",
        value: "112",
        detail: "30~3k",
      },
      {
        name: "option3",
        value: "113",
        detail: "50~5k",
      },
      {
        name: "option4",
        value: "114",
        detail: "100~10k",
      },
      {
        name: "option5",
        value: "174",
        detail: "200~20k",
      },
    ],
  },
  {
    uid: 11,
    platform: "WM_Sedie",
    options: [
      {
        name: "option1",
        value: "221",
        detail: "10~1k",
      },
      {
        name: "option2",
        value: "222",
        detail: "30~3k",
      },
      {
        name: "option3",
        value: "223",
        detail: "50~5k",
      },
      {
        name: "option4",
        value: "224",
        detail: "100~10k",
      },
      {
        name: "option5",
        value: "225",
        detail: "200~20k",
      },
    ],
  },
  {
    uid: 12,
    platform: "WM_FishPrawnCrab",
    options: [
      {
        name: "option1",
        value: "134",
        detail: "10~1k",
      },
      {
        name: "option2",
        value: "135",
        detail: "30~3k",
      },
      {
        name: "option3",
        value: "136",
        detail: "50~5k",
      },
      {
        name: "option4",
        value: "137",
        detail: "100~10k",
      },
      {
        name: "option5",
        value: "175",
        detail: "200~20k",
      },
    ],
  },
  {
    uid: 13,
    platform: "WM_AndarBahar",
    options: [
      {
        name: "option1",
        value: "585",
        detail: "10~1k",
      },
      {
        name: "option2",
        value: "594",
        detail: "30~3k",
      },
      {
        name: "option3",
        value: "583",
        detail: "50~5k",
      },
      {
        name: "option4",
        value: "586",
        detail: "100~10k",
      },
      {
        name: "option5",
        value: "595",
        detail: "200~20k",
      },
    ],
  },
];
export const fakeMenu = [
  "home",
  "playersearch",
  "memberlog",
  "agentlist",
  "sublist",
  "agentlog",
  "fundinout",
  "depositlist",
  "withdrawlist",
  "cashflowstatus",
  "playerreport",
  "winlossreport",
  "gamehistory",
  "memberlevelsettings",
  "eventlist",
  "refercode",
  "marquee",
  "gift",
  "promotion",
  "inbox",
  "bankaccount",
  "menupermissions",
  "comission",
  "gamepermissions",
  "platformsetting",
];
