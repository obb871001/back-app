import React from "react";

const TableWrapper = ({ children }) => {
  return <section className="w-full overflow-scroll">{children}</section>;
};

export default TableWrapper;
