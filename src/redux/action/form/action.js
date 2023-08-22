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
