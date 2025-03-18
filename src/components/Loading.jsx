import React from "react";
import { useSelector } from "react-redux";

const Loading = () => {
  const loading = useSelector((state) => state.loading.loading);
  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-[99999] backdrop-blur-md">
      <div className="relative w-24 h-24 flex items-center justify-center">
        <div className="absolute w-20 h-20 border-8 border-transparent border-t-blue-500 border-r-blue-500 rounded-full animate-spin" />

        <div className="absolute w-16 h-16 border-8 border-transparent border-b-blue-500 border-l-blue-500 rounded-full animate-[spin_1.5s_linear_infinite_reverse]" />

        <span className="absolute text-white text-lg font-semibold animate-pulse">
          Loading...
        </span>
      </div>
    </div>
  );
};

export default Loading;
