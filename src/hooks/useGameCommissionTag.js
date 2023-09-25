import React, { useEffect, useState } from "react";
import { getFunctionTag } from "../api/methods/getApi";
import { parseSomething } from "../utils/parseSomething";

const useGameCommissionTag = () => {
  const [tagList, setTagList] = useState([]);
  useEffect(() => {
    getFunctionTag({ paramsData: { tag_type: "game_per" } }).then((data) => {
      const menuList = data.map((item) => {
        return {
          ...item,
          game_per: parseSomething(item.game_per_json),
        };
      });
      setTagList(menuList);
    });
  }, []);
  return tagList;
};

export default useGameCommissionTag;
