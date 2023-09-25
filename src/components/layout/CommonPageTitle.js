import { Divider, Skeleton, Typography } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import QuestionHint from "../hint/QuestionHint";

const CommonPageTitle = ({ pagePath, commonHint }) => {
  const { t } = useTranslation();
  const i18n_menu = (key) => t(`layout.menu.${key}`);
  const globalLoading = useSelector((state) => state.globalLoading);
  const apiCalling = useSelector((state) => state.apiCalling);

  return (
    <>
      {apiCalling || globalLoading ? (
        <Skeleton.Input
          className="!w-[200px] h-[30px] mb-[10px]"
          active
          size="small"
        />
      ) : (
        <Typography.Title level={2} className="!mt-0 mb-[10px]">
          {i18n_menu(pagePath)}
          {commonHint && (
            <QuestionHint
              iconClassName={`ml-[10px] text-2xl`}
              title={commonHint}
            />
          )}
        </Typography.Title>
      )}

      <Divider className="!mb-[20px] !mt-[5px]" />
    </>
  );
};

export default CommonPageTitle;
