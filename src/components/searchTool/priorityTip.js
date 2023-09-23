import { Popover, Space, Typography } from "antd";
import { useTranslation } from "react-i18next";

const PriorityTip = ({ priorityList = [] }) => {
  const { t } = useTranslation();
  const i18n = (key) => t(`layout.searchTool.${key}`);

  return (
    <Space>
      <Popover placement="bottom" content={i18n("priorityHint")}>
        <Typography.Text className="!text-xs" type="secondary">
          {i18n("prioritySearch")}：
        </Typography.Text>
      </Popover>
      {priorityList.map((item, index) => {
        return (
          <>
            <Typography.Text
              className="!text-xs font-semibold"
              type={
                index === 0
                  ? "danger"
                  : index === 1
                  ? "warning"
                  : index === 2
                  ? "success"
                  : "secondary"
              }
            >
              {item}
            </Typography.Text>
            {index !== priorityList.length - 1 && (
              <Typography.Text className="!text-xs" type="secondary">
                {`>`}
              </Typography.Text>
            )}
          </>
        );
      })}
    </Space>
  );
};

export default PriorityTip;
