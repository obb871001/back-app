import { useEffect, useState } from "react";
import { getFunctionTag } from "../api/methods/getApi";
import { parseSomething } from "../utils/parseSomething";

const useGamePermissionTag = () => {
  const [tagList, setTagList] = useState([]);
  useEffect(() => {
    getFunctionTag({ paramsData: { tag_type: "game_permission" } }).then(
      (data) => {
        const menuList = data.map((item) => {
          return {
            ...item,
            game_permission: parseSomething(item.game_permission_json),
          };
        });
        setTagList(menuList);
      }
    );
  }, []);
  return tagList;
};

export default useGamePermissionTag;
