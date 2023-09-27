import { cagentTagApi, promotionApi } from "./baseApi";

export const deleteCagentTags = ({ uid } = {}) => {
  return cagentTagApi.delete(`/${uid}`);
};

export const deletePromotion = ({ uid } = {}) => {
  return promotionApi.delete(`/${uid}`);
};
