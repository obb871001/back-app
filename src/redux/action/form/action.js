export const storeForm = (form) => {
  return {
    type: "storeForm",
    payload: form,
  };
};
export const clearForm = () => {
  return {
    type: "clearForm",
  };
};
export const hasSearched = () => {
  return {
    type: "hasSearched",
  };
};
export const initHasSearched = () => {
  return {
    type: "initHasSearched",
  };
};
