"use client";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import CodeEditor from "@uiw/react-textarea-code-editor";
import React from "react";
import ConvertModal from "../modals/convert-modal";

const ConvertRequest: React.FC = () => {
  return (
    <div className="gap-4 grid grid-cols-2 h-full w-full">
      <div className="flex flex-col gap-4">
        <div className="flex items-center">
          <ConvertModal />
          <input
            className="w-full input-text"
            placeholder="Enter classname"
            aria-controls=":rq:"
            aria-labelledby=":rr:"
            type="text"
          ></input>
          <button className="button flex rounded-r-2xl">Convert</button>
        </div>
        <CodeEditor
          language="json"
          data-color-mode="dark"
          placeholder="Please enter JSON object."
          contentEditable={false}
          padding={16}
          style={{
            fontSize: 12,
            backgroundColor: "#1E1E1E",
            borderRadius: "16px",
            overflow: "auto",
            flexGrow: "1",
            width: "100%",
            resize: "none",
            fontFamily:
              "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
          }}
        />
      </div>
      {/* <LineSeparator /> */}
      <div className="flex flex-col gap-4">
        <CodeEditor
          value={``}
          onChange={() => false}
          language="dart"
          data-color-mode="dark"
          placeholder="Please enter Dart code."
          contentEditable={false}
          disabled
          padding={16}
          style={{
            fontSize: 12,
            backgroundColor: "#1E1E1E",
            borderRadius: "16px",
            overflow: "auto",
            flexGrow: "1",
            width: "100%",
            resize: "none",
            fontFamily:
              "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
          }}
        />
        <button className="button w-full rounded-2xl">
          {" "}
          <CopyAllIcon /> Copy
        </button>
      </div>
    </div>
  );
};

export default ConvertRequest;
