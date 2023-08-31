export const storeGame = (game) => {
  const games = game;
  const sortByPlatform = Object.keys(games);

  const platform = sortByPlatform.map((item) => {
    return games[item]?.[`frontName`];
  });
  const sortTypeFunction = () => {
    let output = {};
    Object.keys(games).forEach((key) => {
      Object.keys(games[key]).forEach((subKey) => {
        if (!output[subKey]) {
          output[subKey] = [];
        }
        output[subKey].push(key);
      });
    });
    return output;
  };

  const sortPlatformAndType = () => {
    return Object.entries(games).reduce((acc, [key, value]) => {
      acc[key] = Object.keys(value);
      return acc;
    }, {});
  };

  const sortByGameType = sortTypeFunction();
  const sortByGameTypeAndPlatform = sortPlatformAndType();

  return {
    type: "storeGame",
    payload: {
      gamePlatform: platform,
      gameType: sortByGameType,
      gameTypeAndPlatform: sortByGameTypeAndPlatform,
    },
  };
};

export const storeBetLimit = (betLimit) => {
  return {
    type: "storeBetLimit",
    payload: betLimit,
  };
};
export const storeReportDetail = (detail) => {
  return {
    type: "storeReportDetail",
    payload: detail,
  };
};
