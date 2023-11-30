"use client";
import React from "react";
import { useDashboardContext } from "@/context/context";

const NameRequestField: React.FC = () => {
  const { requestModel, setRequestName } = useDashboardContext();

  return (
    <input
      onChange={(e) => setRequestName(e.target.value)}
      value={requestModel.name}
      placeholder="New request"
      aria-controls=":rq:"
      aria-labelledby=":rr:"
      type="text"
      className="input-text w-full rounded-l-2xl"
    />
  );
};

export default NameRequestField;
