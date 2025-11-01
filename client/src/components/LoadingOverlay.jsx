import React from "react";

const LoadingOverlay = ({ message = "Loading data..." }) => {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-beige/90 backdrop-blur-sm animate-fadeIn">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-black/20 border-t-black rounded-full animate-spin" />
        <p className="text-black text-sm font-bold">{message}</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
