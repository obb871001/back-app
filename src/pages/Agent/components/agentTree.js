import { Space, Typography } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import UseMergeableSearchParams from "../../../hooks/useMergeableSearchParams";

const AgentTree = ({ agentTree }) => {
  const { t } = useTranslation();
  const i18n = (key) => t(`page.reports.playerreport.${key}`);

  const [searchParams, setSearchParams] = UseMergeableSearchParams();

  return (
    <Space>
      <Typography.Text>{i18n("treeText")}：</Typography.Text>
      {agentTree.length > 0 &&
        agentTree.map((agent, index) => {
          return (
            <>
              <Typography.Text
                onClick={() => {
                  setSearchParams({ agentUid: agent.uid });
                }}
                className="!text-blue-500 cursor-pointer"
                underline
              >
                {agent.cagent}
              </Typography.Text>
              <Typography.Text>
                {agentTree.length === index + 1 || " > "}
              </Typography.Text>
            </>
          );
        })}
    </Space>
  );
};

export default AgentTree;
