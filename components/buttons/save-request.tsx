"use client";
import React from "react";
import { Save, SaveAs, Close, Upload } from "@mui/icons-material";
import { useDashboardContext } from "@/data/context/context";
import { generateJsonAndDownload } from "@/utils/helpers/data_extension";

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
        className="button-icon-st"
      >
        <SaveAs fontSize="small" />
      </button>
      <button
        onClick={() => {
          const jsonData: { [key: string]: any } = {
            ListRequest: [requestModel],
          };
          generateJsonAndDownload(jsonData, requestModel.name);
        }}
        color="primary"
        aria-label="save"
        className="button-icon-st"
      >
        <Upload fontSize="small" />
      </button>
      <button
        color="primary"
        aria-label="save"
        className="button-icon-st rounded-r-2xl"
      >
        <Close fontSize="small" />
      </button>
    </>
  );
};

export default SaveRequestButton;
