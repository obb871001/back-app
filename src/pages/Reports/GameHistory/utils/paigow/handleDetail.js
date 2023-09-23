import i18n from "i18next";

export default function handleDetail(row) {
  const i18n_col = (key) =>
    i18n.t(`page.reports.gamehistory.platform.paigow.${key}`);
  const detail = JSON.parse(row);

  const statusCode = (code) => {
    switch (code) {
      case "0":
        return i18n_col("statusCode.0");
      case "1":
        return i18n_col("statusCode.1");
      case "2":
        return i18n_col("statusCode.2");
      default:
        return i18n_col("statusCode.error");
    }
  };

  return [
    { label: i18n_col("rake"), value: `${detail.rake}%` },
    { label: i18n_col("gameRoundId"), value: detail.gameRoundId },
    { label: i18n_col("bankerFee"), value: detail.bankerFee },
    { label: i18n_col("bankerPay"), value: detail.bankerPay },
    { label: i18n_col("bankerWinCount"), value: detail.bankerWinCount },
    { label: i18n_col("playerBetCount"), value: detail.playerBetCount },
    { label: i18n_col("gameStatus"), value: statusCode(detail.gameStatus) },
  ];
}
