import React from "react";

type SkeletonProps = {
  width?: string;
  height?: string;
  className?: string;
};

const Skeleton: React.FC<SkeletonProps> = ({
  width = "w-full",
  height = "h-8",
  className = "",
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <div
          className={`animate-pulse bg-base-300 rounded ${width} ${height} ${className}`}
        />
        <div
          className={`animate-pulse bg-base-300 rounded ${width} ${height} ${className}`}
        />
        <div
          className={`animate-pulse bg-base-300 rounded ${width} ${height} ${className}`}
        />
      </div>
      <div className="flex flex-col gap-4">
        <div
          className={`animate-pulse bg-base-300 rounded ${width} ${height} ${className}`}
        />
        <div
          className={`animate-pulse bg-base-300 rounded ${width} ${height} ${className}`}
        />
        <div
          className={`animate-pulse bg-base-300 rounded ${width} ${height} ${className}`}
        />
      </div>
    </div>
  );
};

export default Skeleton;
