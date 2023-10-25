"use client";
import React from "react";
import { useDashboardContext } from "@/context/context";

const HostRequestField: React.FC = () => {
  const { requestModel, handleInputChange } = useDashboardContext();

  return (
    <input
      className="w-full input-text"
      placeholder="Enter URL or paste text"
      aria-controls=":rq:"
      aria-labelledby=":rr:"
      type="text"
      value={requestModel.url}
      onChange={(e) => {
        handleInputChange(e);
      }}
    />
  );
};

export default HostRequestField;
