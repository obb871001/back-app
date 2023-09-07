import { allowClick } from "../../assets/style/styleConfig";
import { useDispatch } from "react-redux";
import { storeReportDetail } from "../../redux/action/game/action";
import { openReportDetail } from "../../redux/action/reports/action";
import { useTranslation } from "react-i18next";

const NavigateDetail = ({ props }) => {
  const { t } = useTranslation();
  const i18n = (key) => t(`actionCol.${key}`);

  const dispatch = useDispatch();

  return (
    <p
      onClick={() => {
        dispatch(storeReportDetail(props));
        dispatch(openReportDetail());
        // navigate("reportdetail/123");
      }}
      className={`${allowClick} my-0`}
    >
      {i18n("detail")}
    </p>
  );
};

export default NavigateDetail;
