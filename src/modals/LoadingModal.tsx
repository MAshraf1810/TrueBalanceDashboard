import React from "react";

const LoadingModal: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-md">
      <div className="relative bg-base-100 p-8 rounded-3xl shadow-2xl w-80 text-center flex flex-col items-center gap-4 border border-primary/20">
        <div className="relative">
          <span className="loading loading-ring loading-lg text-primary"></span>
        </div>
        <p className="text-lg font-semibold text-base-content">
          Please wait...
        </p>
        <p className="text-sm text-base-content/70">
          We're preparing things for you.
        </p>
      </div>
    </div>
  );
};

export default LoadingModal;
