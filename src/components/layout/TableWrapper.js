import React from "react";

const TableWrapper = ({ children, className }) => {
  return (
    <section className={`w-full overflow-scroll shadow rounded ${className}`}>
      {children}
    </section>
  );
};

export default TableWrapper;
