import React from "react";

const Alert = ({ msg = "Processing...", type = "info" }) => {
  return (
    <div
      className={`alert alert-${type} alert-dismissible fade show d-flex align-items-center`}
      role="alert"
    >
      <div>{msg}</div>
    </div>
  );
};

export default Alert;
