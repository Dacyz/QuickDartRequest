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
      className="border-none bg-transparent px-2 text-right outline-none placeholder:text-[#FFFFFF78] placeholder:text-[12px] placeholder:font-normal font-normal text-[12px]"
    />
  );
};

export default NameRequestField;
