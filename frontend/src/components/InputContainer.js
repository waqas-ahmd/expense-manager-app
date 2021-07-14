import React from "react";

const InputContainer = ({ children, label }) => {
  return (
    <div>
      <div className="inputLabel pC">{label}</div>
      <div className="inputContainer">{children}</div>
    </div>
  );
};

export default InputContainer;
