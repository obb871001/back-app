export const filterMenuKeys = (baseMenuArray) => {
  if (Array.isArray(baseMenuArray)) return baseMenuArray;
  //過濾 cid,uid,json_menu_editable
  if (!baseMenuArray) return [];
  const baseArray = Object?.keys(baseMenuArray);

  const filterKeys = baseArray.filter((key) => {
    return baseMenuArray[key] == 1;
  });
  return filterKeys;
};
