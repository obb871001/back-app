import { Divider } from "antd";
import SearchTool from "../../components/searchTool/searchTool";
import CommonTable from "../../components/table/commonTable";
import { useParams } from "react-router";
import { FilterColumns } from "./GameHistory/utils/filterColumns";

const GameHistory = () => {
  const { gameId } = useParams();
  return (
    <>
      <SearchTool />
      <Divider dashed />
      <CommonTable columns={FilterColumns(gameId)} />
    </>
  );
};

export default GameHistory;
