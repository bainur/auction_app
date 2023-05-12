import React from "react";

const LoadingIndicator = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-50 flex justify-center items-center">
      <div className="spinner border-4 border-t-4 border-blue-500 rounded-full w-12 h-12"></div>
    </div>
  );
}

export default LoadingIndicator
