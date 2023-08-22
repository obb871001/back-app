import { Divider } from "antd";
import { useNavigate } from "react-router";

const EventTabs = ({ EVENT_LIST }) => {
  const navigate = useNavigate();
  return (
    <>
      <section className="flex items-center gap-[10px]">
        {EVENT_LIST.map((item, index) => {
          return (
            <div
              key={item.label}
              onClick={() => {
                navigate(item.path);
              }}
              className="flex flex-col items-center justify-center w-[300px] h-[150px] rounded-xl shadow text-xl gap-[10px] cursor-pointer hover:border-blue-500 border"
            >
              {item.icon}
              {item.label}
            </div>
          );
        })}
      </section>
      <Divider dashed />
    </>
  );
};

export default EventTabs;
