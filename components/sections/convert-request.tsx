"use client";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import CodeEditor from "@uiw/react-textarea-code-editor";
import React from "react";

const ConvertSection: React.FC = () => {
  return (
    <div className="min-w-[320px] gap-4 max-w-[320px] flex flex-col h-full">
      <div className="flex items-center">
        <input
          className="w-full input-text rounded-l-[16px]"
          placeholder="Enter classname"
          aria-controls=":rq:"
          aria-labelledby=":rr:"
          type="text"
        ></input>
      </div>
      <ul>
        <li>
          <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
          <label htmlFor="vehicle1">
            {" "}
            Generate <span className="text-blue-400">toJson</span> method
          </label>
        </li>
        <li>
          <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
          <label htmlFor="vehicle1">
            {" "}
            Generate <span className="text-blue-400">copyWith</span> method
          </label>
        </li>
        <li>
          <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
          <label htmlFor="vehicle1">
            {" "}
            Generate <span className="text-blue-400">toString</span> method
          </label>
        </li>
      </ul>
      <CodeEditor
        value={`import '../../domain/models/config/n_config_model.dart';

          class ApiConstants {
            ///Constant
            static const int timeOutSeconds = 75;
          
            /// Ambientes:
            /// - CELER: "https://10.10.1.114:8080"
            /// - DEV: "https://ubikate.spiralia-team.com"
            /// - QA: "https://ubikate.aplicacion-team.com"
            /// - PROD: undefined
            // static const String NBaseServer = "https://10.10.1.114:8080";
            // static const String NBaseServer = "https://ubikate.spiralia-team.com";
            static const String NBaseServer = "https://ubikate.aplicacion-team.com";
            static late final NConfigModel config;
          
            static Uri toUri(String path) => Uri.parse(config.toApi(path));
          
            static Uri uri({
              required String path,
              Map<String, dynamic>? queryParameters,
            }) =>
                Uri(
                  scheme: 'https',
                  // host: '10.10.1.114:8080', // CELER
                  // host: 'ubikate.spiralia-team.com', // DEV
                  host: 'ubikate.aplicacion-team.com',
                  path: path,
                  queryParameters: queryParameters,
                );
          }
          `}
        onChange={()=> false}
        language="dart"
        data-color-mode="dark"
        placeholder="Please enter Dart code."
        contentEditable={false}
        // disabled
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
      <button className="button w-full rounded-2xl">
        {" "}
        <PrecisionManufacturingIcon /> Convert
      </button>
    </div>
  );
};

export default ConvertSection;
