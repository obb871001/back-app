import { memberApi } from "./baseApi";

export const updateMemberBasic = ({ uid, patchData } = {}) => {
  return memberApi.patch(`/${uid}`, {
    ...patchData,
  });
};
