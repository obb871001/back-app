import {
  agentApi,
  cagentTagApi,
  memberApi,
  promotionFormDataApi,
  systemApi,
} from "./baseApi";

export const updateMemberBasic = ({ uid, patchData } = {}) => {
  return memberApi.patch(`/${uid}`, {
    ...patchData,
  });
};

export const updateAgentBasic = ({ uid, patchData } = {}) => {
  return agentApi.patch(`/${uid}`, {
    ...patchData,
  });
};

export const updatePlatformConfig = ({ patchData } = {}) => {
  return systemApi.patch(`/platformSetting/modifyBaseConfigs`, {
    ...patchData,
  });
};

export const updateTag = ({ patchData, uid } = {}) => {
  return cagentTagApi.patch(`/${uid}`, {
    ...patchData,
  });
};

export const updatePromotions = ({ formData, uid } = {}) => {
  return promotionFormDataApi.post(`/${uid}`, formData);
};
