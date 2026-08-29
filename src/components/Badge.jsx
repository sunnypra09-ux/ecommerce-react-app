import React from "react";

const Badge = ({ children }) => {
  return (
    <span className="rounded bg-green-500 px-2 py-1 text-xs font-semibold text-white">
      {children}
    </span>
  );
};

export default Badge;
