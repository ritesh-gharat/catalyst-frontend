import React from "react";

const AlertError = ({ message }) => {
  return (
    <div
      className="w-4/5 ml-[10%] inline-flex justify-center gap-1 items-center p-4 mb-4 text-sm rounded-lg bg-Secondary text-PrimaryText  text-center"
      role="alert"
    >
      <span>
        <span className="font-medium">⚠️ Alert error! </span>
        {message} ⚠️
      </span>
    </div>
  );
};

export default AlertError;
