import React from "react";

const ErrorState = ({ error }) => {
  return (
    <div className="text-red-400 bg-white rounded border border-red-400 min-h-64 flex items-center justify-center">
      <span className="text-xl"> {error.message}!</span>
    </div>
  );
};

export default ErrorState;
