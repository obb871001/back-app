export const filterAgentLevel = (data) => {
  //過濾等級
  for (let i = 7; i >= 0; i--) {
    if (data[`cagent${i}`] == "-") {
      continue;
    } else if (data[`cagent${i}`] !== "-") {
      //   if (i === 0) {
      //     return data.cagent;
      //   } else {
      return data[`cagent${i}`];
      //   }
    }
  }
};
export const filterAgentLevelKeys = (data) => {
  //過濾等級
  for (let i = 7; i >= 0; i--) {
    if (data[`cagent${i}`] == "-") {
      continue;
    } else if (data[`cagent${i}`] !== "-") {
      //   if (i === 0) {
      //     return data.cagent;
      //   } else {
      return `cagent${i}`;
      //   }
    }
  }
};
