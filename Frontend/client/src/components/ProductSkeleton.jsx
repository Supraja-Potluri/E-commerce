import React from "react";

export default function ProductSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 animate-pulse">
      <div className="w-full aspect-[4/3] bg-gray-200 rounded"></div>
      <div className="mt-4 h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="mt-2 h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  );
}
