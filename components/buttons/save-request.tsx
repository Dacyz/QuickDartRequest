"use client";
import React from "react";
import { Save } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { useDashboardContext } from "@/data/context/context";

const SaveRequestButton: React.FC = () => {
  const { saveRequestModel } = useDashboardContext();

  return (
    <button
      onClick={saveRequestModel}
      color="primary"
      aria-label="save"
      className="button-icon rounded-r-2xl"
    >
      <Save  fontSize="small"/>
    </button>
  );
};

export default SaveRequestButton;
