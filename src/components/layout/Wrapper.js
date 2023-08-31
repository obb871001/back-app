import React from "react";

const Wrapper = ({ children }) => {
  return (
    <main className="flex flex-col gap-[20px] lg:flex-row">{children}</main>
  );
};

export default Wrapper;
