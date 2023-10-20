"use client";
import React from "react";
import { Save } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { useDashboardContext } from "@/context/context";

const SaveRequestButton: React.FC = () => {
  const { saveRequestModel } = useDashboardContext();

  return (
    <IconButton
      onClick={saveRequestModel}
      color="primary"
      size="large"
      aria-label="save"
    >
      <Save />
    </IconButton>
  );
};

export default SaveRequestButton;
