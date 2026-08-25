import React from "react";

const ErrorState = ({ error }) => {
  return (
    <div className="text-red-500 bg-white rounded border-2 border-gray-200 min-h-64 text-center pt-10 font-semibold">
      {error.message}
    </div>
  );
};

export default ErrorState;
