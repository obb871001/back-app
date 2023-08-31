import dayjs from "dayjs";

export const demo_data = {
  today: {
    total_agent: 110,
    agent: 12,
    new_player: 2,
    new_deposit_player: 108,
    total_amounts: 1020,
    total_people: 108,
    total_turnover: 205000,
    total_winloss: 980,
    total_deposit_amounts: 50,
    total_deposit_people: 3,
    total_deposit_first_people: 1,
    total_deposit_secondary_people: 2,
    total_withdraw_amounts: 40,
    total_withdraw_people: 2,
  },
  yesterday: {
    total_agent: 105,
    agent: 11,
    new_player: 1,
    new_deposit_player: 105,
    total_amounts: 1010,
    total_people: 105,
    total_turnover: 203000,
    total_winloss: 990,
    total_deposit_amounts: 40,
    total_deposit_people: 2,
    total_deposit_first_people: 1,
    total_deposit_secondary_people: 1,
    total_withdraw_amounts: 30,
    total_withdraw_people: 1,
  },
  thisWeek: {
    total_agent: 115,
    agent: 13,
    new_player: 3,
    new_deposit_player: 110,
    total_amounts: 1040,
    total_people: 110,
    total_turnover: 208000,
    total_winloss: 970,
    total_deposit_amounts: 60,
    total_deposit_people: 4,
    total_deposit_first_people: 2,
    total_deposit_secondary_people: 2,
    total_withdraw_amounts: 45,
    total_withdraw_people: 3,
  },
  lastWeek: {
    total_agent: 103,
    agent: 9,
    new_player: 0,
    new_deposit_player: 102,
    total_amounts: 995,
    total_people: 102,
    total_turnover: 201000,
    total_winloss: 1005,
    total_deposit_amounts: 35,
    total_deposit_people: 2,
    total_deposit_first_people: 1,
    total_deposit_secondary_people: 1,
    total_withdraw_amounts: 25,
    total_withdraw_people: 1,
  },
  thisMonth: {
    total_agent: 120,
    agent: 14,
    new_player: 4,
    new_deposit_player: 115,
    total_amounts: 1060,
    total_people: 115,
    total_turnover: 210000,
    total_winloss: 960,
    total_deposit_amounts: 70,
    total_deposit_people: 5,
    total_deposit_first_people: 2,
    total_deposit_secondary_people: 3,
    total_withdraw_amounts: 50,
    total_withdraw_people: 4,
  },
  lastMonth: {
    total_agent: 100,
    agent: 10,
    new_player: 0,
    new_deposit_player: 100,
    total_amounts: 990,
    total_people: 100,
    total_turnover: 199000,
    total_winloss: 1010,
    total_deposit_amounts: 30,
    total_deposit_people: 1,
    total_deposit_first_people: 1,
    total_deposit_secondary_people: 0,
    total_withdraw_amounts: 20,
    total_withdraw_people: 1,
  },
};
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
const demo_chart = () => {
  let daysData = [];

  for (let i = 0; i < 7; i++) {
    const date = dayjs().subtract(i, "day").format("YYYY-MM-DD");
    const total_turnover = getRandomNumber(10000, 1000000);
    const total_winloss = getRandomNumber(10000, 1000000);
    const total_turnover_order = getRandomNumber(1000, 10000);
    const active_player = getRandomNumber(100, 1000);

    daysData.push({
      name: date,
      total_turnover: total_turnover,
      total_winloss: total_winloss,
      total_turnover_order: total_turnover_order,
      active_player: active_player,
    });
  }

  return daysData;
};

export const demo_chart_data = demo_chart();
