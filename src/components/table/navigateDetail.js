import { allowClick } from "../../assets/style/styleConfig";
import { useDispatch } from "react-redux";
import { storeReportDetail } from "../../redux/action/game/action";
import { openReportDetail } from "../../redux/action/reports/action";

const NavigateDetail = ({ props }) => {
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
      詳細
    </p>
  );
};

export default NavigateDetail;
