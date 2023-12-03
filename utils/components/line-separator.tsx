import React from "react";

interface LineSeparatorProps {
  orientation?: "vertical" | "horizontal";
}

function LineSeparator({ orientation = "vertical" }: LineSeparatorProps) {
  const separatorClass =
    orientation === "vertical"
      ? "bg-[#1E1E1E] w-[2px]"
      : "bg-[#1E1E1E] h-[2px]";

  return <div className={separatorClass} />;
}

export default LineSeparator;
