import React from "react";
import Spinner from "react-spinkit/dist";

const Loading = ({ colorLoading }) => {
  return (
    <div className="flex items-center justify-center">
      <Spinner name="ball-pulse-sync" color="purple" fadeIn="none" />
    </div>
  );
};

export default Loading;
