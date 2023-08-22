export const filterMenuKeys = (baseMenuArray = []) => {
  //過濾 cid,uid,json_menu_editable
  const filterKeys = Object.keys(baseMenuArray).filter((key) => {
    return baseMenuArray[key] == 1;
  });
  return filterKeys;
};
