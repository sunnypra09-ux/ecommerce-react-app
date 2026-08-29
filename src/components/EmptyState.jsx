import React from "react";

const EmptyState = ({
  title = "Nothing here yet",
  description = "There is nothing to display at the moment.",
  buttonText,
  onClick,
}) => {
  return (
    <div className="flex min-h-[400px] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-3xl">
          📦
        </div>

        <h2 className="mt-5 text-2xl font-bold text-gray-900">{title}</h2>

        <p className="mt-2 text-sm leading-6 text-gray-500">{description}</p>

        {buttonText && (
          <button
            onClick={onClick}
            className="mt-6 rounded-lg bg-red-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600"
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
