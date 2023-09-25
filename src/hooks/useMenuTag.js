import { useEffect, useState } from "react";
import { getFunctionTag } from "../api/methods/getApi";
import { parseSomething } from "../utils/parseSomething";

const useMenuTag = () => {
  const [tagList, setTagList] = useState([]);
  useEffect(() => {
    getFunctionTag({ paramsData: { tag_type: "menu" } }).then((data) => {
      const menuList = data.map((item) => {
        return {
          ...item,
          menu_permission: parseSomething(item.menu_permission_json),
          menu_editable: parseSomething(item.menu_editable_json),
        };
      });
      setTagList(menuList);
    });
  }, []);
  return tagList;
};

export default useMenuTag;
