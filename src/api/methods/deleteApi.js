import { cagentTagApi } from "./baseApi";

export const deleteCagentTags = ({ uid } = {}) => {
  return cagentTagApi.delete(`/${uid}`);
};
