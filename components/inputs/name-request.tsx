"use client";
import React from "react";
import { useDashboardContext } from "@/context/context";

const NameRequestField: React.FC = () => {
  const { requestModel, setRequestName } = useDashboardContext();

  return (
    <input
      onChange={(e) => setRequestName(e.target.value)}
      value={requestModel.name}
      className="border-none bg-transparent p-2 text-right text-base outline-none placeholder:text-[#FFFFFF78] placeholder:text-[12px] placeholder:font-normal text-[12px]"
    />
  );
};

export default NameRequestField;
