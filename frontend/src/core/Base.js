import React from "react";
import Navbar from "./Navbar";

const Base = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="container container-fluid my-5">{children}</div>
      <h1>Base</h1>
    </div>
  );
};

export default Base;
