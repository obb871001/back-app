export default function handleDetail(row) {
  const detail = JSON.parse(row);

  const statusCode = (code) => {
    switch (code) {
      case "0":
        return "該筆正常遊玩";
      case "1":
        return "該筆取消歸還";
      case "2":
        return "該筆修正補償";
      default:
        return "錯誤";
    }
  };

  return [
    { label: "抽水值", value: detail.rake },
    { label: "遊戲局號", value: detail.gameRoundId },
    { label: "上莊費", value: detail.bankerFee },
    { label: "出資額", value: detail.bankerPay },
    { label: "莊家贏次數", value: detail.bankerWinCount },
    { label: "有效投注次數", value: detail.playerBetCount },
    { label: "遊玩狀態", value: statusCode(detail.gameStatus) },
  ];
}
