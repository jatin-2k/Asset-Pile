import React from "react";
import Navbar from "./Navbar";

const Base = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="container container-fluid my-5 ">{children}</div>
    </div>
  );
};

export default Base;
