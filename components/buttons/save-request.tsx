"use client";
import React from "react";
import { Save, SaveAs, Delete } from "@mui/icons-material";
import { useDashboardContext } from "@/data/context/context";

const SaveRequestButton: React.FC = () => {
  const { saveRequestModel, updateRequestModel, requestModel } =
    useDashboardContext();
  if (requestModel.timeStamp === 0) {
    return (
      <button
        onClick={saveRequestModel}
        color="primary"
        aria-label="save"
        className="button-icon rounded-r-2xl"
      >
        <Save fontSize="small" />
      </button>
    );
  }
  return (
    <>
      <button
        onClick={updateRequestModel}
        color="primary"
        aria-label="save"
        className="button-icon"
      >
        <SaveAs fontSize="small" />
      </button>
      <button
        
        color="primary"
        aria-label="save"
        className="button-icon rounded-r-2xl"
      >
        <Delete fontSize="small" />
      </button>
    </>
  );
};

export default SaveRequestButton;
